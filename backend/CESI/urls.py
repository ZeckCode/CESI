from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect

def home(request):
    return redirect('announcements/')

urlpatterns = [
    path('', home),  # root URL
    path('admin/', admin.site.urls),
    path('announcements/', include('announcements.urls')),
    path('api/finance/', include('finance.urls')),
]
