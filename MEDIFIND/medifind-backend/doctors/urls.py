
from django.urls import path

from .views import (
    DoctorProfileView,
    DoctorAvailabilityView,
)

from .views import (

    DoctorListView,
    DoctorDetailView,
    DoctorUpdateView,
    DoctorDeleteView,
)




urlpatterns = [

    # ============================================================
    # DOCTOR PROFILE
    # ============================================================


    path(
        "profile/",
        DoctorProfileView.as_view(),
        name="doctor-profile",
    ),


    # ============================================================
    # DOCTOR AVAILABILITY
    # ============================================================


    path(
        "availability/",
        DoctorAvailabilityView.as_view(),
        name="doctor-availability",
    ),

    # ============================================================
    # DOCTOR LIST
    # GET /api/doctors/
    # ============================================================


    path(
        "",
        DoctorListView.as_view(),
        name="doctor-list",
    ),

    # ============================================================
    # DOCTOR DETAIL
    # GET /api/doctors/<id>/
    # ============================================================

    path(
        "<int:pk>/",
        DoctorDetailView.as_view(),
        name="doctor-detail",
    ),

    # ============================================================
    # UPDATE DOCTOR
    # PUT/PATCH /api/doctors/<id>/update/
    # ============================================================

    path(
        "<int:pk>/update/",
        DoctorUpdateView.as_view(),
        name="doctor-update",
    ),

    # ============================================================
    # DELETE DOCTOR
    # DELETE /api/doctors/<id>/delete/
    # ============================================================

    path(
        "<int:pk>/delete/",
        DoctorDeleteView.as_view(),
        name="doctor-delete",
    ),

]