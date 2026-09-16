
from rest_framework import generics, status

from rest_framework.permissions import IsAuthenticated

from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
)

from rest_framework.response import Response
from rest_framework.views import APIView

from .models import DoctorProfile

from .serializers import (
    DoctorProfileSerializer,
    DoctorSerializer,
)

from .permissions import IsDoctorOwnerOrAdmin


# =========================================================
# DOCTOR PROFILE
# =========================================================

class DoctorProfileView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    # =====================================================
    # GET PROFILE
    # =====================================================

    def get(self, request):

        profile, created = (
            DoctorProfile.objects.get_or_create(
                doctor=request.user
            )
        )

        serializer = DoctorProfileSerializer(
            profile,
            context={
                "request": request
            },
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    # =====================================================
    # UPDATE PROFILE
    # =====================================================

    def put(self, request):

        profile, created = (
            DoctorProfile.objects.get_or_create(
                doctor=request.user
            )
        )

        serializer = DoctorProfileSerializer(
            profile,
            data=request.data,
            partial=False,
            context={
                "request": request
            },
        )

        if not serializer.is_valid():

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        profile = serializer.save()

        # -------------------------------------------------
        # PROFILE CHANGED
        # REQUIRE VERIFICATION AGAIN
        # -------------------------------------------------

        profile.verification_status = "PENDING"

        profile.save(
            update_fields=[
                "verification_status"
            ]
        )

        response_serializer = (
            DoctorProfileSerializer(
                profile,
                context={
                    "request": request
                },
            )
        )

        return Response(
            response_serializer.data,
            status=status.HTTP_200_OK,
        )


# =========================================================
# DOCTOR AVAILABILITY
# =========================================================

class DoctorAvailabilityView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    # =====================================================
    # UPDATE AVAILABILITY
    # =====================================================

    def patch(self, request):

        profile, created = (
            DoctorProfile.objects.get_or_create(
                doctor=request.user
            )
        )

        is_available = request.data.get(
            "is_available"
        )

        # =================================================
        # VALIDATION
        # =================================================

        if is_available is None:

            return Response(
                {
                    "detail": (
                        "is_available is required."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # =================================================
        # CONVERT VALUE TO BOOLEAN
        # =================================================

        if isinstance(is_available, bool):

            availability_value = is_available

        else:

            availability_value = (
                str(is_available).strip().lower()
                == "true"
            )

        # =================================================
        # SAVE AVAILABILITY
        # =================================================

        profile.is_available = (
            availability_value
        )

        profile.save(
            update_fields=[
                "is_available"
            ]
        )

        # =================================================
        # RESPONSE
        # =================================================

        return Response(
            {
                "is_available":
                profile.is_available
            },
            status=status.HTTP_200_OK,
        )


# =========================================================
# DOCTOR LIST
# =========================================================

class DoctorListView(
    generics.ListAPIView
):

    serializer_class = DoctorSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

        return (
            DoctorProfile.objects
            .filter(
                doctor__role="doctor",
                verification_status="APPROVED",
            )
            .select_related("doctor")
        )


# =========================================================
# DOCTOR DETAIL
# =========================================================

class DoctorDetailView(
    generics.RetrieveAPIView
):

    queryset = (
        DoctorProfile.objects
        .select_related("doctor")
    )

    serializer_class = DoctorSerializer

    permission_classes = [
        IsAuthenticated
    ]


# =========================================================
# DOCTOR UPDATE
# =========================================================

class DoctorUpdateView(
    generics.UpdateAPIView
):

    queryset = (
        DoctorProfile.objects
        .select_related("doctor")
    )

    serializer_class = DoctorSerializer

    permission_classes = [
        IsAuthenticated,
        IsDoctorOwnerOrAdmin,
    ]


# =========================================================
# DOCTOR DELETE
# =========================================================

class DoctorDeleteView(
    generics.DestroyAPIView
):

    queryset = (
        DoctorProfile.objects
        .select_related("doctor")
    )

    serializer_class = DoctorSerializer

    permission_classes = [
        IsAuthenticated,
        IsDoctorOwnerOrAdmin,
    ]

