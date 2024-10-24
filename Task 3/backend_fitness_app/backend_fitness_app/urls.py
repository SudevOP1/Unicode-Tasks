from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("home.api.urls")),
    path("gemini-api/", include("home.gemini_api.urls"))
]
