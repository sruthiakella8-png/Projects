from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "admin"


class IsDoctor(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "doctor"


class IsDiagnostics(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "diagnostics"


class IsPharmacy(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "pharmacy"


class IsRegularUser(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "user"

class IsVerifiedPharmacy(BasePermission):
    """Pharmacy role AND their profile has passed doc verification."""
    def has_permission(self, request, view):
        if not (request.user.is_authenticated and request.user.role == "PHARMACY"):
            return False
        pharmacy_profile = getattr(request.user, "pharmacy_profile", None)
        return bool(pharmacy_profile and pharmacy_profile.is_doc_verified)