
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from users.models import CustomUser
from pharmacy.models import Pharmacy


# =====================================================
# LOGOUT SERIALIZER
# =====================================================

class LogoutSerializer(serializers.Serializer):

    refresh = serializers.CharField(
        required=True
    )


# =====================================================
# REGISTER SERIALIZER
# =====================================================

class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=True
    )

    class Meta:

        model = CustomUser

        fields = [
            "username",
            "email",
            "phone",
            "password",
            "role",
        ]

        extra_kwargs = {
            "username": {
                "required": True
            },
            "email": {
                "required": True
            },
            "phone": {
                "required": True
            },
            "role": {
                "required": True
            },
        }

    # =================================================
    # USERNAME VALIDATION
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

        if CustomUser.objects.filter(
            email__iexact=value
        ).exists():

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
    # PASSWORD VALIDATION
    # =================================================

    def validate_password(self, value):

        validate_password(value)

        return value

    # =================================================
    # ROLE VALIDATION
    # =================================================

    def validate_role(self, value):

        allowed_roles = [
            CustomUser.Role.USER,
            CustomUser.Role.DOCTOR,
            CustomUser.Role.DIAGNOSTIC,
            CustomUser.Role.PHARMACY,
            CustomUser.Role.HOSPITAL,
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
    # CREATE USER
    # =================================================

    def create(self, validated_data):

        password = validated_data.pop(
            "password"
        )

        user = CustomUser.objects.create_user(
            password=password,
            **validated_data
        )

        return user


# =====================================================
# PHARMACY REGISTER SERIALIZER
# =====================================================

class PharmacyRegisterSerializer(serializers.Serializer):

    username = serializers.CharField(
        required=True
    )

    email = serializers.EmailField(
        required=True
    )

    phone = serializers.CharField(
        required=True
    )

    password = serializers.CharField(
        write_only=True,
        required=True
    )

    pharmacy_name = serializers.CharField(
        required=True,
        max_length=200
    )

    registration_number = serializers.CharField(
        required=True,
        max_length=100
    )

    address = serializers.CharField(
        required=False,
        allow_blank=True
    )

    city = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=100
    )

    state = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=100
    )

    pincode = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=10
    )

    latitude = serializers.DecimalField(
        required=False,
        allow_null=True,
        max_digits=10,
        decimal_places=7
    )

    longitude = serializers.DecimalField(
        required=False,
        allow_null=True,
        max_digits=10,
        decimal_places=7
    )

    # =================================================
    # VALIDATE USERNAME
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

        return value

    # =================================================
    # VALIDATE EMAIL
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

        return value

    # =================================================
    # VALIDATE PHONE
    # =================================================

    def validate_phone(self, value):

        value = str(value).strip()

        if not value:

            raise serializers.ValidationError(
                "Phone number is required."
            )

        return value

    # =================================================
    # VALIDATE PASSWORD
    # =================================================

    def validate_password(self, value):

        validate_password(value)

        return value

    # =================================================
    # VALIDATE REGISTRATION NUMBER
    # =================================================

    def validate_registration_number(self, value):

        value = value.strip()

        if not value:

            raise serializers.ValidationError(
                "Registration number is required."
            )

        if Pharmacy.objects.filter(
            registration_number=value
        ).exists():

            raise serializers.ValidationError(
                "This pharmacy registration number is already registered."
            )

        return value

    # =================================================
    # CREATE USER + PHARMACY
    # =================================================

    def create(self, validated_data):

        password = validated_data.pop(
            "password"
        )

        pharmacy_name = validated_data.pop(
            "pharmacy_name"
        )

        registration_number = validated_data.pop(
            "registration_number"
        )

        address = validated_data.pop(
            "address",
            ""
        )

        city = validated_data.pop(
            "city",
            ""
        )

        state = validated_data.pop(
            "state",
            ""
        )

        pincode = validated_data.pop(
            "pincode",
            ""
        )

        latitude = validated_data.pop(
            "latitude",
            None
        )

        longitude = validated_data.pop(
            "longitude",
            None
        )

        # -------------------------------------------------
        # CREATE USER
        # -------------------------------------------------

        user = CustomUser.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            phone=validated_data["phone"],
            password=password,
            role=CustomUser.Role.PHARMACY,
        )

        # -------------------------------------------------
        # CREATE PHARMACY PROFILE
        # -------------------------------------------------

        pharmacy = Pharmacy.objects.create(
            owner=user,
            pharmacy_name=pharmacy_name,
            registration_number=registration_number,
            phone=user.phone,
            email=user.email,
            address=address,
            city=city,
            state=state,
            pincode=pincode,
            latitude=latitude,
            longitude=longitude,
            verification_status="PENDING",
        )

        self.pharmacy = pharmacy

        return user


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
    # UPCOMING APPOINTMENTS
    # =================================================

    def get_upcoming_appointments_count(self, user):

        return 0


# =====================================================
# JWT TOKEN SERIALIZER
# =====================================================

class CustomTokenObtainPairSerializer(
    TokenObtainPairSerializer
):

    # =================================================
    # CREATE JWT
    # =================================================

    @classmethod
    def get_token(cls, user):

        token = super().get_token(user)

        token["role"] = str(
            user.role
        ).lower().strip()

        token["username"] = user.username

        token["email"] = user.email

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

        data["role"] = str(
            self.user.role
        ).lower().strip()

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


# =====================================================
# NORMAL LOGIN SERIALIZER
# =====================================================

class LoginSerializer(serializers.Serializer):

    username = serializers.CharField(
        required=True
    )

    password = serializers.CharField(
        write_only=True,
        required=True
    )

    # =================================================
    # VALIDATE LOGIN
    # =================================================

    def validate(self, attrs):

        username = attrs.get(
            "username"
        )

        password = attrs.get(
            "password"
        )

        user = authenticate(
            username=username,
            password=password
        )

        if not user:

            raise serializers.ValidationError(
                "Invalid username or password."
            )

        if not user.is_active:

            raise serializers.ValidationError(
                "This account is disabled."
            )

        attrs["user"] = user

        return attrs
