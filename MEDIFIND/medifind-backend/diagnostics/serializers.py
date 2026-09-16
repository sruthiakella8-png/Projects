from django.db import transaction
from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field

from users.models import CustomUser

from .models import Diagnostics, DiagnosticTest


# ============================================================
# DIAGNOSTICS REGISTRATION
# ============================================================
class DiagnosticsRegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Diagnostics

        fields = [
            'id',
            'username',
            'email',
            'password',
            'phone_number',
            'license_number',
        ]

        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': True,
            },
            'username': {
                'required': True,
            },
            'email': {
                'required': True,
            },
            'phone_number': {
                'required': True,
            },
            'license_number': {
                'required': True,
            },
        }

    def validate_username(self, value):
        value = value.strip()

        if CustomUser.objects.filter(
            username__iexact=value
        ).exists():
            raise serializers.ValidationError(
                "This username is already registered."
            )

        if Diagnostics.objects.filter(
            username__iexact=value
        ).exists():
            raise serializers.ValidationError(
                "This username is already registered."
            )

        return value

    def validate_email(self, value):
        value = value.strip().lower()

        if CustomUser.objects.filter(
            email__iexact=value
        ).exists():
            raise serializers.ValidationError(
                "This email address is already registered."
            )

        if Diagnostics.objects.filter(
            email__iexact=value
        ).exists():
            raise serializers.ValidationError(
                "This email address is already registered."
            )

        return value

    @transaction.atomic
    def create(self, validated_data):

        password = validated_data.pop('password')

        username = validated_data['username']
        email = validated_data['email']

        # --------------------------------------------
        # Create the central authentication account
        # --------------------------------------------

        user = CustomUser.objects.create_user(
            username=username,
            email=email,
            phone=validated_data.get('phone_number'),
            password=password,
            role=CustomUser.Role.DIAGNOSTIC,
        )

        # --------------------------------------------
        # Create the Diagnostics profile
        # --------------------------------------------

        diagnostics = Diagnostics(
            **validated_data,
            user=user,
            password=user.password,
        )

        diagnostics.save()

        return diagnostics


# ============================================================
# DIAGNOSTICS PROFILE
# ============================================================

class DiagnosticsProfileSerializer(serializers.ModelSerializer):

    test_count = serializers.SerializerMethodField()
    why_choose_us = serializers.ListField(
    child=serializers.CharField(),
    read_only=True,
)

    class Meta:
        model = Diagnostics

        fields = [
            'id',

            # Basic information
            'center_name',
            'username',
            'email',
            'phone_number',
            'diagnostician_name',

            # Registration
            'license_number',
            'registration_number',
            'certification_type',

            # Address
            'address',
            'city',
            'state',
            'pincode',

            # Location
            'latitude',
            'longitude',

            # Documents
            'government_id',
            'registration_document',
            'certification_document',
            'profile_photo',

            # Verification
            'verification_status',
            'verification_submitted',
            'rejection_reason',
            'verified_at',
            'verified_by',

            # Availability
            'availability',

            # Other diagnostic information
            'reports_time',
            'rating',
            'reviews_count',
            'home_collection',
            'open_24_hours',
            'tests_available',
            'about',
            'why_choose_us',

            # Status / timestamps
            'is_active',
            'created_at',
            'updated_at',

            # Calculated
            'test_count',
        ]

        read_only_fields = [
            'id',
            'email',
            'username',
            'license_number',

            'verification_status',
            'verification_submitted',
            'rejection_reason',
            'verified_at',
            'verified_by',

            'rating',
            'reviews_count',

            'is_active',

            'created_at',
            'updated_at',

            'test_count',
        ]

    @extend_schema_field(serializers.IntegerField)
    def get_test_count(self, obj):
        return obj.tests.count()


# ============================================================
# DIAGNOSTICS PROFILE UPDATE
# ============================================================

