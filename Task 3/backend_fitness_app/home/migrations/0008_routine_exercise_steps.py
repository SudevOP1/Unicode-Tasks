# Generated by Django 5.0.4 on 2024-10-21 12:24

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_alter_healthdetail_fitness_goal'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Routine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sun', models.CharField(max_length=20)),
                ('mon', models.CharField(max_length=20)),
                ('tue', models.CharField(max_length=20)),
                ('wed', models.CharField(max_length=20)),
                ('thu', models.CharField(max_length=20)),
                ('fri', models.CharField(max_length=20)),
                ('sat', models.CharField(max_length=20)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Exercise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('reps', models.IntegerField()),
                ('sets', models.IntegerField()),
                ('day', models.CharField(choices=[('sun', 'sun'), ('mon', 'mon'), ('tue', 'tue'), ('wed', 'wed'), ('thu', 'thu'), ('fri', 'fri'), ('sat', 'sat')], max_length=3)),
                ('routine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exercises', to='home.routine')),
            ],
        ),
        migrations.CreateModel(
            name='Steps',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('steps', models.IntegerField()),
                ('day', models.CharField(choices=[('sun', 'sun'), ('mon', 'mon'), ('tue', 'tue'), ('wed', 'wed'), ('thu', 'thu'), ('fri', 'fri'), ('sat', 'sat')], max_length=3)),
                ('routine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='steps', to='home.routine')),
            ],
        ),
    ]
