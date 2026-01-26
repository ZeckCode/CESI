from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
# from .views import me, logout_view

def home(request):
    return redirect('announcements/')

urlpatterns = [
    path('', home),  # root URL
    path('admin/', admin.site.urls),
    path('announcements/', include('announcements.urls')),
    
    path('api/accounts/', include('accounts.urls')),  # <-- login endpoint
    path('api/', include('enrollment.urls')),  # <-- enrollment endpoints
    
]
