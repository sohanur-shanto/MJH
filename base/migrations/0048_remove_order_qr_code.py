# Generated by Django 3.2.6 on 2021-09-07 11:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0047_order_qr_code'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='qr_code',
        ),
    ]
