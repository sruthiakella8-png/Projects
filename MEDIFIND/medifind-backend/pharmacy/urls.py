from django.urls import path

from .views import (

    # Pharmacy
    PharmacyRegisterView,
    PharmacyLoginView,
    PharmacyProfileView,

    # Documents
    PharmacyDocumentView,
    PharmacyDocumentDeleteView,

    # Medicines
    PharmacyMedicineListCreateView,
    PharmacyMedicineDetailView,

    # Customer messaging
    CustomerConversationView,
    CustomerConversationDetailView,

    # Pharmacy messaging
    PharmacyConversationView,
    PharmacyConversationDetailView,
    PharmacyMessageReadView,

    # Admin
    AdminPharmacyListView,
    AdminApprovePharmacyView,
    AdminRejectPharmacyView,
    AdminDeletePharmacyView,
)


urlpatterns = [

    # ========================================================
    # PHARMACY REGISTRATION
    # ========================================================

    path(
        "register/",
        PharmacyRegisterView.as_view(),
        name="pharmacy-register"
    ),
    
    path('login/', 
          PharmacyLoginView.as_view(), 
          name='pharmacy-login'
    ),

    # ========================================================
    # PHARMACY PROFILE
    # ========================================================

    path(
        "profile/",
        PharmacyProfileView.as_view(),
        name="pharmacy-profile"
    ),


    # ========================================================
    # DOCUMENTS
    # ========================================================

    path(
        "documents/",
        PharmacyDocumentView.as_view(),
        name="pharmacy-documents"
    ),

    path(
        "documents/<int:document_id>/",
        PharmacyDocumentDeleteView.as_view(),
        name="pharmacy-document-delete"
    ),


    # ========================================================
    # MEDICINES
    # ========================================================

    path(
        "medicines/",
        PharmacyMedicineListCreateView.as_view(),
        name="pharmacy-medicines"
    ),

    path(
        "medicines/<int:medicine_id>/",
        PharmacyMedicineDetailView.as_view(),
        name="pharmacy-medicine-detail"
    ),


    # ========================================================
    # CUSTOMER MESSAGING
    # ========================================================

    path(
        "conversations/",
        CustomerConversationView.as_view(),
        name="customer-conversations"
    ),

    path(
        "conversations/<int:conversation_id>/",
        CustomerConversationDetailView.as_view(),
        name="customer-conversation-detail"
    ),


    # ========================================================
    # PHARMACY MESSAGING
    # ========================================================

    path(
        "messages/inbox/",
        PharmacyConversationView.as_view(),
        name="pharmacy-message-inbox"
    ),

    path(
        "messages/inbox/<int:conversation_id>/",
        PharmacyConversationDetailView.as_view(),
        name="pharmacy-conversation-detail"
    ),

    path(
        "messages/<int:message_id>/read/",
        PharmacyMessageReadView.as_view(),
        name="pharmacy-message-read"
    ),


    # ========================================================
    # ADMIN PHARMACY MANAGEMENT
    # ========================================================

    path(
        "admin/pharmacies/",
        AdminPharmacyListView.as_view(),
        name="admin-pharmacy-list"
    ),

    path(
        "admin/pharmacies/<int:pharmacy_id>/approve/",
        AdminApprovePharmacyView.as_view(),
        name="admin-pharmacy-approve"
    ),

    path(
        "admin/pharmacies/<int:pharmacy_id>/reject/",
        AdminRejectPharmacyView.as_view(),
        name="admin-pharmacy-reject"
    ),

    path(
        "admin/pharmacies/<int:pharmacy_id>/delete/",
        AdminDeletePharmacyView.as_view(),
        name="admin-pharmacy-delete"
    ),
]