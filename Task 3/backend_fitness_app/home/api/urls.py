from django.urls import path
from . import views
from .views import *

from rest_framework_simplejwt.views import (TokenRefreshView)

urlpatterns = [
    path("", views.getRoutes, name="routes"),
    path("health-details/", views.getHealthDetails, name="health-details"),

    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_view"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
