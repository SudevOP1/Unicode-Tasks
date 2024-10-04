from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models      import *

# Create your views here.

def index(request):
    return render(request, "index.html")

@api_view(["POST"])
def create_user(request):

    # creating User (from django.contrib.auth.models) instance by copying the posted data
    user_data = request.data.copy()
    try:
        user = User.objects.create_user(
            username = user_data.pop("email"),
            email    = user_data["email"],
            password = user_data["password"]
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # creating UserProfile (from models.py) instance
    user_profile_data = user_data
    user_profile_data["user"] = user.id
    
    serializer = UserProfileSerializer(data=user_profile_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def user_list(request):
    users = UserProfile.objects.all()
    serializer = UserProfileSerializer(users, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def user_details(request, user_id):
    user = UserProfile.objects.get(id=user_id)
    serializer = UserProfileSerializer(user)
    return Response(serializer.data)