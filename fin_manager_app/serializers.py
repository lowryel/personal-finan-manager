from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class IncomeSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)
    income_id = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Income
        fields = ["income_id", "user", "amount", "date", "source"]

    def save(self, **kwargs):
        print(kwargs)
        return super().save(**kwargs)

    def create(self, validated_data):
        return super().create(validated_data)

    def get_validators(self):
        return super().get_validators()


class ExpenseSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    expense_id = serializers.StringRelatedField(read_only=True)
    category = serializers.StringRelatedField()
    class Meta:
        model = Expense
        fields = ["expense_id", "user", "amount", "date_incurred", "description", "category", "item_name"]

    def save(self, **kwargs):
        return super().save(**kwargs)

    def get_category(self):
        return self.category.name
    
    # def get_user_mod(self, obj):
    #     return obj.user.username


class BudgetSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    budget_id = serializers.StringRelatedField()
    class Meta:
        model = Budget
        fields = ["budget_id", "position", "user", "total_budget", "date"]

    def save(self, **kwargs):
        return super().save(**kwargs)
    
    def get_position(self, obj):
        if self.obj.total_budget >0:
            self.obj.position="SURPLUS"
        else:
            self.obj.position="DEFICIT"
        return 
