from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import AdminRegisterSerializer, AdminLoginSerializer
from .permissions import IsAdmin
from drf_spectacular.utils import extend_schema

User = get_user_model()

class AdminRegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    @extend_schema(request=AdminRegisterSerializer, responses=AdminRegisterSerializer)
    def post(self, request):
        serializer = AdminRegisterSerializer(data=request.data)
        if serializer.is_valid():
            admin = serializer.save()
            return Response(
                {"message": "Admin registered successfully", "admin_id": admin.id},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminLoginView(APIView):
    permission_classes = [permissions.AllowAny]
    @extend_schema(request=AdminLoginSerializer)
    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user_obj = User.objects.get(email=email, role='admin')
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(username=user_obj.username, password=password)
        if user is None:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "admin": {"id": user.id, "username": user.username, "email": user.email}
        }, status=status.HTTP_200_OK)


class AdminDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    @extend_schema(responses=None)
    def get(self, request):
        total_users = User.objects.filter(role='user').count()
        total_doctors = User.objects.filter(role='doctor').count()
        total_diagnostics = User.objects.filter(role='diagnostics').count()
        total_pharmacy = User.objects.filter(role='pharmacy').count()
        return Response({
            "total_users": total_users,
            "total_doctors": total_doctors,
            "total_diagnostics": total_diagnostics,
            "total_pharmacy": total_pharmacy
        }, status=status.HTTP_200_OK)