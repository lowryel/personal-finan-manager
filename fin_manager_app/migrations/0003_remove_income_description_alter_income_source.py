# Generated by Django 5.0 on 2024-05-20 12:05

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        (
            "fin_manager_app",
            "0002_remove_budget_description_remove_budget_end_date_and_more",
        ),
    ]

    operations = [
        migrations.RemoveField(
            model_name="income",
            name="description",
        ),
        migrations.AlterField(
            model_name="income",
            name="source",
            field=models.CharField(
                choices=[
                    ("SALARY", "Salary"),
                    ("ROI", "Return on Investment"),
                    ("GIFTS", "Gifts"),
                    ("OTHERS", "Others"),
                    ("NONE", "None"),
                ],
                default="NONE",
                max_length=64,
            ),
        ),
    ]