class DiagnosticsProfileUpdateSerializer(serializers.ModelSerializer):
    why_choose_us = serializers.ListField(
    child=serializers.CharField(),
    required=False,
)

    class Meta:
        model = Diagnostics

        fields = [
            # Basic
            'center_name',
            'phone_number',
            'diagnostician_name',

            # Registration
            'registration_number',
            'certification_type',

            # Address
            'address',
            'city',
            'state',
            'pincode',

            # Location
            'latitude',
            'longitude',

            # Diagnostic information
            'reports_time',
            'home_collection',
            'open_24_hours',
            'about',
            'why_choose_us',
            'availability',
        

            # Profile photo
            'profile_photo',
        ]

        extra_kwargs = {
            'center_name': {
                'required': False,
                'allow_blank': True,
            },

            'phone_number': {
                'required': False,
                'allow_blank': True,
            },

            'diagnostician_name': {
                'required': False,
                'allow_blank': True,
            },

            'registration_number': {
                'required': False,
                'allow_blank': True,
                'allow_null': True,
            },

            'certification_type': {
                'required': False,
                'allow_blank': True,
            },

            'address': {
                'required': False,
                'allow_blank': True,
            },

            'city': {
                'required': False,
                'allow_blank': True,
            },

            'state': {
                'required': False,
                'allow_blank': True,
            },

            'pincode': {
                'required': False,
                'allow_blank': True,
            },

            'latitude': {
                'required': False,
                'allow_null': True,
            },

            'longitude': {
                'required': False,
                'allow_null': True,
            },

            'reports_time': {
                'required': False,
                'allow_blank': True,
            },

            'home_collection': {
                'required': False,
            },

            'open_24_hours': {
                'required': False,
            },

            'about': {
                'required': False,
                'allow_blank': True,
            },

            'why_choose_us': {
                'required': False,
            },

            'availability': {
                'required': False,
                'allow_blank': True,
            },

            'profile_photo': {
                'required': False,
            },
        }


# ============================================================
# DOCUMENT UPLOAD
# ============================================================

class DiagnosticsDocumentUploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Diagnostics

        fields = [
            'government_id',
            'registration_document',
            'certification_document',
        ]

        extra_kwargs = {
            'government_id': {
                'required': False
            },
            'registration_document': {
                'required': False
            },
            'certification_document': {
                'required': False
            },
        }


# ============================================================
# SUBMIT FOR VERIFICATION
# ============================================================

class DiagnosticsSubmitVerificationSerializer(
    serializers.Serializer
):

    def validate(self, attrs):

        diagnostics = self.context.get('diagnostics')

        if not diagnostics:
            raise serializers.ValidationError(
                "Diagnostics center could not be identified."
            )

        missing_fields = []

        # --------------------------------------------
        # Required profile information
        # --------------------------------------------

        if not diagnostics.center_name:
            missing_fields.append("Center Name")

        if not diagnostics.phone_number:
            missing_fields.append("Phone Number")

        if not diagnostics.address:
            missing_fields.append("Address")

        if not diagnostics.city:
            missing_fields.append("City")

        if not diagnostics.state:
            missing_fields.append("State")

        if not diagnostics.pincode:
            missing_fields.append("Pincode")

        if not diagnostics.license_number:
            missing_fields.append("License Number")

        if not diagnostics.registration_number:
            missing_fields.append("Registration Number")
        # --------------------------------------------
        # Required documents
        # --------------------------------------------

        if not diagnostics.government_id:
            missing_fields.append("Government ID")

        if not diagnostics.registration_document:
            missing_fields.append(
                "Registration / License Document"
            )

        if not diagnostics.profile_photo:
            missing_fields.append("Profile Photo")

        # --------------------------------------------
        # Certification document
        # --------------------------------------------

        if diagnostics.certification_type in [
            'nabl',
            'iso'
        ]:
            if not diagnostics.certification_document:
                missing_fields.append(
                    "Certification Document"
                )

        # --------------------------------------------
        # Validation result
        # --------------------------------------------

        if missing_fields:

            raise serializers.ValidationError({
                "missing_fields": missing_fields,
                "message": (
                    "Please complete your profile and upload "
                    "all required documents before submitting "
                    "for verification."
                )
            })

        return attrs


