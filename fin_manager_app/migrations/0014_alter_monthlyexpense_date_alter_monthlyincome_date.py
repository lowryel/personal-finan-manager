# Generated by Django 5.0 on 2024-07-26 12:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("fin_manager_app", "0013_alter_monthlyincome_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="monthlyexpense",
            name="date",
            field=models.DateField(
                default=datetime.datetime(
                    2024, 7, 26, 12, 56, 13, 85595, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="monthlyincome",
            name="date",
            field=models.DateField(
                default=datetime.datetime(
                    2024, 7, 26, 12, 56, 13, 84348, tzinfo=datetime.timezone.utc
                )
            ),
        ),
    ]
