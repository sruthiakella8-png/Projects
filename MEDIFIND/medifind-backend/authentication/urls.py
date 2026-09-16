
from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView
from users.views import RegisterView

from .views import (
    CustomTokenObtainPairView,
    LogoutView,
    TestAuthView,
    LoginView,
)


# ============================================================
# AUTHENTICATION URLS
# ============================================================

urlpatterns = [

    # ========================================================
    # JWT LOGIN
    # POST /api/auth/token/
    #
    # Uses CustomTokenObtainPairView so the response contains:
    # access
    # refresh
    # role
    # username
    # email
    # phone
    # is_verified
    # user_id
    # ========================================================

    path(
        "token/",
        CustomTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),

    # ========================================================
    # JWT REFRESH TOKEN
    # POST /api/auth/token/refresh/
    # ========================================================

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),

    # ============================================================
    # LOGOUT
    # POST /api/auth/logout/
    # ============================================================
    path(
        "logout/",
        LogoutView.as_view(),
        name="logout",
    ),

    # ============================================================
    # TEST AUTHENTICATION
    # GET /api/auth/test-auth/
    # ============================================================
    path(
        "test-auth/",
        TestAuthView.as_view(),
        name="test_auth",
    ),

    # ============================================================

    # ========================================================

    # NORMAL LOGIN
    # POST /api/auth/login/
    # ========================================================

    path(
        "login/",
        LoginView.as_view(),
        name="auth-login",
    ),




    # ========================================================
    # LOGOUT
    # POST /api/auth/logout/
    # ========================================================

    path(
        "logout/",
        LogoutView.as_view(),
        name="auth-logout",
    ),

    # ========================================================
    # TEST AUTHENTICATION
    # GET /api/auth/test-auth/
    # ========================================================

    path(
        "test-auth/",
        TestAuthView.as_view(),
        name="test_auth",
    ),

    path("register/", RegisterView.as_view(), name="register"),

]
