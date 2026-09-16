from django.db import models
from django.conf import settings


class Pharmacy(models.Model):

    VERIFICATION_STATUS = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    # Connect to your existing CustomUser model
    owner = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='pharmacy_profile',
        null=True,
        blank=True
    )

    pharmacy_name = models.CharField(
        max_length=200,
        null=True,
        blank=True
    )

    registration_number = models.CharField(
        max_length=100,
        unique=True,
        null=True,
        blank=True
    )

    phone = models.CharField(
        max_length=15,
        null=True,
        blank=True
    )

    email = models.EmailField(
        null=True,
        blank=True
    )

    address = models.TextField(
        null=True,
        blank=True
    )

    city = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    state = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    pincode = models.CharField(
        max_length=10,
        null=True,
        blank=True
    )

    latitude = models.DecimalField(
        max_digits=10,
        decimal_places=7,
        null=True,
        blank=True
    )

    longitude = models.DecimalField(
        max_digits=10,
        decimal_places=7,
        null=True,
        blank=True
    )

    verification_status = models.CharField(
        max_length=20,
        choices=VERIFICATION_STATUS,
        default='PENDING'
    )

    rejection_reason = models.TextField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.pharmacy_name or "Pharmacy"


class PharmacyDocument(models.Model):

    DOCUMENT_TYPES = [
        ('LICENSE', 'Pharmacy License'),
        ('REGISTRATION', 'Registration Certificate'),
        ('OWNER_ID', 'Owner ID'),
        ('ADDRESS_PROOF', 'Address Proof'),
    ]

    pharmacy = models.ForeignKey(
        Pharmacy,
        on_delete=models.CASCADE,
        related_name='documents'
    )

    document_type = models.CharField(
        max_length=30,
        choices=DOCUMENT_TYPES
    )

    document = models.FileField(
        upload_to='pharmacy_documents/'
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.pharmacy.pharmacy_name or 'Pharmacy'} - {self.document_type}"
# ============================================================
# MEDICINE MODEL
# ============================================================

class Medicine(models.Model):

    pharmacy = models.ForeignKey(
        Pharmacy,
        on_delete=models.CASCADE,
        related_name="medicines"
    )

    medicine_name = models.CharField(
        max_length=200
    )

    generic_name = models.CharField(
        max_length=200,
        blank=True,
        null=True
    )

    category = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    manufacturer = models.CharField(
        max_length=200,
        blank=True,
        null=True
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    stock_quantity = models.PositiveIntegerField(
        default=0
    )

    expiry_date = models.DateField(
        blank=True,
        null=True
    )

    prescription_required = models.BooleanField(
        default=False
    )

    image = models.ImageField(
        upload_to="medicine_images/",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.medicine_name


# ============================================================
# CONVERSATION MODEL
# Customer <-> Pharmacy
# ============================================================

class Conversation(models.Model):

    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="pharmacy_conversations"
    )

    pharmacy = models.ForeignKey(
        Pharmacy,
        on_delete=models.CASCADE,
        related_name="conversations"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["customer", "pharmacy"],
                name="unique_customer_pharmacy_conversation"
            )
        ]

    def __str__(self):
        return (
            f"{self.customer.username} - "
            f"{self.pharmacy.pharmacy_name}"
        )


# ============================================================
# MESSAGE MODEL
# ============================================================

class Message(models.Model):

    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name="messages"
    )

    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="pharmacy_messages"
    )

    message = models.TextField()

    attachment = models.FileField(
        upload_to="pharmacy_messages/",
        blank=True,
        null=True
    )

    is_read = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return (
            f"{self.sender.username}: "
            f"{self.message[:30]}"
        )
