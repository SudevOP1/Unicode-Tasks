from rest_framework.response    import Response                             # type: ignore
from rest_framework.decorators  import api_view, permission_classes         # type: ignore
from rest_framework.permissions import IsAuthenticated                      # type: ignore
import google.generativeai as genai                                         # type: ignore
import os, json
from home.models import *

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


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def createAndGetWeeklyRoutine(request):
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
    except:
        return Response({"error": "Failed to parse workout plan response."}, status=500)

    routine = Routine.objects.create(user=request.user)

    for day_data in response_data["days"]:
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

    return Response(response_data, status=200)


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
        return Response({"success": f"Exercise marked as {success_msg}"}, status=200)
    
    except Exercise.DoesNotExist:
        return Response({"error": "Exercise not found.", "exercise": name_of_ex}, status=404)
    
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
        return Response({"success": f"Steps marked as {success_msg}"}, status=200)
    
    except Steps.DoesNotExist:
        return Response({"error": "Steps Object not found."}, status=404)
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)


