# Generated by Django 3.2.6 on 2021-09-06 07:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0030_auto_20210906_1317'),
    ]

    operations = [
        migrations.AddField(
            model_name='test',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]