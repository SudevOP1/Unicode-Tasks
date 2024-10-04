from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

class UserProfile(models.Model):
    user        = models.OneToOneField(User, on_delete=models.CASCADE)
    email       = models.EmailField(unique=True)
    password    = models.CharField(max_length=12, null=False, blank=False)
    fullname    = models.CharField(max_length=50)
    profile_pic = models.ImageField(upload_to="profile_pics/", null=True, blank=True)
    dob         = models.DateField()
    gender      = models.CharField(max_length=6, choices=[("Male", "Male"), ("Female", "Female")])

    def __str__(self):
        return self.fullname
    
class HealthDetails(models.Model):
    user        = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    weight      = models.FloatField  (validators=[MinValueValidator(0)])
    age         = models.IntegerField(validators=[MinValueValidator(0)])
    height      = models.FloatField  (validators=[MinValueValidator(0)])
    weight_goal = models.FloatField  (validators=[MinValueValidator(0)])
    fitness_goal= models.CharField(max_length=50, choices=[
        ("Weight Loss", "Weight Loss"),
        ("Muscle Gain", "Muscle Gain"),
        ("Maintenance", "Maintenance"),
    ])

    def __str__(self): return self.user.fullname
