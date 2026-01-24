from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class CreateUserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    role = serializers.ChoiceField(choices=["ADMIN", "TEACHER"])
    status = serializers.ChoiceField(
        choices=["ACTIVE", "INACTIVE", "SUSPENDED"],
        required=False
    )

    def create(self, validated_data):
        status_value = validated_data.pop("status", "ACTIVE")
        password = validated_data.pop("password")

        user = User.objects.create_user(
            password=password,
            **validated_data
        )
        user.status = status_value
        user.save()
        return user
