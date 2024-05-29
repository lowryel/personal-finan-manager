from django.db.models import Sum
from datetime import datetime
from fin_manager_app.views import Income, Expense
import logging


Logger = logging.getLogger(__name__)

# calculate total income for the month
def get_total_income_for_month(user):
    now = datetime.now()
    total_income = Income.objects.filter(
        user=user,
        date__year=now.year,
        date__month=now.month
    ).aggregate(Sum('amount'))['amount__sum'] or 0
    total_income=f'{total_income:.2f}'
    Logger.info(total_income)
    return total_income


# calculate total expenses for the month
def get_total_expense_for_month(user):
    now = datetime.now()
    total_expense = Expense.objects.filter(
        user=user,
        date_incurred__year=now.year,
        date_incurred__month=now.month
    ).aggregate(Sum('amount'))['amount__sum'] or 0
    total_expense = f"{total_expense:.2f}"
    Logger.info(total_expense)
    return total_expense
