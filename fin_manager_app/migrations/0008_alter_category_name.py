# Generated by Django 5.0 on 2024-05-27 08:46

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("fin_manager_app", "0007_delete_customuser"),
    ]

    operations = [
        migrations.AlterField(
            model_name="category",
            name="name",
            field=models.CharField(max_length=120, null=True, unique=True),
        ),
    ]