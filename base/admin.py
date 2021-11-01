from django.contrib import admin
from import_export import fields, resources
from .models import *
from import_export.admin import ImportExportModelAdmin
from django.contrib.admin import SimpleListFilter

admin.site.register(Vendor)
admin.site.register(Category)
admin.site.register(Subcategory)

# admin.site.register(Review)


class ProductAdmin(ImportExportModelAdmin):
    list_display = ('name', 'countInStock', 'createdAt')
    list_filter = ['name', 'countInStock', 'createdAt']


class PaymentVerificationAdmin(ImportExportModelAdmin):
    list_display = ('id', 'order_number', 'account_number', 'image', 'createdAt')
    list_filter = ['id', 'order_number', 'createdAt']


admin.site.register(PaymentVerification, PaymentVerificationAdmin)
admin.site.register(Product, ProductAdmin)


class OrderItemResource(resources.ModelResource):
    class Meta:
        model = OrderItem
        fields = ('_id', 'product', 'order', 'name', 'qty', 'price') 


class OrderItemAdmin(ImportExportModelAdmin):
    resource_class = OrderItemResource
    list_display = ('name', 'order', 'qty', 'get_order', 'get_payment_status')
    list_filter = ['_id', 'order']

    def get_order(self, obj):
        return obj.order.isPaid

    def get_payment_status(self, obj):
        return obj.order.status
    
    get_payment_status.admin_order_field = 'order'
    get_payment_status.short_description = 'Payment Status'

    get_order.admin_order_field = 'order'
    get_order.short_description = 'Paid ?'


class OrderResource(resources.ModelResource):
    class Meta:
        model = Order
        fields = ('_id', 'user', 'paymentMethod', 'taxPrice', 'shippingPrice', 'totalPrice', 'isPaid', 'paidAt', 'isDelivered', 'createdAt', 'status', 'orderStatus', 'customerType') 


class OrderAdmin(ImportExportModelAdmin):
    resource_class = OrderResource
    list_display = ('_id', 'user', 'totalPrice', 'isPaid', 'status', 'paidAt', 'orderStatus', 'createdAt')
    list_filter = ['_id', 'user', 'isPaid', 'status', 'orderStatus', 'paidAt', 'createdAt']
  



admin.site.register(Order, OrderAdmin)



class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ('address', 'order')


admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(ShippingAddress, ShippingAddressAdmin)
admin.site.register(Carousel)
