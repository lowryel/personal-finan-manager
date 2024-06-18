from django.db import models
from django.contrib.auth.models import AbstractUser, User, AbstractBaseUser
import uuid

from django.db.models import Sum

from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from django.utils import timezone


# Create your models here.

# showing category of expense made
class Category(models.Model):
    name = models.CharField(max_length=120, null=True, unique=True)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name="Category"
        verbose_name_plural="Categories"


# source of income choices
INCOME_SOURCE = (
    ("SALARY", "Salary"),
    ("ROI", "Return on Investment"),
    ("GIFTS", "Gifts"),
    ("OTHERS", "Others"),
    ("NONE", "None")
)

class Income(models.Model):
    income_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    amount = models.DecimalField(decimal_places=2, max_digits=15, default=0.00)
    source = models.CharField(max_length=64, choices=INCOME_SOURCE, default="NONE")
    date = models.DateField(default=timezone.now)

    def __str__(self):
        return str(self.income_id)

    class Meta:
        verbose_name="Income"
        verbose_name_plural="Income"
        indexes = [
            models.Index(fields=['user', 'date']),
        ]
        ordering = ['date']
        get_latest_by = 'date'

    def get_absolute_url(self):
        return f"/income.updelete/{self.income_id}"


class Expense(models.Model):
    expense_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=2, max_digits=15, default=0.00)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=256, null=True, help_text="Enter transaction (eg. egg, mortgage)")
    date_incurred = models.DateField(default=timezone.now)
    description = models.TextField()

    def __str__(self) -> str:
        return str(self.expense_id)

    class Meta:
        verbose_name="Expense"
        verbose_name_plural="Expenses"

    def get_absolute_url(self):
        return f"/expense.updelete/{self.income_id}"


BUDGET_POSITIONS = (
    ("SURPLUS", "Surplus"),
    ("DEFICIT", "Deficit"),
    ("EQUAL", "Equal"),
)

class Budget(models.Model):
    budget_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_budget = models.DecimalField(decimal_places=2, max_digits=15, default=0.00)
    position = models.CharField(max_length=64, choices=BUDGET_POSITIONS, default="EQUAL")
    total_expenses = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    remaining_income = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    date = models.DateField(default=timezone.now)

    def __str__(self) -> str:
        return str(self.budget_id)

    class Meta:
        verbose_name="Budget"
        verbose_name_plural="Budgets"

    def get_absolute_url(self):
        return f"/budget.updelete/{self.budget_id}"
    
    # def get_remaining_income(self):
    #     self.remaining_income = self.total_budget
    #     return self.remaining_income


# create a budget for the income and expenses
@receiver(post_save, sender=Income)
def update_monthly_budget_report_on_income_save(sender, created, instance, **kwargs):
    date = timezone.now()
    user = instance.user

    total_income = Income.objects.filter(
        user=user,
        date__month=date.month,
        date__year=date.year
    ).aggregate(Sum('amount'))['amount__sum'] or 0

    total_expenses = Expense.objects.filter(
            user=user, 
            date_incurred__month=date.month, 
            date_incurred__year=date.year
        ).aggregate(Sum("amount"))["amount__sum"] or 0

    budget = total_income - total_expenses #computing total BUDGET
    print(budget)
    report, _ = Budget.objects.get_or_create(
        user=user,
        date__year=date.year,
        date__month=date.month
    )

    # reset budget position
    if created:
        report.total_budget = budget
        if report.total_budget >0:
            report.position = "SURPLUS"
            report.save()
        elif report.total_budget<0:
            report.position = "DEFICIT"
            report.save()


# create a budget for the income and expenses
@receiver(post_save, sender=Expense)
def update_monthly_budget_report_on_expense_save(sender, created, instance, **kwargs):
    date = timezone.now()
    user = instance.user

    total_income = Income.objects.filter(
            user=user, date__month=date.month, date__year=date.year
        ).aggregate(Sum("amount"))["amount__sum"] or 0

    total_expenses = Expense.objects.filter(
            user=user, date_incurred__month=date.month, date_incurred__year=date.year
        ).aggregate(Sum("amount"))["amount__sum"] or 0

    budget = total_income - total_expenses  # computing total BUDGET
    print(budget)
    report, _ = Budget.objects.get_or_create(
        user=user, date__year=date.year, date__month=date.month
    )

    # reset budget position
    if created:
        report.total_budget = float(budget)
        if report.total_budget > 0:
            report.position = "SURPLUS"
            report.save()
        elif report.total_budget < 0:
            report.position = "DEFICIT"
            report.save()


# create a budget for the income and expenses
@receiver(post_delete, sender=Income)
def update_monthly_budget_report_on_income_delete(sender, instance, **kwargs):
    date = timezone.now()
    user = instance.user

    total_income =Income.objects.filter(
            user=user, date__month=date.month, date__year=date.year
        ).aggregate(Sum("amount"))["amount__sum"] or 0

    total_expenses =Expense.objects.filter(
            user=user, date_incurred__month=date.month, date_incurred__year=date.year
        ).aggregate(Sum("amount"))["amount__sum"] or 0

    budget = total_income - total_expenses  # computing total BUDGET
    print(budget, "post_delete income")
    report, _ = Budget.objects.get_or_create(
        user=user, date__year=date.year, date__month=date.month
    )

    # reset budget position
    report.total_budget = budget
    if report.total_budget > 0:
        report.position = "SURPLUS"
        report.save()
    elif report.total_budget < 0:
        report.position = "DEFICIT"
        report.save()


# create a budget for the income and expenses
@receiver(post_delete, sender=Expense)
def update_monthly_budget_report_on_expense_delete(sender, instance, **kwargs):
    date = timezone.now()
    user = instance.user

    total_income =Income.objects.filter(
            user=user, date__month=date.month, date__year=date.year
        ).aggregate(Sum("amount"))["amount__sum"] or 0

    total_expenses =Expense.objects.filter(
            user=user, date_incurred__month=date.month, date_incurred__year=date.year
        ).aggregate(Sum("amount"))["amount__sum"] or 0

    budget = total_income - total_expenses  # computing total BUDGET
    print(budget, "post_delete expense")
    report, _ = Budget.objects.get_or_create(
        user=user, date__year=date.year, date__month=date.month
    )

    # reset budget position
    report.total_budget = budget
    if report.total_budget > 0:
        report.position = "SURPLUS"
        report.save()
    elif report.total_budget < 0:
        report.position = "DEFICIT"
        report.save()
