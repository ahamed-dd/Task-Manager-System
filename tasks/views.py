from rest_framework import generics
from .serializers import Task_Serializer
from rest_framework.permissions import IsAuthenticated
from .models import Tasks


class TaskListView(generics.ListAPIView):
    serializer_class = Task_Serializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Tasks.objects.filter(owner=self.request.user)

class TaskCreateView(generics.CreateAPIView):
    serializer_class = Task_Serializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Tasks.objects.filter(owner=self.request.user)

class TaskUpdateDeleteView(generics.RetrieveDestroyAPIView):
    serializer_class = Task_Serializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Tasks.objects.filter(owner=self.request.user)

