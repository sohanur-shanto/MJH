# Generated by Django 3.2.6 on 2021-09-08 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0048_remove_order_qr_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='paymentverification',
            name='nid_number',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