# ============================================================
# ADMIN VERIFICATION
# ============================================================

class DiagnosticsVerificationSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = Diagnostics

        fields = [
            'verification_status',
            'rejection_reason',
            'verified_at',
            'verified_by',
        ]

        read_only_fields = [
            'verified_at',
            'verified_by',
        ]

    def validate(self, data):

        new_status = data.get(
            'verification_status'
        )

        if new_status not in (
            'verified',
            'rejected'
        ):
            raise serializers.ValidationError(
                "verification_status must be "
                "'verified' or 'rejected'."
            )

        if (
            new_status == 'rejected'
            and not data.get('rejection_reason')
        ):
            raise serializers.ValidationError(
                "rejection_reason is required "
                "when rejecting a center."
            )

        return data


# ============================================================
# DIAGNOSTIC TEST
# ============================================================

class DiagnosticTestSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = DiagnosticTest

        fields = [
            'id',
            'test_name',
            'description',
            'price',
            'report_time',
            'is_active',
            'created_at',
        ]

        read_only_fields = [
            'id',
            'created_at',
        ]


# ============================================================
# PATIENT DIAGNOSTICS LIST
# ============================================================

class PatientDiagnosticsListSerializer(
    serializers.ModelSerializer
):

    total_tests = serializers.SerializerMethodField()

    class Meta:
        model = Diagnostics

        fields = [
            'id',
            'center_name',
            'certification_type',
            'address',
            'city',
            'rating',
            'reviews_count',
            'availability',
            'reports_time',
            'total_tests',
            'home_collection',
            'open_24_hours',
        ]

    @extend_schema_field(serializers.IntegerField)
    def get_total_tests(self, obj):
        return obj.tests.filter(
            is_active=True
        ).count()

class PatientDiagnosticTestSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    description = serializers.CharField()
    price = serializers.DecimalField(
        max_digits=8,
        decimal_places=2
    )
    report_time = serializers.CharField()
# ============================================================
# PATIENT DIAGNOSTICS DETAIL
# ============================================================

class PatientDiagnosticsDetailSerializer(
    serializers.ModelSerializer
):

    tests = serializers.SerializerMethodField()

    total_tests = serializers.SerializerMethodField()

    why_choose_us = serializers.ListField(
    child=serializers.CharField(),
    read_only=True,
)

    class Meta:
        model = Diagnostics

        fields = [
            'id',
            'center_name',
            'certification_type',
            'address',
            'city',
            'phone_number',
            'email',
            'latitude',
            'longitude',
            'rating',
            'reviews_count',
            'availability',
            'reports_time',
            'home_collection',
            'open_24_hours',
            'tests_available',
            'total_tests',
            'about',
            'why_choose_us',
            'tests',
        ]

    @extend_schema_field(serializers.IntegerField)
    def get_total_tests(self, obj):
        return obj.tests.filter(
            is_active=True
        ).count()

    @extend_schema_field(
        PatientDiagnosticTestSerializer(many=True)
    )
    def get_tests(self, obj):

        tests = obj.tests.filter(
            is_active=True
        )

        return [
            {
                'id': test.id,
                'name': test.test_name,
                'description': test.description,
                'price': test.price,
                'report_time': test.report_time,
            }
            for test in tests
    ]


# ============================================================
# DIAGNOSTICS DASHBOARD
# ============================================================

class DiagnosticsDashboardSerializer(
    serializers.ModelSerializer
):

    total_tests = serializers.SerializerMethodField()

    active_tests = serializers.SerializerMethodField()

    class Meta:
        model = Diagnostics

        fields = [
            'id',
            'center_name',
            'city',
            'verification_status',
            'total_tests',
            'active_tests',
        ]

    @extend_schema_field(serializers.IntegerField)
    def get_total_tests(self, obj):
        return obj.tests.count()

    @extend_schema_field(serializers.IntegerField)
    def get_active_tests(self, obj):
        return obj.tests.filter(
            is_active=True
        ).count()
