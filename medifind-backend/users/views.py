from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import CustomUser
from .permissions import IsAdmin, IsPatientUser
from .serializers import (
    RegisterSerializer,
    UserCRUDSerializer,
    PatientDashboardSerializer,
    UserDashboardSerializer,
)



class RegisterView(APIView):
    """
    Public registration endpoint.

    POST /api/auth/register/
    """

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.save()

            return Response(
                {
                    "message": "Registration successful.",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "phone": user.phone,
                        "role": user.role,
                        "is_verified": user.is_verified,
                    }
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


# ============================================================
# USER CRUD
# ============================================================

class UserViewSet(viewsets.ModelViewSet):
    """
    Admin-only CRUD operations for users.

    GET     /api/users/
    POST    /api/users/
    GET     /api/users/<id>/
    PUT     /api/users/<id>/
    PATCH   /api/users/<id>/
    DELETE  /api/users/<id>/
    """

    serializer_class = UserCRUDSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    queryset = CustomUser.objects.all().order_by("-created_at")

    def get_queryset(self):
        queryset = CustomUser.objects.all().order_by("-created_at")

        # ----------------------------------------------------
        # Filter by role
        # Example:
        # /api/users/?role=doctor
        # ----------------------------------------------------
        role = self.request.query_params.get("role")

        if role:
            queryset = queryset.filter(role=role)

        # ----------------------------------------------------
        # Search users
        # Example:
        # /api/users/?search=john
        # ----------------------------------------------------
        search = self.request.query_params.get("search")

        if search:
            queryset = queryset.filter(
                Q(username__icontains=search)
                | Q(email__icontains=search)
                | Q(phone__icontains=search)
            )

        return queryset

    # --------------------------------------------------------
    # CREATE USER
    # --------------------------------------------------------

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        return Response(
            {
                "message": "User created successfully.",
                "user": UserCRUDSerializer(user).data,
            },
            status=status.HTTP_201_CREATED,
        )

    # --------------------------------------------------------
    # GET SINGLE USER
    # --------------------------------------------------------

    def retrieve(self, request, *args, **kwargs):
        user = self.get_object()

        serializer = self.get_serializer(user)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    # --------------------------------------------------------
    # UPDATE USER
    # --------------------------------------------------------

    def update(self, request, *args, **kwargs):
        user = self.get_object()

        serializer = self.get_serializer(
            user,
            data=request.data,
        )

        serializer.is_valid(raise_exception=True)

        updated_user = serializer.save()

        return Response(
            {
                "message": "User updated successfully.",
                "user": UserCRUDSerializer(updated_user).data,
            },
            status=status.HTTP_200_OK,
        )

    # --------------------------------------------------------
    # PARTIAL UPDATE USER
    # --------------------------------------------------------

    def partial_update(self, request, *args, **kwargs):
        user = self.get_object()

        serializer = self.get_serializer(
            user,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)

        updated_user = serializer.save()

        return Response(
            {
                "message": "User updated successfully.",
                "user": UserCRUDSerializer(updated_user).data,
            },
            status=status.HTTP_200_OK,
        )

    # --------------------------------------------------------
    # DELETE USER
    # --------------------------------------------------------

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()

        # Prevent admin from deleting their own account
        if user.id == request.user.id:
            return Response(
                {
                    "error": "You cannot delete your own admin account."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.delete()

        return Response(
            {
                "message": "User deleted successfully."
            },
            status=status.HTTP_204_NO_CONTENT,
        )


# ============================================================
# PATIENT DASHBOARD
# ============================================================

class PatientDashboardView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsPatientUser,
    ]

    def get(self, request):
        print("========== PATIENT DASHBOARD DEBUG ==========")
        print("USER:", request.user)
        print("AUTHENTICATED:", request.user.is_authenticated)
        print("ROLE:", request.user.role)
        print("EXPECTED ROLE:", CustomUser.Role.USER)
        print("=============================================")

        serializer = UserDashboardSerializer(request.user)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

# ============================================================
# ADMIN DASHBOARD
# ============================================================

class AdminDashboardView(APIView):
    """
    Admin dashboard statistics.
    """

    permission_classes = [
        IsAuthenticated,
        IsAdmin,
    ]

    def get(self, request):

        total_users = CustomUser.objects.filter(
            role=CustomUser.Role.USER
        ).count()

        total_doctors = CustomUser.objects.filter(
            role=CustomUser.Role.DOCTOR
        ).count()

        total_diagnostics = CustomUser.objects.filter(
            role=CustomUser.Role.DIAGNOSTIC
        ).count()

        total_pharmacies = CustomUser.objects.filter(
            role=CustomUser.Role.PHARMACY
        ).count()

        total_admins = CustomUser.objects.filter(
            role=CustomUser.Role.ADMIN
        ).count()

        total_users_all = CustomUser.objects.count()

        return Response(
            {
                "total_users": total_users,
                "total_doctors": total_doctors,
                "total_diagnostics": total_diagnostics,
                "total_pharmacies": total_pharmacies,
                "total_admins": total_admins,
                "total_users_all": total_users_all,
            },
            status=status.HTTP_200_OK,
        )