from .views import TaskListView, TaskCreateView, TaskUpdateDeleteView
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('task/', TaskListView.as_view(), name='task_list'),
    path('task/create/', TaskCreateView.as_view(), name='task_create'),
    path('task/<int:pk>/', TaskUpdateDeleteView.as_view(), name='task_detail'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]