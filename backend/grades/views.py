from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Grade, Quarter
from .serializers import GradeSerializer, QuarterSerializer


class QuarterViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing quarters (Q1, Q2, Q3, Q4)
    
    GET /api/quarters/ - List all quarters
    POST /api/quarters/ - Create a new quarter
    GET /api/quarters/{id}/ - Retrieve a specific quarter
    PUT /api/quarters/{id}/ - Update a quarter
    DELETE /api/quarters/{id}/ - Delete a quarter
    """
    queryset = Quarter.objects.all()
    serializer_class = QuarterSerializer


class GradeViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing student grades
    
    GET /api/grades/ - List all grades
    POST /api/grades/ - Create a new grade
    GET /api/grades/{id}/ - Retrieve a specific grade
    PUT /api/grades/{id}/ - Update a grade
    DELETE /api/grades/{id}/ - Delete a grade
    """
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer

    def get_queryset(self):
        """Filter grades by student_name or quarter if provided in query params"""
        queryset = Grade.objects.all()
        student_name = self.request.query_params.get('student_name')
        quarter = self.request.query_params.get('quarter')

        if student_name:
            queryset = queryset.filter(student_name__icontains=student_name)
        if quarter:
            queryset = queryset.filter(quarter__id=quarter)

        return queryset

