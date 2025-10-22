from rest_framework import serializers
from .models import User
import re

class user_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def validate_user_name(self, value):
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