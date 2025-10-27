from django.db import models

# Create your models here.
class Tasks(models.Model):
    task = models.CharField(max_length=100, blank=False)
    description = models.TextField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    category = models.CharField(max_length=100,blank=True)
