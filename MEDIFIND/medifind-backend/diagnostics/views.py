from django.utils import timezone
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics
from django.db import transaction
from rest_framework import serializers

from drf_spectacular.utils import (
    extend_schema,
    OpenApiResponse,
    inline_serializer
)

from .models import Diagnostics, DiagnosticTest
from .serializers import (
    DiagnosticsRegisterSerializer,
    DiagnosticsProfileSerializer,
    DiagnosticsProfileUpdateSerializer,
    DiagnosticsDocumentUploadSerializer,
    DiagnosticsSubmitVerificationSerializer,
    DiagnosticsVerificationSerializer,
    DiagnosticTestSerializer,
    DiagnosticsDashboardSerializer,
    PatientDiagnosticsListSerializer,
    PatientDiagnosticsDetailSerializer,
)
from .permissions import IsOwnerCenterOrAdmin, IsDiagnosticsCenter


class DiagnosticsRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(
    request=DiagnosticsRegisterSerializer,
    responses={
        201: inline_serializer(
            name="DiagnosticsRegisterResponse",
            fields={
                "message": serializers.CharField(),
                "user_id": serializers.IntegerField(),
                "diagnostics_id": serializers.IntegerField(),
                "username": serializers.CharField(),
                "role": serializers.CharField(),
            },
        ),
        400: OpenApiResponse(
            description="Invalid registration data."
        ),
    },
    description=(
        "Register a diagnostics center and create its associated "
        "CustomUser authentication account."
    ),
)
    def post(self, request):

        serializer = DiagnosticsRegisterSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        diagnostics = serializer.save()

        return Response(
            {
                "message": (
                    "Diagnostics center registered successfully. "
                    "Awaiting document verification."
                ),
                "user_id": diagnostics.user_id,
                "diagnostics_id": diagnostics.id,
                "username": diagnostics.user.username,
                "role": diagnostics.user.role,
            },
            status=status.HTTP_201_CREATED
        )

