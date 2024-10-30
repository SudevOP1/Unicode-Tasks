from django.urls import path        # type: ignore
from . import views
from .views import *

urlpatterns = [
    path("",                                        views.getRoutes,                name="routes"),
    path("get-quote/",                              views.getQuote,                 name="get-quote"),
    path("create-weekly-routine/",                  views.createWeeklyRoutine,      name="create-weekly-routine"),
    path("save-weekly-routine/",                    views.saveWeeklyRoutine,        name="save-weekly-routine"),
    path("get-weekly-routine/",                     views.getWeeklyRoutine,         name="get-weekly-routine"),
    path("toggle-exercise-completed/",              views.toggleExerciseCompleted,  name="toggle-exercise-completed"),
    path("toggle-steps-completed/",                 views.toggleStepsCompleted,     name="toggle-steps-completed"),
]
