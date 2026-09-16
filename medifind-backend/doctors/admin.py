from django.contrib import admin

from .models import DoctorProfile


@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):

    list_display = [
        "doctor",
        "full_name",
        "specialization",
        "hospital_name",
        "experience",
        "consultation_fee",
        "is_available",
        "verification_status",
    ]

    list_filter = [
        "specialization",
        "is_available",
        "verification_status",
    ]

    search_fields = [
        "full_name",
        "doctor__username",
        "doctor__email",
        "specialization",
        "hospital_name",
        "registration_number",
        "license_number",
    ]

    ordering = [
        "-created_at"
    ]



    list_editable = (
        "verification_status",
        "is_available",
    )
