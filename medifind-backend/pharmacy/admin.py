from django.contrib import admin

from .models import (
    Pharmacy,
    PharmacyDocument,
    Medicine,
    Conversation,
    Message,
)


# ============================================================
# PHARMACY ADMIN
# ============================================================

@admin.register(Pharmacy)
class PharmacyAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "pharmacy_name",
        "registration_number",
        "phone",
        "email",
        "city",
        "state",
        "verification_status",
        "created_at",
    )

    list_filter = (
        "verification_status",
        "state",
        "city",
    )

    search_fields = (
        "pharmacy_name",
        "registration_number",
        "email",
        "phone",
        "city",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )


# ============================================================
# PHARMACY DOCUMENT ADMIN
# ============================================================

@admin.register(PharmacyDocument)
class PharmacyDocumentAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "pharmacy",
        "document_type",
        "uploaded_at",
    )

    list_filter = (
        "document_type",
        "uploaded_at",
    )

    search_fields = (
        "pharmacy__pharmacy_name",
        "pharmacy__registration_number",
    )


# ============================================================
# MEDICINE ADMIN
# ============================================================

@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "medicine_name",
        "pharmacy",
        "category",
        "manufacturer",
        "price",
        "stock_quantity",
        "expiry_date",
        "prescription_required",
        "created_at",
    )

    list_filter = (
        "category",
        "prescription_required",
        "expiry_date",
    )

    search_fields = (
        "medicine_name",
        "generic_name",
        "manufacturer",
        "pharmacy__pharmacy_name",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )


# ============================================================
# CONVERSATION ADMIN
# ============================================================

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "customer",
        "pharmacy",
        "created_at",
        "updated_at",
    )

    list_filter = (
        "created_at",
        "updated_at",
    )

    search_fields = (
        "customer__username",
        "customer__email",
        "pharmacy__pharmacy_name",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )


# ============================================================
# MESSAGE ADMIN
# ============================================================

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "conversation",
        "sender",
        "message_preview",
        "is_read",
        "created_at",
    )

    list_filter = (
        "is_read",
        "created_at",
    )

    search_fields = (
        "message",
        "sender__username",
        "sender__email",
        "conversation__pharmacy__pharmacy_name",
    )

    readonly_fields = (
        "created_at",
    )

    def message_preview(self, obj):
        return obj.message[:50]

    message_preview.short_description = "Message"
