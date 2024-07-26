from django.urls import path, include
from .views import *

urlpatterns = [
    path("inc/", IncomeAPIView.as_view(), name="inc"),
    path("cat/", CategoryAPIView.as_view(), name="cat"),
    path("exp/", ExpenseAPIView.as_view(), name="exp"),
    path("bud/", BudgetAPIView.as_view(), name="bud"),
    path(
        "income.updelete/<str:pk>",
        IncomeRetrieveUpdateDeleteAPIView.as_view(),
        name="updestroy",
    ),
    path(
        "expense.updelete/<str:pk>",
        ExpenseRetrieveUpdateDeleteAPIView.as_view(),
        name="updestroy",
    ),
    path(
        "budget.updelete/<str:pk>",
        BudgetRetrieveUpdateDeleteAPIView.as_view(),
        name="updestroy",
    ),
    path(
        "monthly_income/",
        MonthlyIncomeRetrieveView.as_view(),
        name="monthly-incomes",
    ),
    path(
        "monthly_expense/",
        MonthlyExpenseRetrieveView.as_view(),
        name="monthly-expense",
    ),
]
