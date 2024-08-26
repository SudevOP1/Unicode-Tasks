from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


# Admin Header Customization
admin.site.site_header = "Welcome to Developer Page"
admin.site.site_title  = "Admin Panel"
admin.site.index_title = "Dashboard"


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("home.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)