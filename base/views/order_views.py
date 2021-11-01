from django import template
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import *
from base.serializers import *
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from datetime import datetime
from base.custompermissions import IsVendor
from datetime import datetime, timedelta
from django.core.mail import message, send_mail
from django.conf import settings
from django.template.loader import get_template
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.template.loader import render_to_string

 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):

    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)

    else:

        order = Order.objects.create(
            user=user,
            paymentMethod = data['paymentMethod'],
            # customerType = data['customerType'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice']
        )

        shipping = ShippingAddress.objects.create(
            order=order,
            address= data['shippingAddress']['address'],
            city= data['shippingAddress']['address'],
            postalCode = data['shippingAddress']['postalCode'],
            number = data['shippingAddress']['number'],

        )

        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )


            product.countInStock -= int(item.qty)
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
        



@api_view(['POST'])
def note(request):
    data = request.data
    paymentverification = PaymentVerification.objects.create(

            image = data['image'],
            order_number = data['order_number'],
            account_number = data['account_number'],
        )
    
    serializer = PaymentVerificationSerializer(paymentverification, many=False)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:

        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
            
        else:
            Response({'detail': 'Not Authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)

    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all().order_by('-createdAt')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)




@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)
    DONE = 'DONE'
    order.isPaid = True
    order.paidAt = datetime.now()
    s = order.paidAt
    print(s)
    order.status = DONE
    order.save()
    return Response('Order was paid')



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all().order_by('-createdAt')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data) 