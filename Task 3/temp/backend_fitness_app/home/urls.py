from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('api/create-user/', views.create_user, name="create_user"),
    path('api/user-list/', views.user_list, name="user_list"),
    path('api/user-details/<str:user_id>/', views.user_details, name="user_details"),
]
