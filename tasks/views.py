from rest_framework import generics
from .serializers import Task_Serializer
from rest_framework.permissions import IsAuthenticated
from .models import Tasks


class TaskListView(generics.ListAPIView):
    queryset = Tasks.objects.all()
    serializer_class = Task_Serializer
    permission_classes = [IsAuthenticated]

class TaskCreateView(generics.CreateAPIView):
    queryset = Tasks.objects.all()
    serializer_class = Task_Serializer
    permission_classes = [IsAuthenticated]
    



# Create your views here.
