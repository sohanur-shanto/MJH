from os import name
from django.urls import path
from base.views import product_views as views


urlpatterns = [
    
    path('', views.getProducts, name="products"),
    path('category', views.getP, name="p"),
    path('top', views.getTopProducts, name="top-products"),
    path('storm', views.getStormProducts, name="storm-products"),
    path('<str:pk>', views.getProduct, name="product"),
    
]


# from os import name
# from django.urls import path
# from . import views



# urlpatterns = [
    
#     path('products/', views.getProducts, name="products"),
#     path('products/<str:pk>', views.getProduct, name="product"),

#     path('users/profile/', views.getUserProfile, name="users-profile"),
#     path('users/', views.getUsers, name="users"),
#     path('users/register/', views.registerUser, name='register'),
#     path('users/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    
#     path('vendors/', views.getVendors, name="vendors"),
#     path('vendors/<str:pk>', views.getVendor, name="vendor"),
    

# ]





# from django.shortcuts import render
# from django.http import JsonResponse
# from rest_framework import serializers
# from .products import products
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from .models import *
# from .serializers import *

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework.permissions import IsAdminUser, IsAuthenticated

# from django.contrib.auth.hashers import make_password
# from rest_framework import status




# @api_view(['GET'])
# def getProducts(request):
#     products = Product.objects.all()
#     serializer = ProductSerializer(products, many=True)
#     return Response(serializer.data)



# @api_view(['GET'])
# def getProduct(request, pk):
#     product = Product.objects.get(_id=pk)
#     serializer = ProductSerializer(product, many=False)
#     return Response(serializer.data)



# @api_view(['GET'])
# def getVendors(request):
#     vendors = Vendor.objects.all()
#     serializer = VendorSerializer(vendors, many=True)
#     return Response(serializer.data)



# @api_view(['GET'])
# def getVendor(request, pk):
#     vendor = Vendor.objects.get(id=pk)
#     serializer = VendorSerializer(vendor, many=False)
#     return Response(serializer.data)



# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

#     def validate(self, attrs):
#         data = super().validate(attrs)

#         serializer = UserSerializerWithToken(self.user).data

#         for k, v in serializer.items():
#             data[k] = v

#         return data



# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer



# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getUserProfile(request):
#     user = request.user
#     serializer = UserSerializer(user, many=False)
#     return Response(serializer.data)



# @api_view(['GET'])
# @permission_classes([IsAdminUser])
# def getUsers(request):
#     users = User.objects.all()
#     serializer = UserSerializer(users, many=True)
#     return Response(serializer.data)


# @api_view(['POST'])
# def registerUser(request):
#     data = request.data
#     try:

#         user = User.objects.create(
#             first_name = data['name'],
#             username = data['email'],
#             email = data['email'],
#             password = make_password(data['password'])
#         )

#     except:
#         message = {'detail': 'User with this email already exists'}
#         return Response(message, status=status.HTTP_400_BAD_REQUEST)


#     serializer = UserSerializerWithToken(user, many=False)
#     return Response(serializer.data)


