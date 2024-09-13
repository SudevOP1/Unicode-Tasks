from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),

    # Create
    path('task-create', views.taskCreate, name="task-create"),

    # Read
    path('task-list', views.taskList, name="task-list"),
    path('task-detail/<str:primary_key>/', views.taskDetail, name="task-detail"),

    # Update
    path('task-update/<str:primary_key>/', views.taskUpdate, name="task-update"),

    # Delete
    path('task-delete/<str:primary_key>/', views.taskDelete, name="task-delete"),
]
