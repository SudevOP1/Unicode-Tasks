# Generated by Django 5.0.4 on 2024-10-04 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='password',
            field=models.CharField(default='pass@123', max_length=12),
            preserve_default=False,
        ),
    ]