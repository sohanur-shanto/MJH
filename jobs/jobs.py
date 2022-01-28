# from django.conf import settings
# import json
# from datetime import time, timedelta, tzinfo
# import datetime
# from base.models import *
# import pytz
# from django.db.models.functions import Now
# from django.core.mail import message, send_mail
# from django.conf import settings
# from django.template.loader import get_template
# from django.core.mail import EmailMessage, EmailMultiAlternatives
# from django.template.loader import render_to_string



# def my_scheduled_job():
#     print('--------------------------------------------------------------')
#     print('--------------------------------------------------------------')
#     print('Background task is running. Please wait sometime and try again')
#     print('--------------------------------------------------------------')
#     print('--------------------------------------------------------------')

#     pending_orders = Order.objects.filter(isPaid = False)
#     for order in pending_orders:
#         now = datetime.now()
#         now = now.replace(tzinfo=pytz.utc)
#         pending = (order.createdAt + timedelta(days=1))
#         pending = pending.replace(tzinfo=pytz.utc)
#         if now > pending :
#             order.orderStatus = 'Cancel'
#             order.save()
        


# def my_email():
#     print('--------------------------------------------------------------')
#     print('--------------------------------------------------------------')
#     print('Email Order task is running. Please wait sometime and try again')
#     print('--------------------------------------------------------------')
#     print('--------------------------------------------------------------')

#     order = Order.objects.filter(createdAt__gt=Now()-timedelta(minutes=5))
#     p = str(settings.BASE_DIR)
#     with open(p + '/templates/email.html') as f:
#         order_message = f.read()
#     for o in order:
#         print(o._id)
#         email = EmailMultiAlternatives(subject='Laksura Order Confirmation', body=order_message, from_email='laksura.com.bd@gmail.com', to=[o.user.email] )
#         print(o.user.email)
#         html_template = get_template('templates/email.html').render()
#         html_template = render_to_string('templates/email.html', {'name': o.user.first_name, 'order_id': o._id, 'total': o.totalPrice, 'created': o.createdAt, 'status': o.status})
#         email.attach_alternative(html_template, "text/html")
#         email.send()



# def my_payment():
#     print('--------------------------------------------------------------')
#     print('--------------------------------------------------------------')
#     print('Email Payment task is running. Please wait sometime and try again')
#     print('--------------------------------------------------------------')
#     print('--------------------------------------------------------------')

#     order = Order.objects.filter(createdAt__gt=Now()-timedelta(minutes=10))
#     c = str(settings.BASE_DIR)
#     with open(c + '/templates/payment.html') as f:
#         order_message = f.read()

#     for o in order:
#         if o.isPaid == True:
#             print(o._id)
#             email = EmailMultiAlternatives(subject='Laksura Payment Confirmation', body=order_message, from_email='laksura.com.bd@gmail.com', to=[o.user.email] )
#             print(o.user.email)
#             html_template = get_template('templates/payment.html').render()
#             html_template = render_to_string('templates/payment.html', {'name': o.user.first_name, 'order_id': o._id, 'total': o.totalPrice, 'created': o.createdAt})
#             email.attach_alternative(html_template, "text/html")
#             email.send()



