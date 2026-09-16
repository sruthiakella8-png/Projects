from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    Pharmacy,
    PharmacyDocument,
    Medicine,
    Conversation,
    Message,
)


User = get_user_model()


# ============================================================
# PHARMACY REGISTRATION
# ============================================================

class PharmacyRegisterSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        write_only=True
    )

    password = serializers.CharField(
        write_only=True,
        min_length=6
    )

    class Meta:

        model = Pharmacy

        fields = [
            "username",
            "password",

            "pharmacy_name",
            "registration_number",

            "phone",
            "email",

            "address",
            "city",
            "state",
            "pincode",

            "latitude",
            "longitude",
        ]

    def validate_username(self, value):

        if User.objects.filter(
            username=value
        ).exists():

            raise serializers.ValidationError(
                "Username already exists."
            )

        return value

    def validate_email(self, value):

        if User.objects.filter(
            email=value
        ).exists():

            raise serializers.ValidationError(
                "Email already registered."
            )

        return value

    def validate_phone(self, value):

        if User.objects.filter(
            phone=value
        ).exists():

            raise serializers.ValidationError(
                "Phone number already registered."
            )

        return value

    def validate_registration_number(self, value):

        if Pharmacy.objects.filter(
            registration_number=value
        ).exists():

            raise serializers.ValidationError(
                "Registration number already exists."
            )

        return value

    def create(self, validated_data):

        username = validated_data.pop(
            "username"
        )

        password = validated_data.pop(
            "password"
        )

        email = validated_data.get(
            "email"
        )

        phone = validated_data.get(
            "phone"
        )

        user = User.objects.create_user(

            username=username,

            email=email,

            phone=phone,

            password=password,

            role="pharmacy",
        )

        pharmacy = Pharmacy.objects.create(

            owner=user,

            **validated_data
        )

        return pharmacy

class PharmacyLoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        if self.user.role != "pharmacy":
            raise serializers.ValidationError(
                "This login is only for pharmacy accounts."
            )

        try:
            pharmacy = self.user.pharmacy_profile
        except Pharmacy.DoesNotExist:
            raise serializers.ValidationError(
                "Pharmacy profile not found for this account."
            )

        data["pharmacy_id"] = pharmacy.id
        data["pharmacy_name"] = pharmacy.pharmacy_name
        data["verification_status"] = pharmacy.verification_status

        return data


# ============================================================
# PHARMACY PROFILE
# ============================================================

class PharmacyProfileSerializer(
    serializers.ModelSerializer
):

    username = serializers.CharField(
        source="owner.username",
        read_only=True
    )

    class Meta:

        model = Pharmacy

        fields = [
            "id",
            "username",

            "pharmacy_name",
            "registration_number",

            "phone",
            "email",

            "address",
            "city",
            "state",
            "pincode",

            "latitude",
            "longitude",

            "verification_status",
            "rejection_reason",

            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "username",
            "verification_status",
            "rejection_reason",
            "created_at",
            "updated_at",
        ]


# ============================================================
# PHARMACY DOCUMENT
# ============================================================

class PharmacyDocumentSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = PharmacyDocument

        fields = [
            "id",
            "document_type",
            "document",
            "uploaded_at",
        ]

        read_only_fields = [
            "id",
            "uploaded_at",
        ]


# ============================================================
# MEDICINE
# ============================================================

class MedicineSerializer(
    serializers.ModelSerializer
):

    pharmacy_name = serializers.CharField(
        source="pharmacy.pharmacy_name",
        read_only=True
    )

    class Meta:

        model = Medicine

        fields = [
            "id",

            "pharmacy",
            "pharmacy_name",

            "medicine_name",
            "generic_name",
            "category",
            "manufacturer",
            "description",

            "price",
            "stock_quantity",
            "expiry_date",

            "prescription_required",

            "image",

            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "pharmacy",
            "pharmacy_name",
            "created_at",
            "updated_at",
        ]


# ============================================================
# CONVERSATION
# ============================================================

class ConversationSerializer(
    serializers.ModelSerializer
):

    customer_name = serializers.CharField(
        source="customer.username",
        read_only=True
    )

    pharmacy_name = serializers.CharField(
        source="pharmacy.pharmacy_name",
        read_only=True
    )

    class Meta:

        model = Conversation

        fields = [
            "id",

            "customer",
            "customer_name",

            "pharmacy",
            "pharmacy_name",

            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "customer",
            "customer_name",
            "pharmacy_name",
            "created_at",
            "updated_at",
        ]


# ============================================================
# MESSAGE
# ============================================================

class MessageSerializer(
    serializers.ModelSerializer
):

    sender_name = serializers.CharField(
        source="sender.username",
        read_only=True
    )

    class Meta:

        model = Message

        fields = [
            "id",

            "conversation",

            "sender",
            "sender_name",

            "message",
            "attachment",

            "is_read",

            "created_at",
        ]

        read_only_fields = [
            "id",
            "conversation",
            "sender",
            "sender_name",
            "created_at",
        ]
