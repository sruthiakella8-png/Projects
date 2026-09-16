from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Diagnostics

User = get_user_model()


class DiagnosticsVerificationTests(APITestCase):
    """
    Covers the diagnostics verification and ownership flow:

    - only admins can verify/reject
    - rejection requires a reason
    - verified_at / verified_by are stamped
    - a diagnostics user can only access its own profile
    - admins can access any diagnostics profile
    - unauthenticated requests are rejected
    """

    def setUp(self):
        # --------------------------------------------
        # Admin
        # --------------------------------------------
        self.admin_user = User.objects.create_user(
            username="admin",
            password="adminpass123",
            is_staff=True,
        )

        # --------------------------------------------
        # Diagnostics authentication users
        # --------------------------------------------
        self.center_user = User.objects.create_user(
            username="abc_diag_user",
            email="abc.user@example.com",
            phone="9999999999",
            password="diagpass123",
            role=User.Role.DIAGNOSTIC,
        )

        self.other_center_user = User.objects.create_user(
            username="xyz_diag_user",
            email="xyz.user@example.com",
            phone="8888888888",
            password="diagpass123",
            role=User.Role.DIAGNOSTIC,
        )

        # --------------------------------------------
        # Diagnostics profiles
        # --------------------------------------------
        self.center = Diagnostics.objects.create(
            user=self.center_user,
            center_name="ABC Diagnostics",
            username=self.center_user.username,
            email=self.center_user.email,
            password=self.center_user.password,
            phone_number=self.center_user.phone,
            license_number="LIC-ABC",
            address="Street 1",
            city="Hyderabad",
            verification_submitted=True,
        )

        self.other_center = Diagnostics.objects.create(
            user=self.other_center_user,
            center_name="XYZ Diagnostics",
            username=self.other_center_user.username,
            email=self.other_center_user.email,
            password=self.other_center_user.password,
            phone_number=self.other_center_user.phone,
            license_number="LIC-XYZ",
            address="Street 2",
            city="Hyderabad",
            verification_submitted=True,
        )

    # --------------------------------------------
    # Authentication helpers
    # --------------------------------------------

    def _admin_auth_header(self):
        token = RefreshToken.for_user(self.admin_user)

        return {
            "HTTP_AUTHORIZATION": f"Bearer {token.access_token}"
        }

    def _center_auth_header(self, user):
        token = RefreshToken.for_user(user)

        return {
            "HTTP_AUTHORIZATION": f"Bearer {token.access_token}"
        }

    # --------------------------------------------
    # Verification tests
    # --------------------------------------------

    def test_admin_can_verify_center(self):
        url = f"/api/diagnostics/{self.center.id}/verify/"

        response = self.client.patch(
            url,
            {"verification_status": "verified"},
            format="json",
            **self._admin_auth_header(),
        )

        self.assertEqual(response.status_code, 200)

        self.center.refresh_from_db()

        self.assertEqual(
            self.center.verification_status,
            "verified",
        )

        self.assertIsNotNone(
            self.center.verified_at
        )

        self.assertEqual(
            self.center.verified_by,
            "admin",
        )

        self.assertTrue(
            self.center.is_active
        )

    def test_non_admin_cannot_verify_center(self):
        url = f"/api/diagnostics/{self.center.id}/verify/"

        response = self.client.patch(
            url,
            {"verification_status": "verified"},
            format="json",
            **self._center_auth_header(
                self.center_user
            ),
        )

        self.assertEqual(
            response.status_code,
            403,
        )

    def test_rejection_without_reason_fails(self):
        url = f"/api/diagnostics/{self.center.id}/verify/"

        response = self.client.patch(
            url,
            {"verification_status": "rejected"},
            format="json",
            **self._admin_auth_header(),
        )

        self.assertEqual(
            response.status_code,
            400,
        )

    def test_rejection_with_reason_succeeds(self):
        url = f"/api/diagnostics/{self.center.id}/verify/"

        response = self.client.patch(
            url,
            {
                "verification_status": "rejected",
                "rejection_reason": "License number mismatch",
            },
            format="json",
            **self._admin_auth_header(),
        )

        self.assertEqual(
            response.status_code,
            200,
        )

        self.center.refresh_from_db()

        self.assertEqual(
            self.center.verification_status,
            "rejected",
        )

        self.assertFalse(
            self.center.is_active
        )

    def test_verify_nonexistent_center_returns_404(self):
        url = "/api/diagnostics/99999/verify/"

        response = self.client.patch(
            url,
            {"verification_status": "verified"},
            format="json",
            **self._admin_auth_header(),
        )

        self.assertEqual(
            response.status_code,
            404,
        )

    # --------------------------------------------
    # Ownership tests
    # --------------------------------------------

    def test_owner_can_view_own_profile(self):
        url = f"/api/diagnostics/{self.center.id}/"

        response = self.client.get(
            url,
            **self._center_auth_header(
                self.center_user
            ),
        )

        self.assertEqual(
            response.status_code,
            200,
        )

    def test_center_cannot_view_other_center_profile(self):
        url = f"/api/diagnostics/{self.other_center.id}/"

        response = self.client.get(
            url,
            **self._center_auth_header(
                self.center_user
            ),
        )

        self.assertEqual(
            response.status_code,
            403,
        )

    def test_admin_can_view_any_center_profile(self):
        url = f"/api/diagnostics/{self.center.id}/"

        response = self.client.get(
            url,
            **self._admin_auth_header(),
        )

        self.assertEqual(
            response.status_code,
            200,
        )

    def test_unauthenticated_request_is_rejected(self):
        url = f"/api/diagnostics/{self.center.id}/"

        response = self.client.get(url)

        self.assertIn(
            response.status_code,
            (401, 403),
        )