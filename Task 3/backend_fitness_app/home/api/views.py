from django.http import JsonResponse                                        # type: ignore
from django.contrib.auth.models import User                                 # type: ignore

from rest_framework             import status                               # type: ignore
from rest_framework.response    import Response                             # type: ignore
from rest_framework.decorators  import api_view, permission_classes         # type: ignore
from rest_framework.permissions import IsAuthenticated                      # type: ignore

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer  # type: ignore
from rest_framework_simplejwt.views import TokenObtainPairView              # type: ignore

from .serializers import HealthDetailSerializer
from home.models import HealthDetail

# --------------------------------------------------------------------------------------------------

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/api/token",
        "/api/token/refresh",
    ]

    return Response(routes)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getHealthDetails(request):
    user = request.user
    health_details = user.healthdetail_set.all()
    serializer = HealthDetailSerializer(health_details, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def registerUser(request):

    print("registerUser view called")

    username = request.data.get("username")
    password = request.data.get("password")
    email    = request.data.get("email")

    # check if username already exists
    if User.objects.filter(username = username).exists():
        return Response(
            {
                "detail": "A user with this username already exists"
            },
            status = status.HTTP_400_BAD_REQUEST
        )
    
    # check if email already exists
    if User.objects.filter(email = email).exists():
        return Response(
            {
                "detail": "A user with this email already exists"
            },
            status = status.HTTP_400_BAD_REQUEST
        )
    
    # Create a user recreate the user if deleted previously
    user, created = User.objects.get_or_create(username=username)

    if created:
        # If the user was just created, set the password
        user.set_password(password)
        user.email = email
        user.save()
    else:
        # If the user already exists, check if the password matches
        if not user.check_password(password):
            return Response(
                {
                    "detail": "Incorrect password"
                },
                status = status.HTTP_400_BAD_REQUEST
            )

    data = request.data.copy()
    data["user"] = user.id
    data["email"] = email
    data.pop('username', None)
    data.pop('password', None)
    data.pop('email', None)

    # Serialize and save health details
    serializer = HealthDetailSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
