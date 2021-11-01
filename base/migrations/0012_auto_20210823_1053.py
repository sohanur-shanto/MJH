# Generated by Django 3.2.6 on 2021-08-23 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_carousel'),
    ]

    operations = [
        migrations.RenameField(
            model_name='carousel',
            old_name='image1',
            new_name='image',
        ),
        migrations.RemoveField(
            model_name='carousel',
            name='image10',
        ),
        migrations.RemoveField(
            model_name='carousel',
            name='image2',
        ),
        migrations.RemoveField(
            model_name='carousel',
            name='image3',
        ),
        migrations.RemoveField(
            model_name='carousel',
            name='image4',
        ),
        migrations.RemoveField(
            model_name='carousel',
            name='image5',
        ),
        migrations.RemoveField(
            model_name='carousel',
            name='image6',
        ),
        migrations.RemoveField(
            model_name='carousel',
            name='image7',
        ),
        migrations.RemoveField(
            model_name='carousel',
            name='image8',
        ),
        migrations.RemoveField(
            model_name='carousel',
            name='image9',
        ),
        migrations.AddField(
            model_name='carousel',
            name='caption',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]