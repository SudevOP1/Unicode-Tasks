# Generated by Django 5.0.4 on 2024-11-01 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0020_healthdetail_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dailyweight',
            name='date',
            field=models.DateField(auto_now=True),
        ),
    ]
