from django.contrib import admin
from fin_manager_app.models import *

# Register your models here.

class IncomeAdmin(admin.ModelAdmin):
    list_display = ["user" ,"amount", "source", "date"]


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ["user", "amount", "item_name", "date_incurred", "category"]


class BudgetAdmin(admin.ModelAdmin):
    list_display = ["user", "total_budget", "position", "date"]


class MonthlyIncomeAdmin(admin.ModelAdmin):
    list_display = ["owner", "total_amount", "date"]


class MonthlyExpenseAdmin(admin.ModelAdmin):
    list_display = ["owner", "total_amount", "date"]


admin.site.register(Category)
admin.site.register(Income, IncomeAdmin)
admin.site.register(Expense, ExpenseAdmin)
admin.site.register(Budget, BudgetAdmin)
admin.site.register(MonthlyIncome, MonthlyIncomeAdmin)
admin.site.register(MonthlyExpense, MonthlyExpenseAdmin)
