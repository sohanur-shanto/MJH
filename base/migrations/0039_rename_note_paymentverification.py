# Generated by Django 3.2.6 on 2021-09-06 12:16

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0038_rename_comments_note_comment'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Note',
            new_name='PaymentVerification',
        ),
    ]
