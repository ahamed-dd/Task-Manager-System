from rest_framework import serializers
import re
from django.contrib.auth import get_user_model

User = get_user_model()


class user_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {"password": {"write_only": True}}

    def validate_username(self, value):
        if not value.islower():
            raise serializers.ValidationError("Username should be all lowercase characters")
        return value
    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Password must contain more than 6 characters")
        
        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must atleast contain a single number")
        
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("Password must atleast contain a special Character")
        
        return value
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)