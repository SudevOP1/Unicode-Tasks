# Generated by Django 5.0.4 on 2024-10-19 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_remove_healthdetail_email_alter_healthdetail_gender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='healthdetail',
            name='fitness_goal',
            field=models.CharField(choices=[('weight_loss', 'Weight Loss'), ('muscle_gain', 'Muscle Gain'), ('maintenance', 'Maintenance')], max_length=11),
        ),
    ]