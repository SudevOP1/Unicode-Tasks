from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response   import Response
from .serializers import *
from .models      import *

# Create your views here.

@api_view(["GET"])
def index(request):
    json_file = {
        "background-color" : "green",
        "padding-left"     : "10px",
        "border"           : {
            "width" :"3px",
            "type"  :"solid",
            "color" :"red",
        },
    }

    return Response(json_file)


# Create
@api_view(["POST"])
def taskCreate(request):
    serializer = TaskSerializer(data=request.data)
    
    if serializer.is_valid(): serializer.save()
    
    return Response(serializer.data)


# Read
@api_view(["GET"])
def taskList(request):
    tasks      = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def taskDetail(request, primary_key):
    tasks      = Task.objects.get(id=primary_key)
    serializer = TaskSerializer(tasks, many=False)
    return Response(serializer.data)


# Update
@api_view(["POST"])
def taskUpdate(request, primary_key):
    task = Task.objects.get(id=primary_key)
    serializer = TaskSerializer(instance=task, data=request.data)
    
    if serializer.is_valid(): serializer.save()
    
    return Response(serializer.data)


# Delete
@api_view(["PUT"])
def taskDelete(request, primary_key):

    try:
        task = Task.objects.get(id=primary_key)
        task.delete()
        return Response("Task deleted successfully!!!!!!!!!!!!!!!")
    
    except: return Response("Task not found")