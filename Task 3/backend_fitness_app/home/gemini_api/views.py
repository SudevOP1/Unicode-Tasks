from rest_framework.response    import Response                             # type: ignore
from rest_framework.decorators  import api_view, permission_classes         # type: ignore
from rest_framework.permissions import IsAuthenticated                      # type: ignore
import google.generativeai as genai                                         # type: ignore
import json
from datetime import timedelta, date
from home.models import *


# ==================================================================
# ====================== Non-api view Methods ======================
# ==================================================================


@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/gemini-api/create-and-get-weekly-routine",
        "/gemini-api/get-weekly-routine",
        "/gemini-api/get-quote",
    ]
    return Response(routes)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getQuote(request):
    genai.configure(api_key="AIzaSyBFgc9r7SU0YS5fu0LGkMBD9pjxLzpseaU")
    model = genai.GenerativeModel("gemini-1.5-flash")
    
    prompt = "Give me a workout motivation quote similar to this: \"The only Bad Workout Is the one that didn't happen\". only give one quote, don't add any extra text, it should contain maximum 10 words"
    response = model.generate_content(prompt)
    quote = response.text if response.text else "The only Bad Workout is the one that didn't happen"

    final_response = {
        "quote": quote,
    }

    return Response(final_response)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def createWeeklyRoutine(request):
    genai.configure(api_key="AIzaSyBFgc9r7SU0YS5fu0LGkMBD9pjxLzpseaU")
    model = genai.GenerativeModel("gemini-1.5-pro-002")

    try:
        health_details = HealthDetail.objects.get(user=request.user)
    except:
        return Response({"error": "Health details not found for this user."}, status=404)

    prompt = f"""
Create a weekly workout plan about {health_details.fitness_goal}. My details:
gender:{health_details.gender}
weight(kg):{health_details.weight}
age:{health_details.age}
height(cm):{health_details.height}
weight_goal(kg):{health_details.weight_goal}
Give me 4 exercises targeting only 1 muscle per day, including Chest Shoulders Biceps Triceps Legs Abs and Rest days.
Provide ideal daily step count.
Don't give any extra text.
Use this JSON Schema (if rest day, put muscle as Rest and exercises empty):
{{
    "days":
        {{
            "day": "Monday",
            "muscle" : "Biceps",
            "exercises": [
                {{
                    "name": "Bicep Curls",
                    "reps": "12",
                    "sets": 3
                }}, ...
            ],
            "steps": 8000
        }},
        ...
}}
    """
    
    # Save the content from the response
    response = model.generate_content(prompt)
    try:
        response_formatted = response.text.strip('```json').strip('```')
        response_data = json.loads(response_formatted)
        return Response(response_data, status=200)
    except:
        return Response({"error": "Failed to parse workout plan response."}, status=500)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def saveWeeklyRoutine(request):
    try:
        routine = Routine.objects.create(user=request.user)

        for day_data in request.data.get("days", []):
            day = day_data["day"].lower()[:3]
            steps = day_data["steps"]

            Steps.objects.create(routine=routine, steps=steps, day=day)

            if day_data["muscle"].lower() != "rest":
                for exercise_data in day_data["exercises"]:
                    Exercise.objects.create(
                        routine = routine,
                        name    = exercise_data["name"],
                        reps    = exercise_data["reps"],
                        sets    = exercise_data["sets"],
                        muscle  = day_data["muscle"],
                        day     = day
                    )

        return Response({"success": "Workout plan saved successfully."}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getWeeklyRoutine(request):
    routines = Routine.objects.filter(user=request.user)
    if not routines:
        return Response({"error": "Workout Plan not created yet."}, status=404)

    all_routines_data = []
    for routine in routines:
        steps_data = {step.day: step.steps for step in routine.steps.all()}
        exercises_data = {}

        for exercise in routine.exercises.all():
            day = exercise.day
            if day not in exercises_data:
                exercises_data[day] = []
            exercises_data[day].append({
                "name": exercise.name,
                "reps": exercise.reps,
                "sets": exercise.sets,
                "completed": exercise.completed,
                "muscle": exercise.muscle,
            })

        routine_data = {
            "user": routine.user.username,
            "days": {
                "sun": {"steps": steps_data.get("sun", 0), "exercises": exercises_data.get("sun", [])},
                "mon": {"steps": steps_data.get("mon", 0), "exercises": exercises_data.get("mon", [])},
                "tue": {"steps": steps_data.get("tue", 0), "exercises": exercises_data.get("tue", [])},
                "wed": {"steps": steps_data.get("wed", 0), "exercises": exercises_data.get("wed", [])},
                "thu": {"steps": steps_data.get("thu", 0), "exercises": exercises_data.get("thu", [])},
                "fri": {"steps": steps_data.get("fri", 0), "exercises": exercises_data.get("fri", [])},
                "sat": {"steps": steps_data.get("sat", 0), "exercises": exercises_data.get("sat", [])},
            }
        }
        all_routines_data.append(routine_data)

    return Response({"routines": all_routines_data}, status=200)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def toggleExerciseCompleted(request):
    name_of_ex = request.data.get("name")
    if not name_of_ex:
        return Response({"error": "Exercise name is required."}, status=400)
    
    try:
        exercise = Exercise.objects.get(name=name_of_ex, routine__user=request.user)
        exercise.completed = not exercise.completed
        exercise.save()
        success_msg = "complete" if exercise.completed else "incomplete"

        today = date.today()
        day_instance, created = Day.objects.get_or_create(user=request.user, date=today)
        day_instance.update_completion_status()
        if createRemainingDayObjectsUntilToday(request.user, today) == "Health Detail Not Found":
            return Response({"error": "Health Detail Not Found."}, status=404)

        return Response({"success": f"Exercise marked as {success_msg}"}, status=200)
    
    except Exercise.DoesNotExist:
        return Response({"error": "Exercise not found."}, status=404)
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def toggleStepsCompleted(request):
    day = request.data.get("day")
    
    try:
        steps = Steps.objects.get(day=day, routine__user=request.user)
        steps.completed = not steps.completed
        steps.save()
        success_msg = "complete" if steps.completed else "incomplete"

        today = date.today()
        day_instance, created = Day.objects.get_or_create(user=request.user, date=today)
        day_instance.update_completion_status()
        if createRemainingDayObjectsUntilToday(request.user, today) == "Health Detail Not Found":
            return Response({"error": "Health Detail Not Found."}, status=404)

        return Response({"success": f"Steps marked as {success_msg}"}, status=200)

    
    except Steps.DoesNotExist:
        return Response({"error": "Steps Object not found."}, status=404)
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getWorkoutStreak(request):
    try:
        today = date.today()
        if createRemainingDayObjectsUntilToday(request.user, today) == "Health Detail Not Found":
            return Response({"error": "Health Detail Not Found."}, status=404)
        days = Day.objects.filter(user=request.user)
        streak = 0
        for day in days.reverse():
            if day.exercise_completed and day.steps_completed: streak += 1
            else: break
        return Response({"streak": streak}, status=200)
    except Exception as e: return Response({"error": str(e)}, status=500)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getPercentOfExsCompleted(request):
    
    def calculate_percentage(completed, total): return (completed / total) * 100 if total > 0 else 0

    try:
        exercises = Exercise.objects.filter(routine__user=request.user)
        if not exercises.exists(): return Response({"day": 0, "week": 0, "month": 0, "overall": 0})

        today = date.today()
        start_of_week = today - timedelta(days=today.weekday())
        start_of_month = today.replace(day=1)

        day_name = today.strftime('%a').lower()
        weekly_days = [(start_of_week + timedelta(days=i)).strftime('%a').lower() for i in range(7)]
        
        total_exs_in_day     = exercises.filter(day=day_name).count()
        total_exs_in_week    = exercises.filter(day__in=weekly_days).count()
        total_exs_in_month   = exercises.filter(day__gte=start_of_month).count()
        total_exs_in_overall = exercises.count()

        compl_exs_in_day     = exercises.filter(completed=True, day=day_name).count()
        compl_exs_in_week    = exercises.filter(completed=True, day__in=weekly_days).count()
        compl_exs_in_month   = exercises.filter(completed=True, day__gte=start_of_month).count()
        compl_exs_in_overall = exercises.filter(completed=True).count()

        final_response = {
            "day":     calculate_percentage(compl_exs_in_day    , total_exs_in_day    ),
            "week":    calculate_percentage(compl_exs_in_week   , total_exs_in_week   ),
            "month":   calculate_percentage(compl_exs_in_month  , total_exs_in_month  ),
            "overall": calculate_percentage(compl_exs_in_overall, total_exs_in_overall),
        }

        return Response(final_response)

    except Exception as e: return Response({"error": str(e)}, status=500)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserWeights(request):
    try:
        health_detail = HealthDetail.objects.get(user=request.user)
        weight_goal   = health_detail.weight_goal
        
        weights = []
        weights.append({
            "date": health_detail.date_created.strftime("%Y-%m-%d"),
            "weight": health_detail.weight
        })
        for weight in DailyWeight.objects.filter(user=request.user):
            weights.append({
                "date": weight.date.strftime("%Y-%m-%d"),
                "weight": weight.weight
            })

        final_response = {
            "weights": weights,
            "weight_goal": weight_goal
        }

        return Response(final_response)

    except HealthDetail.DoesNotExist:
        return Response({"error": "Health Detail Not Found."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def saveWeight(request):
    pass


# ==================================================================
# ====================== Non-api view Methods ======================
# ==================================================================


@permission_classes([IsAuthenticated])
def createRemainingDayObjectsUntilToday(user, today):
    health_detail = HealthDetail.objects.filter(user=user).first()
    if not health_detail: return "Health Detail Not Found"
    
    start_date = health_detail.date_created

    current_date = start_date
    while current_date <= today:
        Day.objects.get_or_create(
            user=user,
            date=current_date,
            defaults={"exercise_completed": False, "steps_completed": False}
        )
        current_date += timedelta(days=1)

