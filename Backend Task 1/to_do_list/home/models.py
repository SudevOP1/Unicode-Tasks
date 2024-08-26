from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):
    username     = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name="task")
    name         = models.CharField(max_length=20)
    desc         = models.TextField()
    priority     = models.IntegerField(default=2)
    is_completed = models.BooleanField(default=False)
    due_date     = models.DateTimeField(auto_now=False, auto_now_add=False)
    image        = models.ImageField(max_length=200)

    def __str__(self):
        return self.name