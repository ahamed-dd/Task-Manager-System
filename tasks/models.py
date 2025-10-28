from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Tasks(models.Model):
    STATUS_CHOICES = [
        ('pending', "Pending"),
        ('completed', 'Completed'), 
        ('overdue', 'Overdue')
    ]
    task = models.CharField(max_length=100, blank=False)
    description = models.TextField(max_length=500, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    due_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    category = models.CharField(max_length=100,blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    
    def __str__(self):
        return f"{self.task} ({self.status})"
