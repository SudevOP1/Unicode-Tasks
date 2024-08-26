from django.urls import path
from . import views
from django.contrib import admin


# Urls
urlpatterns = [
    path("", views.index, name="index"),

    path("add/", views.add, name="add"),
    path('delete/<int:task_id>/', views.delete, name='delete'),
    path('markcomplete/<int:task_id>/', views.mark_complete, name='markcomplete'),
    path('markincomplete/<int:task_id>/', views.mark_incomplete, name='markincomplete'),

    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('register/', views.register, name='register'),
]