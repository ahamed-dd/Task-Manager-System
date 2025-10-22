from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import user_serializer

# Create your views here.
class ListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = user_serializer

class RetriveUDView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = user_serializer
