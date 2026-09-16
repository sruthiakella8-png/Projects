from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (RegisterView,UserViewSet,PatientDashboardView,AdminDashboardView,)
router = DefaultRouter()
router.register(r"users",UserViewSet,basename="users",)
urlpatterns = [
    path("",include(router.urls),),
    path("patient/dashboard/",PatientDashboardView.as_view(),name="patient-dashboard",),
    path("admin/dashboard/",AdminDashboardView.as_view(),name="admin-dashboard",),
    path("register/",RegisterView.as_view(),name="register"),
]