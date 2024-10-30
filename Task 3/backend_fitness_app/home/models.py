from django.db import models                    # type: ignore
from django.contrib.auth.models import User     # type: ignore

# Create your models here.

class HealthDetail(models.Model):
    user            = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    gender          = models.CharField(max_length=6, choices=[("male", "Male"), ("female", "Female")])
    weight          = models.FloatField()
    age             = models.IntegerField()
    height          = models.FloatField()
    weight_goal     = models.FloatField()
    fitness_goal    = models.CharField(max_length=11, choices=[
        ("weight_loss", "weight_loss"),
        ("muscle_gain", "muscle_gain"),
        ("maintenance", "maintenance"),
    ])
    workout_streak  = models.IntegerField(default=0, null=False)

    def __str__(self): return self.user.username

class Routine(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
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
    user      = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    weight    = models.FloatField()
    date      = models.DateField()

    def __str__(self): return self.user.username + " | " + str(self.date) + " | " + str(self.weight)
