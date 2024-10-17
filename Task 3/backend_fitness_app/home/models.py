from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class HealthDetail(models.Model):
    user        = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    gender      = models.CharField(max_length=6, choices=[("Male", "Male"), ("Female", "Female")])
    weight      = models.FloatField()
    age         = models.IntegerField()
    height      = models.FloatField()
    weight_goal = models.FloatField()
    fitness_goal= models.CharField(max_length=50, choices=[
        ("Weight Loss", "Weight Loss"),
        ("Muscle Gain", "Muscle Gain"),
        ("Maintenance", "Maintenance"),
    ])