# diagnostics/urls.py
from django.urls import path
from .views import (
    DiagnosticsRegisterView,
    DiagnosticsDocumentUploadView,
    DiagnosticsDetailView,
    DiagnosticsListForAdminView,
    DiagnosticsVerifyView,
    DiagnosticTestListCreateView,
    DiagnosticTestDetailView,
    DiagnosticsDashboardSummaryView,
    PatientDiagnosticsListView,
    PatientDiagnosticsDetailView,
    DiagnosticsDeleteView,
    DiagnosticsProfileView,
    DiagnosticsSubmitVerificationView

)

urlpatterns = [
    # auth
    path('register/', DiagnosticsRegisterView.as_view(), name='diagnostics-register'),
    # document + admin verification (Sindhu/Jyothi)
    path('patient/', PatientDiagnosticsListView.as_view(), name='patient-diagnostics-list'),
    path('patient/<int:pk>/', PatientDiagnosticsDetailView.as_view(), name='patient-diagnostics-detail'),
    path('<int:pk>/', DiagnosticsDetailView.as_view(), name='diagnostics-detail'),
    path('<int:pk>/verify/', DiagnosticsVerifyView.as_view(), name='diagnostics-verify'),
    path('admin/list/', DiagnosticsListForAdminView.as_view(), name='diagnostics-admin-list'),
    path("<int:pk>/delete/", DiagnosticsDeleteView.as_view(), name="diagnostics-delete"),
    path('profile/', DiagnosticsProfileView.as_view(), name='diagnostics-profile'),
    path('profile/documents/', DiagnosticsDocumentUploadView.as_view(), name='diagnostics-profile-documents'),
    path('profile/submit-verification/', DiagnosticsSubmitVerificationView.as_view(), name='diagnostics-submit-verification'),

    # your dashboard module
    path('dashboard/', DiagnosticsDashboardSummaryView.as_view(), name='diagnostics-dashboard'),
    path('dashboard/tests/', DiagnosticTestListCreateView.as_view(), name='diagnostics-tests'),
    path('dashboard/tests/<int:pk>/', DiagnosticTestDetailView.as_view(), name='diagnostics-test-detail'),
]