
from django.db import models
from django.conf import settings


class DoctorProfile(models.Model):

    # =====================================================
    # DOCTOR USER
    # =====================================================

    doctor = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="doctor_profile"
    )

    # =====================================================
    # BASIC INFORMATION
    # =====================================================

    full_name = models.CharField(
        max_length=255,
        blank=True,
        default=""
    )

    qualification = models.CharField(
        max_length=255,
        blank=True,
        default=""
    )

    # =====================================================
    # PROFESSIONAL INFORMATION
    # =====================================================

    registration_number = models.CharField(
        max_length=100,
        blank=False,
        default=""
    )

    license_number = models.CharField(
        max_length=100,
        blank=False,
        default=""
    )

    issuing_authority = models.CharField(
        max_length=255,
        blank=False,
        default=""
    )

    specialization = models.CharField(
        max_length=255,
        blank=False,
        default=""
    )

    experience = models.PositiveIntegerField(
        blank=False,
        default=0
    )

    location = models.CharField(
        max_length=255,
        blank=False,
        default=""
    )

    address = models.TextField(
        blank=False,
        default=""
    )

    # =====================================================
    # HOSPITAL INFORMATION
    # =====================================================

    hospital_name = models.CharField(
        max_length=255,
        blank=True,
        default=""
    )

    hospital_location = models.CharField(
        max_length=255,
        blank=True,
        default=""
    )

    # =====================================================
    # CONTACT
    # =====================================================

    phone = models.CharField(
        max_length=20,
        blank=True,
        default=""
    )

    consultation_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True
    )

    languages = models.CharField(
        max_length=255,
        blank=True,
        default=""
    )

    # =====================================================
    # PROFILE IMAGE
    # =====================================================

    profile_image = models.ImageField(
        upload_to="doctor_profiles/",
        blank=True,
        null=True
    )

    # =====================================================
    # VERIFICATION DOCUMENTS
    # =====================================================

    registration_certificate = models.FileField(
        upload_to="doctor_documents/registration/",
        blank=True,
        null=True
    )

    professional_license = models.FileField(
        upload_to="doctor_documents/license/",
        blank=True,
        null=True
    )

    qualification_certificate = models.FileField(
        upload_to="doctor_documents/qualification/",
        blank=True,
        null=True
    )

    government_id = models.FileField(
        upload_to="doctor_documents/government_id/",
        blank=True,
        null=True
    )

    additional_document = models.FileField(
        upload_to="doctor_documents/additional/",
        blank=True,
        null=True
    )

    # =====================================================
    # AVAILABILITY
    # =====================================================

    is_available = models.BooleanField(
        default=False
    )

    # =====================================================
    # VERIFICATION STATUS
    # =====================================================

    verification_status = models.CharField(
        max_length=20,
        choices=[
            ("PENDING", "Pending"),
            ("APPROVED", "Approved"),
            ("REJECTED", "Rejected"),
        ],
        default="PENDING"
    )

    # =====================================================
    # TIMESTAMPS
    # =====================================================

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    # =====================================================
    # STRING
    # =====================================================

    def __str__(self):
        return self.full_name or self.doctor.username
