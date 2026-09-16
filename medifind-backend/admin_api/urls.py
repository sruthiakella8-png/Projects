from django.urls import path
from .views import AdminRegisterView, AdminLoginView, AdminDashboardView

urlpatterns = [
    path('register/', AdminRegisterView.as_view(), name='admin-register'),
    path('login/', AdminLoginView.as_view(), name='admin-login'),
    path('dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),
]