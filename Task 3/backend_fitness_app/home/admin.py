from django.contrib import admin # type: ignore
from .models import *

# Register your models here.
admin.site.register(HealthDetail)
admin.site.register(Routine)
admin.site.register(Exercise)
admin.site.register(Steps)
admin.site.register(DailyWeight)