from django.test import TestCase
from django.contrib.auth.models import User
from .models import Income, INCOME_SOURCE

class IncomeModelTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')

    def test_create_income_with_valid_data(self):
        income = Income.objects.create(
            user=self.user,
            amount=1000.00,
            source='SALARY'
        )
        self.assertEqual(income.amount, 1000.00)
        self.assertEqual(income.source, 'SALARY')
        self.assertIsNotNone(income.date)

    def test_create_income_with_invalid_source(self):
        Income.objects.create(
            user=self.user,
            amount=1000.00,
            source='INVALID_SOURCE'
        )
        self.assertRaises(ValueError)

    def test_get_absolute_url(self):
        income = Income.objects.create(
            user=self.user,
            amount=1000.00,
            source='SALARY'
        )
        self.assertEqual(income.get_absolute_url(), f"/income.updelete/{income.income_id}")

    def test_string_representation(self):
        income = Income.objects.create(
            user=self.user,
            amount=1000.00,
            source='SALARY'
        )
        self.assertEqual(str(income), str(income.income_id))


# Create your tests here.
