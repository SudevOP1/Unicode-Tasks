# Generated by Django 5.0.4 on 2024-10-31 16:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0018_healthdetail_date_created'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='healthdetail',
            name='date_created',
        ),
    ]
