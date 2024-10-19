from django.urls import path # type: ignore
from . import views
from .views import *

urlpatterns = [
    path("", views.getRoutes, name="routes"),
    path("get-weekly-routine/", views.getWeeklyRoutine, name="get_weekly-routine"),
]
