# Generated by Django 3.2.6 on 2021-09-06 12:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0040_auto_20210906_1839'),
    ]

    operations = [
        migrations.RenameField(
            model_name='paymentverification',
            old_name='title',
            new_name='order_number',
        ),
        migrations.RemoveField(
            model_name='paymentverification',
            name='user',
        ),
    ]
