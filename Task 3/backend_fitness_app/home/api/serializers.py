from rest_framework.serializers import ModelSerializer # type: ignore
from home.models import *

class HealthDetailSerializer(ModelSerializer):
    class Meta:
        model = HealthDetail
        fields = "__all__"
