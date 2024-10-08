# Generated by Django 5.0.4 on 2024-10-07 15:44

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=12)),
                ('fullname', models.CharField(max_length=50)),
                ('profile_pic', models.ImageField(blank=True, null=True, upload_to='profile_pics/')),
                ('dob', models.DateField()),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], max_length=6)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='HealthDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight', models.FloatField(validators=[django.core.validators.MinValueValidator(0)])),
                ('age', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('height', models.FloatField(validators=[django.core.validators.MinValueValidator(0)])),
                ('weight_goal', models.FloatField(validators=[django.core.validators.MinValueValidator(0)])),
                ('fitness_goal', models.CharField(choices=[('Weight Loss', 'Weight Loss'), ('Muscle Gain', 'Muscle Gain'), ('Maintenance', 'Maintenance')], max_length=50)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.userprofile')),
            ],
        ),
    ]
