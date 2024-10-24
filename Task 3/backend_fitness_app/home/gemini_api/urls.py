from django.urls import path # type: ignore
from . import views
from .views import *

urlpatterns = [
    path("", views.getRoutes, name="routes"),
    path("create-and-get-weekly-routine/", views.createAndGetWeeklyRoutine, name="create-and-get-weekly-routine"),
    path("get-weekly-routine/", views.getWeeklyRoutine, name="get-weekly-routine"),
    path("get-quote/", views.getQuote, name="get-quote"),
]
