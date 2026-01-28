from rest_framework import serializers
from .models import Grade, Quarter


class QuarterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quarter
        fields = ['id', 'year', 'quarter', 'start_date', 'end_date']


class GradeSerializer(serializers.ModelSerializer):
    quarter_display = serializers.SerializerMethodField()

    class Meta:
        model = Grade
        fields = ['id', 'student_name', 'subject', 'quarter', 'quarter_display', 'score', 'comments', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def get_quarter_display(self, obj):
        return str(obj.quarter)
