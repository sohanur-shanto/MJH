# Generated by Django 3.2.6 on 2021-08-25 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0015_alter_product_brand'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='customer_type',
            field=models.CharField(blank=True, choices=[('Regular', 'Regular'), ('Police', 'Police'), ('RAB', 'RAB'), ('DGIF', 'DGIF'), ('CID', 'CID'), ('NAVY', 'NAVY'), ('Air Force', 'Air Force'), ('Army', 'Army'), ('DB', 'DB'), ('Administration', 'Administration')], max_length=200, null=True),
        ),
    ]
