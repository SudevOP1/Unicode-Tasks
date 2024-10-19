from django.db import models                    # type: ignore
from django.contrib.auth.models import User     # type: ignore

# Create your models here.

class HealthDetail(models.Model):
    user        = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    gender      = models.CharField(max_length=6, choices=[("male", "Male"), ("female", "Female")])
    weight      = models.FloatField()
    age         = models.IntegerField()
    height      = models.FloatField()
    weight_goal = models.FloatField()
    fitness_goal= models.CharField(max_length=11, choices=[
        ("weight_loss", "weight_loss"),
        ("muscle_gain", "muscle_gain"),
        ("maintenance", "maintenance"),
    ])
