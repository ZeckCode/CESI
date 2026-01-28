from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GradeViewSet, QuarterViewSet

router = DefaultRouter()
router.register(r'grades', GradeViewSet, basename='grade')
router.register(r'quarters', QuarterViewSet, basename='quarter')

urlpatterns = [
    path('', include(router.urls)),
]
