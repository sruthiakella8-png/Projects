
from rest_framework import serializers

from .models import DoctorProfile


class DoctorProfileSerializer(serializers.ModelSerializer):

    class Meta:

        model = DoctorProfile

        fields = [
            # BASIC
            "id",
            "full_name",
            "qualification",

            # PROFESSIONAL
            "registration_number",
            "license_number",
            "issuing_authority",
            "specialization",
            "experience",
            "location",
            "address",

            # HOSPITAL
            "hospital_name",
            "hospital_location",

            # CONTACT
            "phone",
            "consultation_fee",
            "languages",

            # IMAGE
            "profile_image",

            # DOCUMENTS
            "registration_certificate",
            "professional_license",
            "qualification_certificate",
            "government_id",
            "additional_document",

            # AVAILABILITY
            "is_available",

            # VERIFICATION
            "verification_status",

            # TIMESTAMPS
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "verification_status",
            "created_at",
            "updated_at",
        ]

        extra_kwargs = {
            "registration_number": {
                "required": True,
                "allow_blank": False,
            },

            "license_number": {
                "required": True,
                "allow_blank": False,
            },

            "issuing_authority": {
                "required": True,
                "allow_blank": False,
            },

            "specialization": {
                "required": True,
                "allow_blank": False,
            },

            "experience": {
                "required": True,
            },

            "location": {
                "required": True,
                "allow_blank": False,
            },

            "address": {
                "required": True,
                "allow_blank": False,
            },
        }

    # =========================================================
    # VALIDATE REQUIRED PROFESSIONAL INFORMATION
    # =========================================================

    def validate(self, attrs):

        required_fields = [
            "registration_number",
            "license_number",
            "issuing_authority",
            "specialization",
            "experience",
            "location",
            "address",
        ]

        errors = {}

        for field in required_fields:

            if field in attrs:

                value = attrs.get(field)

            elif self.instance:

                value = getattr(
                    self.instance,
                    field,
                    None
                )

            else:

                value = None

            if value is None:

                errors[field] = (
                    "This field is required."
                )

            elif isinstance(value, str) and not value.strip():

                errors[field] = (
                    "This field cannot be blank."
                )

        if errors:

            raise serializers.ValidationError(
                errors
            )

        return attrs

class DoctorSerializer(serializers.ModelSerializer):
    doctor_name = serializers.SerializerMethodField()

    username = serializers.CharField(
        source="doctor.username",
        read_only=True
    )

    email = serializers.EmailField(
        source="doctor.email",
        read_only=True
    )

    class Meta:
        model = DoctorProfile

        fields = [
            "id",
            "doctor_name",
            "username",
            "email",
            "specialization",
            "qualification",
            "experience",
            "location",
            "address",
            "hospital_name",
            "hospital_location",
            "consultation_fee",
            "languages",
            "phone",
            "is_available",
            "profile_image",
        ]

    def get_doctor_name(self, obj):
        full_name = obj.full_name.strip()

        if full_name:
            return f"Dr. {full_name}"

        return f"Dr. {obj.doctor.username}"
