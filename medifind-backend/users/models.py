from django.contrib.auth.models import AbstractUser
from django.db import models


# =====================================================
# CUSTOM USER MODEL
# =====================================================

class CustomUser(AbstractUser):

    # =================================================
    # ROLE
    # =================================================

    class Role(models.TextChoices):

        USER = "user", "User"

        DOCTOR = "doctor", "Doctor"

        DIAGNOSTIC = "diagnostics", "Diagnostics"

        PHARMACY = "pharmacy", "Pharmacy"

        ADMIN = "admin", "Admin"

    # =================================================
    # USER FIELDS
    # =================================================

    email = models.EmailField(
        unique=True
    )

    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True
    )

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.USER
    )

    # =================================================
    # VERIFICATION
    # =================================================

    is_verified = models.BooleanField(
        default=False
    )

    # =================================================
    # CREATED / UPDATED
    # =================================================

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    # =================================================
    # STRING
    # =================================================

    def __str__(self):
        return f"{self.username} ({self.role})"