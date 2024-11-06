from django.db import models                        # type: ignore
from django.contrib.auth.models import User         # type: ignore

# Create your models here.

class HealthDetail(models.Model):
    user                = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name="health_details")
    gender              = models.CharField(max_length=6, choices=[("male", "Male"), ("female", "Female")])
    weight              = models.FloatField()
    age                 = models.IntegerField()
    height              = models.FloatField()
    weight_goal         = models.FloatField()
    workout_streak      = models.IntegerField(default=0, null=False)
    date_created        = models.DateField(auto_now_add=True)
    fitness_goal        = models.CharField(max_length=11, choices=[
        ("weight_loss", "weight_loss"),
        ("muscle_gain", "muscle_gain"),
        ("maintenance", "maintenance"),
    ])
    subscription_tier   = models.CharField(max_length=14, default="FitStarter" ,choices=[
        ("FitStarter",      "FitStarter"),
        ("StrengthMaster",  "StrengthMaster"),
        ("FitnessTitan",    "FitnessTitan"),
    ])

    def __str__(self): return self.user.username

class Routine(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="routine", null=False)
    sun  = models.CharField(max_length=20)
    mon  = models.CharField(max_length=20)
    tue  = models.CharField(max_length=20)
    wed  = models.CharField(max_length=20)
    thu  = models.CharField(max_length=20)
    fri  = models.CharField(max_length=20)
    sat  = models.CharField(max_length=20)

    def __str__(self): return self.user.username + "'s routine"

class Exercise(models.Model):
    routine     = models.ForeignKey(Routine, on_delete=models.CASCADE, null=False, related_name="exercises")
    name        = models.CharField(max_length=20)
    reps        = models.CharField(max_length=5)
    sets        = models.IntegerField()
    completed   = models.BooleanField(default=False)
    muscle      = models.CharField(max_length=10)
    day         = models.CharField(max_length=3, choices=[
        ("sun", "sun"),
        ("mon", "mon"),
        ("tue", "tue"),
        ("wed", "wed"),
        ("thu", "thu"),
        ("fri", "fri"),
        ("sat", "sat"),
    ])

    def __str__(self): return f"{self.day} | {self.name}"
    
class Steps(models.Model):
    routine         = models.ForeignKey(Routine, on_delete=models.CASCADE, null=False, related_name="steps")
    steps           = models.IntegerField()
    completed       = models.BooleanField(default=False)
    day             = models.CharField(max_length=3, choices=[
        ("sun", "sun"),
        ("mon", "mon"),
        ("tue", "tue"),
        ("wed", "wed"),
        ("thu", "thu"),
        ("fri", "fri"),
        ("sat", "sat"),
    ])

    def __str__(self): return self.day + str(self.steps)

class DailyWeight(models.Model):
    user      = models.ForeignKey(User, on_delete=models.CASCADE, related_name="daily_weights", null=False)
    weight    = models.FloatField()
    date      = models.DateField(auto_now=True)

    def __str__(self): return self.user.username + " | " + str(self.date) + " | " + str(self.weight)

class Day(models.Model):
    user                        = models.ForeignKey(User, related_name="days", on_delete=models.CASCADE, null=False)
    date                        = models.DateField()
    exercise_completed          = models.BooleanField(default=False)
    steps_completed             = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username + " | " + str(self.date)
    
    def update_completion_status(self):
        exercises   = Exercise.objects.filter(routine__user=self.user, day=self.date.strftime('%a').lower())
        steps       = Steps   .objects.filter(routine__user=self.user, day=self.date.strftime('%a').lower())

        self.exercise_completed = all(exercise.completed for exercise in exercises)
        self.steps_completed = all(step.completed for step in steps)

        self.save()
