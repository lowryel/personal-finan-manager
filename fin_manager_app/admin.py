from django.contrib import admin
from fin_manager_app.models import *

# Register your models here.

admin.site.register(Category)
admin.site.register(Income)
admin.site.register(Expense)
admin.site.register(Budget)

