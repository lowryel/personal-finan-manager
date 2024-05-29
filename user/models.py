from django.db import models
from django.contrib.auth.models import AbstractUser, User, AbstractBaseUser
import uuid
# import datetime

# from django.db.models import Sum

# from django.db.models.signals import post_save, post_delete, pre_save
# from django.dispatch import receiver
# from django.utils import timezone


# Create your models here.


class CustomUser(AbstractBaseUser):
    user_id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    username = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=256, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> uuid.UUID:
        return self.username
