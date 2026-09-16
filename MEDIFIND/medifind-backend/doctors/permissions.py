from rest_framework.permissions import BasePermission


class IsDoctorOwnerOrAdmin(BasePermission):
    """
    Allows:
    - Admin users
    - Doctors accessing their own profile
    """

    def has_permission(self, request, view):

        if not request.user or not request.user.is_authenticated:
            return False

        # Admin
        if (
            getattr(request.user, "is_staff", False)
            or getattr(request.user, "is_superuser", False)
            or getattr(request.user, "role", "") == "admin"
        ):
            return True

        # Doctor
        return getattr(request.user, "role", "") == "doctor"

    def has_object_permission(self, request, view, obj):

        # Admin can access everything
        if (
            getattr(request.user, "is_staff", False)
            or getattr(request.user, "is_superuser", False)
            or getattr(request.user, "role", "") == "admin"
        ):
            return True

        # Doctor can access only their own profile
        return getattr(obj, "doctor", None) == request.user