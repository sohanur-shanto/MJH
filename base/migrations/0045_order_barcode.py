# Generated by Django 3.2.6 on 2021-09-07 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0044_auto_20210906_1919'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='barcode',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
