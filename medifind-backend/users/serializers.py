from django.contrib.auth.password_validation import validate_password
from django.db import transaction
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import CustomUser

# =====================================================
# REGISTER SERIALIZER
# =====================================================

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=True
    )

    # Required only for Diagnostics registration.
    license_number = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=False,
    )

    class Meta:
        model = CustomUser

        fields = [
            "username",
            "email",
            "phone",
            "password",
            "role",
            "license_number",
        ]

        extra_kwargs = {
            "username": {"required": True},
            "email": {"required": True},
            "phone": {"required": True},
            "role": {"required": True},
        }

    # =================================================
    # USERNAME
    # =================================================

    def validate_username(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Username is required."
            )

        if CustomUser.objects.filter(
            username__iexact=value
        ).exists():
            raise serializers.ValidationError(
                "This username is already registered."
            )

        # Prevent collisions with the legacy Diagnostics
        # username field while the migration is being finalized.
        from diagnostics.models import Diagnostics

        if Diagnostics.objects.filter(
            username__iexact=value
        ).exists():
            raise serializers.ValidationError(
                "This username is already registered."
            )

        return value

    # =================================================
    # EMAIL
    # =================================================

    def validate_email(self, value):

        value = value.strip().lower()

        if not value:
            raise serializers.ValidationError(
                "Email address is required."
            )

        if CustomUser.objects.filter(
            email__iexact=value
        ).exists():
            raise serializers.ValidationError(
                "This email address is already registered."
            )

        from diagnostics.models import Diagnostics

        if Diagnostics.objects.filter(
            email__iexact=value
        ).exists():
            raise serializers.ValidationError(
                "This email address is already registered."
            )

        return value

    # =================================================
    # PHONE
    # =================================================

    def validate_phone(self, value):

        value = str(value).strip()

        if not value:
            raise serializers.ValidationError(
                "Phone number is required."
            )

        return value

    # =================================================
    # PASSWORD
    # =================================================

    def validate_password(self, value):

        validate_password(value)

        return value

    # =================================================
    # ROLE
    # =================================================

    def validate_role(self, value):

        allowed_roles = [
            CustomUser.Role.USER,
            CustomUser.Role.DOCTOR,
            CustomUser.Role.DIAGNOSTIC,
            CustomUser.Role.PHARMACY,
        ]

        if value == CustomUser.Role.ADMIN:
            raise serializers.ValidationError(
                "Admin accounts cannot be created through public registration."
            )

        if value not in allowed_roles:
            raise serializers.ValidationError(
                "Invalid registration role."
            )

        return value

    # =================================================
    # LICENSE NUMBER
    # =================================================

    def validate(self, attrs):

        role = attrs.get("role")
        license_number = attrs.get("license_number")

        if (
            role == CustomUser.Role.DIAGNOSTIC
            and not license_number
        ):
            raise serializers.ValidationError({
                "license_number": (
                    "License number is required for "
                    "Diagnostics registration."
                )
            })

        return attrs

    # =================================================
    # CREATE USER
    # =================================================

    @transaction.atomic
    def create(self, validated_data):

        from diagnostics.models import Diagnostics

        password = validated_data.pop("password")
        license_number = validated_data.pop(
            "license_number",
            None
        )

        role = validated_data.get("role")

        # -------------------------------------------------
        # Create the central CustomUser account
        # -------------------------------------------------

        user = CustomUser.objects.create_user(
            password=password,
            **validated_data
        )

        # -------------------------------------------------
        # Diagnostics-specific profile
        # -------------------------------------------------

        if role == CustomUser.Role.DIAGNOSTIC:

            diagnostics = Diagnostics.objects.create(
                user=user,
                username=user.username,
                email=user.email,
                password=user.password,
                phone_number=user.phone or "",
                license_number=license_number,
            )

            # The CustomUser is now the canonical authentication
            # identity, while Diagnostics is the business profile.
            return user

        return user

# =====================================================
# USER CRUD SERIALIZER
# =====================================================

class UserCRUDSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=False
    )

    class Meta:

        model = CustomUser

        fields = [
            "id",
            "username",
            "email",
            "phone",
            "password",
            "role",
            "is_verified",
            "is_active",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    # =================================================
    # USERNAME VALIDATION
    # =================================================

    def validate_username(self, value):

        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Username is required."
            )

        queryset = CustomUser.objects.filter(
            username__iexact=value
        )

        # Exclude current user during update
        if self.instance:
            queryset = queryset.exclude(
                pk=self.instance.pk
            )

        if queryset.exists():

            raise serializers.ValidationError(
                "This username is already registered."
            )

        return value

    # =================================================
    # EMAIL VALIDATION
    # =================================================

    def validate_email(self, value):

        value = value.strip().lower()

        if not value:
            raise serializers.ValidationError(
                "Email address is required."
            )

        queryset = CustomUser.objects.filter(
            email__iexact=value
        )

        # Exclude current user during update
        if self.instance:
            queryset = queryset.exclude(
                pk=self.instance.pk
            )

        if queryset.exists():

            raise serializers.ValidationError(
                "This email address is already registered."
            )

        return value

    # =================================================
    # PHONE VALIDATION
    # =================================================

    def validate_phone(self, value):

        value = str(value).strip()

        if not value:
            raise serializers.ValidationError(
                "Phone number is required."
            )

        return value

    # =================================================
    # ROLE VALIDATION
    # =================================================

    def validate_role(self, value):

        allowed_roles = [
            CustomUser.Role.USER,
            CustomUser.Role.DOCTOR,
            CustomUser.Role.DIAGNOSTICS,
            CustomUser.Role.PHARMACY,
            CustomUser.Role.ADMIN,
        ]

        if value not in allowed_roles:

            raise serializers.ValidationError(
                "Invalid user role."
            )

        return value

    # =================================================
    # CREATE
    # =================================================

    def create(self, validated_data):

        password = validated_data.pop(
            "password",
            None
        )

        if password:

            validate_password(password)

            user = CustomUser.objects.create_user(
                password=password,
                **validated_data
            )

        else:

            user = CustomUser.objects.create_user(
                **validated_data
            )

        return user

    # =================================================
    # UPDATE
    # =================================================

    def update(self, instance, validated_data):

        password = validated_data.pop(
            "password",
            None
        )

        # Update normal fields
        for attr, value in validated_data.items():

            setattr(
                instance,
                attr,
                value
            )

        # Password must always be hashed
        if password:

            validate_password(
                password,
                instance
            )

            instance.set_password(password)

        instance.save()

        return instance


# =====================================================
# PATIENT / USER DASHBOARD SERIALIZER
# =====================================================

class PatientDashboardSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = CustomUser

        fields = [
            "id",
            "username",
            "email",
            "phone",
            "role",
            "is_verified",
            "created_at",
        ]


# =====================================================
# USER DASHBOARD SERIALIZER
# =====================================================

class UserDashboardSerializer(
    serializers.Serializer
):

    profile = serializers.SerializerMethodField()

    notifications = serializers.SerializerMethodField()

    upcoming_appointments_count = (
        serializers.SerializerMethodField()
    )

    # =================================================
    # PROFILE
    # =================================================

    def get_profile(self, user):

        return {
            "id": user.id,
            "full_name": user.username,
            "username": user.username,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
            "is_verified": getattr(
                user,
                "is_verified",
                True
            ),
        }

    # =================================================
    # NOTIFICATIONS
    # =================================================

    def get_notifications(self, user):

        return []

    # =================================================
    # APPOINTMENTS
    # =================================================

    def get_upcoming_appointments_count(self, user):

        return 0


# =====================================================
# JWT TOKEN SERIALIZER
# =====================================================

class CustomTokenObtainPairSerializer(
    TokenObtainPairSerializer
):

    @classmethod
    def get_token(cls, user):

        token = super().get_token(user)

        token["role"] = user.role
        token["email"] = user.email
        token["username"] = user.username
        token["is_verified"] = getattr(
            user,
            "is_verified",
            True
        )
        token["user_id"] = user.id

        return token

    # =================================================
    # LOGIN RESPONSE
    # =================================================

    def validate(self, attrs):

        data = super().validate(attrs)

        data["role"] = self.user.role
        data["username"] = self.user.username
        data["email"] = self.user.email
        data["phone"] = getattr(
            self.user,
            "phone",
            ""
        )
        data["is_verified"] = getattr(
            self.user,
            "is_verified",
            True
        )
        data["user_id"] = self.user.id

        return data

