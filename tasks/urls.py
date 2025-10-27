from .views import TaskListView, TaskCreateView
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('task/', TaskCreateView.as_view(), name="post_task"),
    path('tasks/', TaskListView.as_view(), name="get_task"),
    path('token/', TokenObtainPairView.as_view(), name="token_access"),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh")
]
