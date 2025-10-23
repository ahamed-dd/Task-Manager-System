from django.urls import path
from .views import ListCreateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [

    path('register/', ListCreateView.as_view(), name="reg_list_create"),
    # path('register/<int:pk>/', RetriveUDView.as_view(),name="reg_update_delete")
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    ]
