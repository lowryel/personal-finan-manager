from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework import generics
from rest_framework.validators import ValidationError

from fin_manager_app.models import *
from django.db.models import Sum

from fin_manager_app.utils import get_total_income_for_month, get_total_expense_for_month

from fin_manager_app.serializers import (
        IncomeSerializer, ExpenseSerializer, 
        BudgetSerializer, CategorySerializer, MonthlyExpenseSerializer, MonthlyIncomeSerializer,
    )
# Create your views here.


class IncomeAPIView(generics.ListCreateAPIView):
    serializer_class = IncomeSerializer
    queryset = Income.objects.all().order_by("-date")
    permission_classes = [IsAuthenticated]
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
        JWTAuthentication,
    ]

    def perform_create(self, serializer):
        # Pass an additional owner field to the create method
        # To Set the owner to the user received in the request
        print(self.request.headers["Connection"])
        serializer.save(user=self.request.user)
        # debug income total
        get_total_income_for_month(self.request.user)

    # filter queryset by user (visible to the owner)
    def get_queryset(self):
        return self.queryset.filter(
            user=self.request.user,
            date__year=timezone.now().year,
            date__month=timezone.now().month,
        )

    def calculateIncome(self, request):
        return Income.objects.filter(user=request.user).aggregate(Sum("amount"))


class MonthlyIncomeRetrieveView(generics.ListAPIView):
    serializer_class = MonthlyIncomeSerializer
    queryset = MonthlyIncome.objects.all().order_by("-date")

    permission_classes = [IsAuthenticated]
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
        JWTAuthentication,
    ]
    # filter queryset by user (visible to the owner)
    def get_queryset(self):
        return self.queryset.filter(
            owner=self.request.user,
            # year=timezone.now().year,
            # month=timezone.now().month,
        )


class IncomeRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = IncomeSerializer
    queryset = Income.objects.all().order_by("-date")
    permission_classes = [IsAuthenticated]
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
        JWTAuthentication,
    ]

    # filter queryset by user (visible to the owner)
    def get_queryset(self):
        return self.queryset.filter(
            user=self.request.user,
            date__year=timezone.now().year,
            date__month=timezone.now().month,
        )


class ExpenseAPIView(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all().order_by("-date_incurred")
    permission_classes = [IsAuthenticated]
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
        JWTAuthentication,
    ]

    def perform_create(self, serializer):
        get_total_expense_for_month(self.request.user)
        # print(self.request.headers["Connection"])
        # print(self.request.user.expense_set.all()) #getting related expenses to the logged in user
        # Pass an additional owner field to the create method
        # To Set the owner to the user received in the request
        serializer.save(user=self.request.user)
        # debug expense total

    # filter queryset by user (visible to the owner)
    def get_queryset(self):
        return self.queryset.filter(
            user=self.request.user,
            date_incurred__year=timezone.now().year,
            date_incurred__month=timezone.now().month,
        )
        # return self.queryset.filter(user=self.request.user)


class MonthlyExpenseRetrieveView(generics.ListAPIView):
    serializer_class = MonthlyExpenseSerializer
    queryset = MonthlyExpense.objects.all().order_by("-date")

    permission_classes = [IsAuthenticated]
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
        JWTAuthentication,
    ]

    # filter queryset by user (visible to the owner)
    def get_queryset(self):
        return self.queryset.filter(
            owner=self.request.user,
        )


class ExpenseRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all().order_by("-date_incurred")
    lookup_name="expense_id"
    permission_classes = [IsAuthenticated]
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
        JWTAuthentication,
    ]

    # filter queryset by user (visible to the owner)
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class BudgetAPIView(generics.ListAPIView):
    serializer_class = BudgetSerializer
    queryset = Budget.objects.all().order_by("-date")
    permission_classes = [IsAuthenticated]
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
        JWTAuthentication,
    ]

    def perform_create(self, serializer):
        print(self.request.headers["Connection"])
        print(self.request.body)
        # Pass an additional owner field to the create method
        # To Set the owner to the user received in the request
        serializer.save(user=self.request.user)

    # filter queryset by user (visible to the owner)
    def get_queryset(self):
        return self.queryset.filter(
            user=self.request.user,
            date__year=timezone.now().year, 
            date__month=timezone.now().month
        )
        # return self.queryset.filter(user=self.request.user)


class BudgetRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BudgetSerializer
    queryset = Budget.objects.all().order_by("-date")
    lookup_name="budget_id"
    permission_classes = [IsAuthenticated]
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
        JWTAuthentication,
    ]

    # filter queryset by user (visible to the owner)
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class CategoryAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
        JWTAuthentication,
    ]


class CategoryRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    lookup_name="id"
    permission_classes = [IsAuthenticated]
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
        JWTAuthentication,
    ]
