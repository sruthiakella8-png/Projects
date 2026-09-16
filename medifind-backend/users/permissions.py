from rest_framework.permissions import BasePermission

from .models import CustomUser


class IsAdmin(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == CustomUser.Role.ADMIN
        )


class IsDoctor(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == CustomUser.Role.DOCTOR
        )


class IsPatientUser(BasePermission):

    def has_permission(self, request, view):
        print("========== PATIENT PERMISSION DEBUG ==========")
        print("USER:", request.user)
        print("AUTHENTICATED:", request.user.is_authenticated)
        print("ROLE:", getattr(request.user, "role", "NO ROLE"))
        print("EXPECTED:", CustomUser.Role.USER)
        print("ROLE MATCH:", getattr(request.user, "role", None) == CustomUser.Role.USER)
        print("===============================================")

        return (
            request.user.is_authenticated
            and request.user.role == CustomUser.Role.USER
        )


class IsDiagnostics(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == CustomUser.Role.DIAGNOSTICS
        )


class IsPharmacy(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == CustomUser.Role.PHARMACY
        )