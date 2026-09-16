from rest_framework import permissions

from users.models import CustomUser


class IsDiagnosticsCenter(permissions.BasePermission):
    """
    Allows access only to authenticated users whose role is
    'diagnostics' and who have an associated Diagnostics profile.
    """

    def has_permission(self, request, view):
        user = request.user

        if not user or not user.is_authenticated:
            return False

        if user.role != CustomUser.Role.DIAGNOSTIC:
            return False

        return hasattr(user, "diagnostics_profile")


class IsOwnerCenterOrAdmin(permissions.BasePermission):
    """
    Allows access to:
    - Django staff/admin users, or
    - the diagnostics user whose profile matches the URL pk.
    """

    def has_permission(self, request, view):
        user = request.user

        if not user or not user.is_authenticated:
            return False

        if getattr(user, "is_staff", False):
            return True

        if user.role != CustomUser.Role.DIAGNOSTIC:
            return False

        diagnostics = getattr(user, "diagnostics_profile", None)

        if diagnostics is None:
            return False

        return str(diagnostics.pk) == str(view.kwargs.get("pk"))