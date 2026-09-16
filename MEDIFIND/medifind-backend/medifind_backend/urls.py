"""
URL configuration for medifind_backend project.

The HEAD`urlpatterns` list routes URLs to views.
"""

from django.contrib import admin
from django.urls import path, include

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [

    # Django Admin
    path('admin/', admin.site.urls),

    # =========================
    # USER APIs
    # =========================
    path('api/', include('users.urls')),

    # =========================
    # AUTHENTICATION APIs
    # =========================
    path('api/auth/', include('authentication.urls')),

    # =========================
    # ADMIN APIs
    # =========================
    path('api/admin/', include('admin_api.urls')),

    # =========================
    # DOCTOR APIs
    # =========================
    path('api/doctors/', include('doctors.urls')),

    # =========================
    # DIAGNOSTICS APIs
    # =========================
    path('api/diagnostics/', include('diagnostics.urls')),

    # =========================
    # PHARMACY APIs
    # =========================
    path('api/pharmacy/', include('pharmacy.urls')),

    # =========================
    # SWAGGER / API DOCUMENTATION
    # =========================
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path(
        'api/docs/',
        SpectacularSwaggerView.as_view(url_name='schema'),
        name='swagger-ui'
    ),

]


# =========================
# MEDIA FILES
# =========================

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )