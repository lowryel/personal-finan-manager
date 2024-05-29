from django.urls import path, include
from .views import *
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView, TokenRefreshView

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="obtain_token"),
    path("token/verify/", TokenVerifyView.as_view(), name="verify_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    # path("bud/", BudgetAPIView.as_view(), name="bud"),
    path("auth/", obtain_auth_token),
]
