from rest_framework import generics
from .serializers import Task_Serializer
from rest_framework.permissions import IsAuthenticated
from django.utils.dateparse import parse_date
from .models import Tasks


class TaskListView(generics.ListAPIView):
    serializer_class = Task_Serializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            query_set = Tasks.objects.all()
        else:
            query_set = Tasks.objects.filter(owner=user)
        status = self.request.query_params.get('status')
        due_date = self.request.query_params.get('due_date')

        if status:
            query_set = query_set.filter(status=status)

        if due_date:
            date = parse_date(due_date)
            if date:
                query_set = query_set.filter(due_date=date)
        return query_set
    

class TaskCreateView(generics.CreateAPIView):
    serializer_class = Task_Serializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Tasks.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        return serializer.save(owner=self.request.user)

class TaskUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = Task_Serializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Tasks.objects.filter(owner=self.request.user)

