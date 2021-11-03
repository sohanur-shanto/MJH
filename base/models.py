from re import T
from django.db import models
from django.contrib.auth.models import User
from decimal import Decimal
from PIL import Image, ImageDraw
from datetime import datetime, timedelta
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail
from barcode.writer import ImageWriter
from io import BytesIO
from django.core.files import File
import qrcode
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import get_template
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.template.loader import render_to_string
 



class Vendor(models.Model):
    user = models.OneToOneField(User, related_name='vendor', on_delete=models.CASCADE)
    address = models.CharField(max_length=220)
    number = models.CharField(max_length=11, blank=True, null=True)
    company = models.CharField(max_length=220)

    def __str__(self):
        return self.company



class Category(models.Model):
    name = models.CharField(max_length=220)

    def __str__(self):
        return self.name



class Subcategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=220)

    def __str__(self):
        return self.name



class Product(models.Model):

    brand_choices = [

        ('TVS', 'TVS'),
        ('Hero', 'Hero'),
        ('Yamaha', 'TVS'),
        ('Minister', 'Minister'),
        ('Walton', 'Walton'),
        ('Suzuki', 'Suzuki'),

    ]

    user = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    name = models.CharField(max_length=220)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=220, null=True, blank=True, choices=brand_choices)
    category = models.ForeignKey(Subcategory, on_delete=models.CASCADE)
    description = models.TextField(max_length=10000)
    rating = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    old_price = models.DecimalField(max_digits=11, decimal_places=2)
    discount = models.IntegerField(blank=True, null=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    countInStock = models.IntegerField(blank=True, null=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    short_description = models.CharField(max_length=2000, blank=True, null=True)
    brandImage = models.ImageField(null=True, blank=True)
    isStorm = models.BooleanField(blank=True, null=True, default=False)
    _id = models.AutoField(primary_key=True, editable=False)
    

    def save(self, *args, **kwargs):
        self.price = Decimal(self.old_price * (100 - self.discount) / 100)
        return super(Product, self).save(*args, **kwargs)
    

    class Meta:
        ordering = ['-createdAt']


    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=220, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):

    PENDING_PAYMENT = 'Pending Payment'
    ON_HOLD = 'On Hold'

    status_choices = [

        ('Cancel', 'Cancel'),
        ('Pending Payment', 'Pending Payment'),
        ('On Hold', 'On Hold'),
        ('Waiting For Payment', 'Waiting For Payment'),
        ('Processing', 'Processing'),
        ('Done', 'Done'),

    ]

    orderstatus_choices = [

        ('Cancel', 'Cancel'),
        ('Pending Payment', 'Pending Payment'),
        ('On Hold', 'On Hold'),
        ('Waiting For Payment', 'Waiting For Payment'),
        ('Processing', 'Processing'),
        ('Done', 'Done'),

    ]

    Ordinary = 'Ordinary'

    customer_choices = [

        ('Ordinary', 'Ordinary'),
        ('Police', 'Police'),
        ('RAB', 'RAB'),
        ('DGIF', 'DGIF'),
        ('CID', 'CID'),
        ('NAVY', 'NAVY'),
        ('Air Force', 'Air Force'),
        ('Army', 'Army'),
        ('DB', 'DB'),
        ('Administration', 'Administration'),

    ]

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=11, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliverAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=220, choices=status_choices, default=PENDING_PAYMENT)
    orderStatus= models.CharField(max_length=220, choices=orderstatus_choices, default=ON_HOLD, blank=True, null=True)
    customerType = models.CharField(max_length=200, blank=True, null=True, choices=customer_choices, default=Ordinary)
    received = models.CharField(max_length=200, blank=True, null=True)
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self):
        return str(self._id)




class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name



class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=220, null=True, blank=True)
    city = models.CharField(max_length=30, null=True, blank=True)
    postalCode = models.CharField(max_length=20, null=True, blank=True)
    number = models.CharField(max_length=30, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=13, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.address
        


class Carousel(models.Model):
    image = models.ImageField(blank=True, null=True)

    def __str__(self):
        return str(self.id)



@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    link = 'localhost:3000/password/confirm/'

    p = str(settings.BASE_DIR)
    with open(p + '/templates/reset.html') as f:
        order_message = f.read()

    email = EmailMultiAlternatives(subject='Laksura Passowrd Reset Request', body=order_message, from_email='sohanur.shanto@northsouth.edu', to=[reset_password_token.user.email] )
    html_template = get_template('templates/reset.html').render()
    html_template = render_to_string('templates/reset.html', {'token': reset_password_token.key })
    email.attach_alternative(html_template, "text/html")
    email.send()



    # email_plaintext_message = "{}\nA request has been received to reset the password for your Laksura account. \nCopy this token number =     {}\nYou need this token to set your new password.\nGo to this link - http://" f'{link}' "\nPaste the above token and set new passowrd.".format(reverse('password_reset:reset-password-request'), reset_password_token.key)
    # send_mail(
    #     "Password Reset Request for {title}".format(title="Laksura Account"),
    #     email_plaintext_message,
    #     "laksura.com.bd@gmail.com",
        
    # )



class PaymentVerification(models.Model):
    order_number = models.CharField(max_length=200)
    image =  models.ImageField()
    account_number = models.CharField(max_length=200, blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)



