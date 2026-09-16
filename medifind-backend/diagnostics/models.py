from django.db import models
from django.contrib.auth.hashers import make_password
from django.conf import settings


class Diagnostics(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected'),
    )

    user = models.OneToOneField(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name="diagnostics_profile",
    null=True,
    blank=True,
)

    center_name = models.CharField(max_length=150)
    username = models.CharField(
    max_length=100,
    unique=True
)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    diagnostician_name = models.CharField(
        max_length=150,
        blank=True
    )
    license_number = models.CharField(max_length=100, unique=True)
    registration_number = models.CharField(
    max_length=100,
    unique=True,
    null=True,
    blank=True
)
    address = models.CharField(
    max_length=255,
    blank=True
)

    city = models.CharField(
        max_length=100,
        blank=True
    )
    state = models.CharField(
        max_length=100,
        blank=True
    )

    pincode = models.CharField(
        max_length=10,
        blank=True
    )

    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )

    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True
    )

    certification_type = models.CharField(
        max_length=20,
        choices=(
            ('nabl', 'NABL Certified'),
            ('iso', 'ISO Certified'),
            ('other', 'Other'),
        ),
        default='nabl'
    )

    government_id = models.FileField(
        upload_to='diagnostics_documents/government_id/',
        null=True,
        blank=True
    )

    # Diagnostic center registration/license certificate
    registration_document = models.FileField(
        upload_to='diagnostics_documents/registration/',
        null=True,
        blank=True
    )

    # NABL / ISO / other certification document
    certification_document = models.FileField(
        upload_to='diagnostics_documents/certification/',
        null=True,
        blank=True
    )

    # Profile photo of authorized person
    profile_photo = models.ImageField(
        upload_to='diagnostics_profiles/',
        null=True,
        blank=True
    )


    availability = models.CharField(
    max_length=20,
    choices=(
        ('available', 'Available'),
        ('unavailable', 'Unavailable'),
    ),
    default='available'
)

    reports_time = models.CharField(
        max_length=50,
        blank=True
    )

    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        default=0.0
    )

    reviews_count = models.PositiveIntegerField(
        default=0
    )

    home_collection = models.BooleanField(
        default=False
    )

    open_24_hours = models.BooleanField(
        default=False
    )

    tests_available = models.PositiveIntegerField(
        default=0
    )

    about = models.TextField(
        blank=True
    )

    why_choose_us = models.JSONField(
        default=list,
        blank=True
    )

    # single source of truth for the uploaded license/document
    verification_status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    verification_submitted = models.BooleanField(default=False)
    rejection_reason = models.TextField(blank=True, null=True)
    verified_at = models.DateTimeField(blank=True, null=True)
    verified_by = models.CharField(max_length=100, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # hash password only if it's not already hashed
        if not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.center_name
# DRF permission checks (e.g. IsAuthenticated, IsAdminUser) expect these on request.user.
    # Diagnostics isn't Django's built-in User model, so we provide them manually.
    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    @property
    def is_staff(self):
        # a diagnostics center is never an admin/staff user
        return False

class DiagnosticTest(models.Model):
    diagnostics_center = models.ForeignKey(
        Diagnostics, on_delete=models.CASCADE, related_name='tests'
    )
    test_name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    report_time = models.CharField(
        max_length=50,
        blank=True
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.test_name} - {self.diagnostics_center.center_name}"
