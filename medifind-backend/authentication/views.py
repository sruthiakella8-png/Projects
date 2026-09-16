
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    LogoutSerializer,
    LoginSerializer,
    RegisterSerializer,
    PharmacyRegisterSerializer,
    CustomTokenObtainPairSerializer,
)


# =====================================================
# JWT LOGIN
# =====================================================

class CustomTokenObtainPairView(
    TokenObtainPairView
):
    """
    Login using username and password.

    Returns:
        access
        refresh
        role
        username
        email
        phone
        is_verified
        user_id
    """

    serializer_class = (
        CustomTokenObtainPairSerializer
    )


# =====================================================
# LOGOUT
# =====================================================

class LogoutView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        serializer = LogoutSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        try:

            refresh_token = (
                serializer.validated_data["refresh"]
            )

            token = RefreshToken(
                refresh_token
            )

            token.blacklist()

            return Response(
                {
                    "message": (
                        "Logged out successfully"
                    )
                },
                status=status.HTTP_205_RESET_CONTENT,
            )

        except Exception as error:

            return Response(
                {
                    "error": str(error)
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


# =====================================================
# TEST AUTHENTICATION
# =====================================================

class TestAuthView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        return Response(
            {
                "message": (
                    "JWT Authentication Successful"
                ),

                "username": (
                    request.user.username
                ),

                "role": getattr(
                    request.user,
                    "role",
                    None
                ),
            },
            status=status.HTTP_200_OK,
        )


# =====================================================
# NORMAL REGISTER
# =====================================================

class RegisterView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        serializer = RegisterSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.save()

        refresh = RefreshToken.for_user(
            user
        )

        return Response(
            {
                "message": (
                    "User registered successfully"
                ),

                "username": user.username,

                "email": user.email,

                "phone": user.phone,

                "role": user.role,

                "access": str(
                    refresh.access_token
                ),

                "refresh": str(
                    refresh
                ),
            },
            status=status.HTTP_201_CREATED,
        )


# =====================================================
# PHARMACY REGISTER
# =====================================================

class PharmacyRegisterView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        data = request.data.copy()

        # Force pharmacy role.
        data["role"] = "PHARMACY"

        serializer = PharmacyRegisterSerializer(
            data=data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.save()

        refresh = RefreshToken.for_user(
            user
        )

        pharmacy = getattr(
            serializer,
            "pharmacy",
            None
        )

        return Response(
            {
                "message": (
                    "Pharmacy registered successfully"
                ),

                "username": user.username,

                "email": user.email,

                "phone": user.phone,

                "role": user.role,

                "pharmacy_id": (
                    pharmacy.id
                    if pharmacy
                    else None
                ),

                "pharmacy_name": (
                    pharmacy.pharmacy_name
                    if pharmacy
                    else None
                ),

                "verification_status": (
                    pharmacy.verification_status
                    if pharmacy
                    else None
                ),

                "access": str(
                    refresh.access_token
                ),

                "refresh": str(
                    refresh
                ),
            },
            status=status.HTTP_201_CREATED,
        )


# =====================================================
# NORMAL LOGIN
# =====================================================

class LoginView(APIView):

    permission_classes = [
        AllowAny
    ]

    def post(self, request):

        serializer = LoginSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.validated_data[
            "user"
        ]

        refresh = RefreshToken.for_user(
            user
        )

        return Response(
            {
                "username": user.username,

                "role": user.role,

                "email": user.email,

                "phone": getattr(
                    user,
                    "phone",
                    ""
                ),

                "is_verified": getattr(
                    user,
                    "is_verified",
                    True
                ),

                "user_id": user.id,

                "access": str(
                    refresh.access_token
                ),

                "refresh": str(
                    refresh
                ),
            },
            status=status.HTTP_200_OK,
        )
