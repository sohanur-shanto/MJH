from re import T
from django.db.models import manager
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import *
from base.serializers import *
from rest_framework import status
import random


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getStormProducts(request):
    products = Product.objects.all().filter(isStorm=True)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTopProducts(request):
    carousels = Carousel.objects.all().order_by('-id')[0:10]
    serializer = CarouselSerializer(carousels, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductWithRelatedSerializer(product, many=False)
    return Response(serializer.data)
    

    # related = Product.objects.filter(category=product.category).exclude(_id=pk).order_by('?')[:4]
    # print(related)
# @api_view(['GET'])
# def getCategoryProducts(request):
#     query1 = request.query_params.get('keyword')
#     if query1 == None:
#         query1= ''

#     products = Product.objects.filter(category___id__iexact=1)
#     serializer = ProductSerializer(products, many=True)
#     return Response(serializer.data)



@api_view(['GET'])
def getP(request):
    query = request.query_params.get('keyword1')
    if query == None:
        query = ''

    products = Product.objects.filter(category__id__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


    # p = Product.objects.all().filter(category = 1)

    # context = {
    #         "request": request,
    #     }
        
    # first_serializer = ProductSerializer(products, many= True, context=context)
    # second_serializer = ProductSerializer(p, many= True, context=context)
    # response = first_serializer.data + second_serializer.data
    # return Response(response)


# You can create context with both the serializers data. context = 
# { 'product':product_serializer.data,  'related_products': related_products_serializer.data }
#  return Response(context)