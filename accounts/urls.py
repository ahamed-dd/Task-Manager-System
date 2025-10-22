from django.urls import path
from .views import ListCreateView, RetriveUDView


urlpatterns = [

    path('register/', ListCreateView.as_view(), name="reg_list_create"),
    path('register/<int:pk>/', RetriveUDView.as_view(),name="reg_update_delete")
]