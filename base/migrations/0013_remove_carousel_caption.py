# Generated by Django 3.2.6 on 2021-08-23 08:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0012_auto_20210823_1053'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='carousel',
            name='caption',
        ),
    ]
