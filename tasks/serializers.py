from rest_framework import serializers
from .models import Tasks


class Task_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = "__all__"
        read_only_fields = ("owner",)
        

