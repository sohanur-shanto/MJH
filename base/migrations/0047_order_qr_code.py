# Generated by Django 3.2.6 on 2021-09-07 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0046_remove_order_barcode'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='qr_code',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]