class DiagnosticsDocumentUploadView(APIView):
    """
    PATCH /api/diagnostics/profile/documents/

    Upload verification documents for the logged-in
    diagnostics center.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsDiagnosticsCenter]

    @extend_schema(
    tags=['Diagnostics'],
    summary='Upload verification documents',
    description=(
        "Uploads or replaces verification documents for the "
        "authenticated diagnostics center."
    ),
    request=DiagnosticsDocumentUploadSerializer,
    responses=DiagnosticsProfileSerializer,
)
    def patch(self, request):

        diagnostics = request.user.diagnostics_profile
        serializer = DiagnosticsDocumentUploadSerializer(
            diagnostics,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                DiagnosticsProfileSerializer(
                    diagnostics
                ).data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class DiagnosticsSubmitVerificationView(APIView):
    """
    POST /api/diagnostics/profile/submit-verification/

    Validates the diagnostics profile and documents,
    then submits the center for admin verification.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsDiagnosticsCenter]

    @extend_schema(
    tags=['Diagnostics'],
    summary='Submit center for verification',
    description=(
        'Submits the authenticated diagnostics center for administrator '
        'verification after all required profile information and documents '
        'have been completed.'
    ),
    request=DiagnosticsSubmitVerificationSerializer,
    responses={
        200: inline_serializer(
            name='DiagnosticsSubmitVerificationResponse',
            fields={
                'message': serializers.CharField(),
                'data': DiagnosticsProfileSerializer(),
            },
        ),
        400: OpenApiResponse(
            description='Required profile information or documents are missing.'
        ),
    },
)
    def post(self, request):

        diagnostics = request.user.diagnostics_profile
        # =================================================
        # PREVENT RE-SUBMISSION OF VERIFIED CENTER
        # =================================================

        if diagnostics.verification_status == 'verified':

            return Response(
                {
                    "message": (
                        "This diagnostics center has "
                        "already been verified."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # =================================================
        # VALIDATE PROFILE + DOCUMENTS
        # =================================================

        serializer = DiagnosticsSubmitVerificationSerializer(
            data={},
            context={
                "diagnostics": diagnostics
            }
        )

        if not serializer.is_valid():

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        # =================================================
        # SUBMIT
        # =================================================

        diagnostics.verification_submitted = True
        diagnostics.verification_status = 'pending'

        # Clear any previous rejection information
        diagnostics.rejection_reason = None
        diagnostics.verified_at = None
        diagnostics.verified_by = None

        diagnostics.save(
            update_fields=[
                'verification_submitted',
                'verification_status',
                'rejection_reason',
                'verified_at',
                'verified_by',
                'updated_at',
            ]
        )

        return Response(
            {
                "message": (
                    "Verification request submitted "
                    "successfully. Awaiting admin review."
                ),
                "data": DiagnosticsProfileSerializer(
                    diagnostics
                ).data
            },
            status=status.HTTP_200_OK
        )


class DiagnosticsDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsOwnerCenterOrAdmin]

    @extend_schema(
    tags=['Diagnostics'],
    summary='Get diagnostic center details',
    description=(
        "Returns detailed information about a diagnostic center. "
        "Access is restricted to the center itself or an administrator."
    ),
    responses={
        200: DiagnosticsProfileSerializer,
        404: OpenApiResponse(
            description="Diagnostics center not found."
        ),
    },
)
    def get(self, request, pk):
        try:
            diagnostics = Diagnostics.objects.get(pk=pk)
        except Diagnostics.DoesNotExist:
            return Response({"error": "Diagnostics center not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response(DiagnosticsProfileSerializer(diagnostics).data, status=status.HTTP_200_OK)

class DiagnosticsProfileView(APIView):
    """
    GET   /api/diagnostics/profile/
    PATCH /api/diagnostics/profile/

    Allows a logged-in diagnostics center to view
    and update its own profile.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsDiagnosticsCenter]

    def get_object(self, request):
        return request.user.diagnostics_profile

    # =====================================================
    # GET PROFILE
    # =====================================================

    @extend_schema(
    tags=['Diagnostics'],
    summary='Get diagnostic center profile',
    description=(
        "Retrieves the profile of the authenticated diagnostics center."
    ),
    responses=DiagnosticsProfileSerializer,
)
    def get(self, request):

        diagnostics = self.get_object(request)

        serializer = DiagnosticsProfileSerializer(
            diagnostics
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    # =====================================================
    # UPDATE PROFILE
    # =====================================================

    @extend_schema(
    tags=['Diagnostics'],
    summary='Update diagnostic center profile',
    description=(
        "Updates the profile of the authenticated diagnostics center. "
        "Availability can only be changed after the center has been verified."
    ),
    request=DiagnosticsProfileUpdateSerializer,
    responses=DiagnosticsProfileSerializer,
)
    def patch(self, request):

        diagnostics = self.get_object(request)

        print("\n========== DIAGNOSTICS PROFILE UPDATE ==========")
        print("REQUEST DATA:", request.data)
        print("DIAGNOSTICS:", diagnostics.username)
        print("VERIFICATION STATUS:", diagnostics.verification_status)
        print("===============================================\n")

        if "availability" in request.data:

            if diagnostics.verification_status != "verified":

                return Response(
                    {
                        "detail": (
                            "Availability can only be changed "
                            "after the diagnostic center is verified."
                        )
                    },
                    status=status.HTTP_403_FORBIDDEN
                )


        serializer = DiagnosticsProfileUpdateSerializer(
            diagnostics,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                DiagnosticsProfileSerializer(
                    diagnostics
                ).data,
                status=status.HTTP_200_OK
            )

        print("\n========== PROFILE UPDATE ERRORS ==========")
        print("ERRORS:", serializer.errors)
        print("===========================================\n")



        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class DiagnosticsListForAdminView(APIView):
    """Used by Admin dashboard to list diagnostic centers."""

    # Only admins can access this endpoint
    permission_classes = [permissions.IsAdminUser]

    @extend_schema(
    tags=['Diagnostics'],
    summary='List diagnostic centers for administration',
    description=(
        "Returns diagnostics centers that have submitted verification "
        "requests. The optional status query parameter filters results."
    ),
    responses=DiagnosticsProfileSerializer(many=True),
)
    def get(self, request):
        status_filter = request.query_params.get("status", "all")

        # Only centers that explicitly submitted
        # themselves for verification are visible to admin.
        queryset = Diagnostics.objects.filter(
            verification_submitted=True
        )

        if status_filter != "all":
            queryset = queryset.filter(
                verification_status=status_filter
            )

        return Response(
            DiagnosticsProfileSerializer(
                queryset,
                many=True
            ).data,
            status=status.HTTP_200_OK
        )

    
class DiagnosticsVerifyView(APIView):
    """
    Called by Admin (Jyothi's module) to approve/reject a diagnostics center.

    PATCH /diagnostics/<pk>/verify/
    Body: { "verification_status": "verified" }
       or { "verification_status": "rejected", "rejection_reason": "..." }
    """
    # only an admin (Django staff user) can approve/reject
    permission_classes = [permissions.IsAdminUser]

    @extend_schema(
    tags=['Diagnostics'],
    summary='Approve or reject diagnostic center',
    description=(
        "Approves or rejects a diagnostics center after reviewing its "
        "verification submission. Rejection requires a rejection reason."
    ),
    request=DiagnosticsVerificationSerializer,
    responses={
        200: inline_serializer(
            name="DiagnosticsVerificationResponse",
            fields={
                "message": serializers.CharField(),
                "data": DiagnosticsVerificationSerializer(),
            },
        ),
        400: OpenApiResponse(
            description="Invalid verification request."
        ),
        404: OpenApiResponse(
            description="Diagnostics center not found."
        ),
    },
)
    def patch(self, request, pk):
        try:
            diagnostics = Diagnostics.objects.get(pk=pk)
        except Diagnostics.DoesNotExist:
            return Response({"error": "Diagnostics center not found"}, status=status.HTTP_404_NOT_FOUND)

        if not diagnostics.verification_submitted:
            return Response(
                {
                    "error": (
                        "This diagnostics center has not submitted "
                        "a verification request."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = DiagnosticsVerificationSerializer(diagnostics, data=request.data, partial=True)
        if serializer.is_valid():
            new_status = serializer.validated_data['verification_status']

            # the VIEW stamps who/when — serializer has no access to request.user
            serializer.save(
                verified_at=timezone.now(),
                verified_by=request.user.get_full_name() or request.user.username,
                is_active=(new_status == 'verified'),
            )

            return Response(
                {"message": f"Status updated to {new_status}", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DiagnosticsDeleteView(APIView):
    """
    Admin-only endpoint to permanently delete a diagnostic center.

    DELETE /api/diagnostics/<pk>/delete/
    """

    permission_classes = [permissions.IsAdminUser]

    @extend_schema(
    tags=['Diagnostics'],
    summary='Delete diagnostic center',
    description=(
        "Permanently deletes a diagnostic center and its associated "
        "authentication account. Administrator access is required."
    ),
    responses={
        200: OpenApiResponse(
            description="Diagnostic center deleted successfully."
        ),
        404: OpenApiResponse(
            description="Diagnostics center not found."
        ),
    },
)

    @transaction.atomic
    def delete(self, request, pk):
        try:
            diagnostics = Diagnostics.objects.select_related(
                "user"
            ).get(pk=pk)
        except Diagnostics.DoesNotExist:
            return Response(
                {
                    "error": "Diagnostics center not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        center_name = diagnostics.center_name
        user = diagnostics.user

        diagnostics.delete()

        if user:
            user.delete()

        return Response(
            {
                "message": (
                    f"Diagnostic center '{center_name}' "
                    "and its associated user account "
                    "were deleted successfully."
                )
            },
            status=status.HTTP_200_OK
        )
    
class DiagnosticTestListCreateView(generics.ListCreateAPIView):
    """GET (list) / POST (create) -> /api/diagnostics/dashboard/tests/"""

    serializer_class = DiagnosticTestSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsDiagnosticsCenter]

    @extend_schema(
    tags=['Diagnostics'],
    summary='List diagnostic tests',
    description=(
        "Returns all diagnostic tests belonging to the authenticated "
        "diagnostics center."
    ),
    responses=DiagnosticTestSerializer(many=True),
)
    def get_queryset(self):
        diagnostics = self.request.user.diagnostics_profile

        return DiagnosticTest.objects.filter(
            diagnostics_center=diagnostics
        ).order_by("-created_at")

    @extend_schema(
    tags=['Diagnostics'],
    summary='Create diagnostic test',
    description=(
        "Creates a new diagnostic test for the authenticated "
        "diagnostics center."
    ),
    request=DiagnosticTestSerializer,
    responses=DiagnosticTestSerializer,
)
    def perform_create(self, serializer):
        diagnostics = self.request.user.diagnostics_profile

        serializer.save(
            diagnostics_center=diagnostics
        )

class DiagnosticTestDetailView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = DiagnosticTestSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsDiagnosticsCenter]

    def get_queryset(self):
        diagnostics = self.request.user.diagnostics_profile

        return DiagnosticTest.objects.filter(
            diagnostics_center=diagnostics
        )

    @extend_schema(
        tags=['Diagnostics'],
        summary='Get diagnostic test',
        description=(
            'Returns a specific diagnostic test belonging to the '
            'authenticated diagnostics center.'
        ),
        responses={
            200: DiagnosticTestSerializer,
            404: OpenApiResponse(
                description='Diagnostic test not found.'
            ),
        },
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @extend_schema(
        tags=['Diagnostics'],
        summary='Update diagnostic test',
        description=(
            'Replaces an existing diagnostic test belonging to the '
            'authenticated diagnostics center.'
        ),
        request=DiagnosticTestSerializer,
        responses={
            200: DiagnosticTestSerializer,
            404: OpenApiResponse(
                description='Diagnostic test not found.'
            ),
        },
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @extend_schema(
        tags=['Diagnostics'],
        summary='Partially update diagnostic test',
        description=(
            'Updates selected fields of an existing diagnostic test '
            'belonging to the authenticated diagnostics center.'
        ),
        request=DiagnosticTestSerializer,
        responses={
            200: DiagnosticTestSerializer,
            404: OpenApiResponse(
                description='Diagnostic test not found.'
            ),
        },
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    @extend_schema(
        tags=['Diagnostics'],
        summary='Delete diagnostic test',
        description=(
            'Deletes a diagnostic test belonging to the '
            'authenticated diagnostics center.'
        ),
        responses={
            204: OpenApiResponse(
                description='Diagnostic test deleted successfully.'
            ),
            404: OpenApiResponse(
                description='Diagnostic test not found.'
            ),
        },
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)

class DiagnosticsDashboardSummaryView(generics.RetrieveAPIView):
    """GET /api/diagnostics/dashboard/ — self only, via token, no pk needed"""
    serializer_class = DiagnosticsDashboardSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsDiagnosticsCenter]

    @extend_schema(
        tags=['Diagnostics'],
        summary='Get diagnostic center dashboard',
        description=(
            'Returns dashboard information for the authenticated '
            'diagnostics center, including verification status and '
            'diagnostic test counts.'
        ),
        responses=DiagnosticsDashboardSerializer,
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_object(self):
        return self.request.user.diagnostics_profile

   
class PatientDiagnosticsListView(generics.ListAPIView):
    """
    GET /api/diagnostics/patient/

    Returns all verified and active diagnostic centers
    that are visible to patients.
    """

    serializer_class = PatientDiagnosticsListSerializer
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
    tags=['Diagnostics'],
    summary='List available diagnostic centers',
    description=(
        "Returns verified and active diagnostic centers available "
        "for patient discovery."
    ),
    responses=PatientDiagnosticsListSerializer(many=True),
)

    def get_queryset(self):
        return Diagnostics.objects.filter(
            verification_status='verified',
            is_active=True
        ).order_by('-rating', 'center_name')

class PatientDiagnosticsDetailView(generics.RetrieveAPIView):
    """
    GET /api/diagnostics/patient/<id>/

    Returns public information about a verified and active
    diagnostic center.
    """

    serializer_class = PatientDiagnosticsDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
    tags=['Diagnostics'],
    summary='Get diagnostic center for patient',
    description=(
        "Returns public information about a verified and active "
        "diagnostic center, including its available tests."
    ),
    responses={
        200: PatientDiagnosticsDetailSerializer,
        404: OpenApiResponse(
            description="Diagnostic center not found."
        ),
    },
)

    def get_queryset(self):
        return Diagnostics.objects.filter(
            verification_status='verified',
            is_active=True
        )
