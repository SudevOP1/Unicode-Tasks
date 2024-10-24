# Generated by Django 5.0.4 on 2024-10-24 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0011_dailyweight'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercise',
            name='muscle',
            field=models.CharField(choices=[('Chest', 'Chest'), ('Shoulders', 'Shoulders'), ('Back', 'Back'), ('Biceps', 'Biceps'), ('Triceps', 'Triceps'), ('Legs', 'Legs'), ('Abs', 'Abs')], default='Biceps', max_length=10),
            preserve_default=False,
        ),
    ]