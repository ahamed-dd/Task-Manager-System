from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import user_serializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()

            res.data = {"success": True}
            res.delete_cookie("acess_token", path="/")
            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path='/'
            )
            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="None",
                path='/'
            )
            return res
        except: 
            return Response({"success": False})
        
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)

            tokens = response.data
            access_token = tokens['access']

            res = Response()

            res.data = {'refreshed':True}

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path='/')
            
            return res

        except:
            return Response()
        
class LogoutView(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        try:
            res = Response()
            res.data = {"success":True}
            res.delete_cookie('access_token', path='/', samesite='None')
            res.delete_cookie('refresh_token', path='/', samesite='None')
            
            return res
        except:
            return Response({"success": False})
        


class ListCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = user_serializer

class GetCurrentUserView(generics.RetrieveAPIView):
    
    serializer_class = user_serializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    

# class RetriveUDView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = User.objects.all()
#     serializer_class = user_serializer
#     permission_classes = [IsAuthenticated]