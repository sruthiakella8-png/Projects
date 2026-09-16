import pytest
from rest_framework.test import APIClient
from users.models import CustomUser
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

@pytest.mark.django_db
class TestResetPassword:
    def setup_method(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            username="rpuser", email="rp@example.com", phone="6666666666", password="OldPass@123"
        )
        self.uid = urlsafe_base64_encode(force_bytes(self.user.pk))
        self.token = default_token_generator.make_token(self.user)

    def test_reset_password_success(self):
        url = f'/api/reset-password/{self.uid}/{self.token}/'
        response = self.client.post(url, {"password": "NewPass@123"})
        assert response.status_code == 200
        self.user.refresh_from_db()
        assert self.user.check_password("NewPass@123")

    def test_reset_password_invalid_token(self):
        url = f'/api/reset-password/{self.uid}/invalidtoken/'
        response = self.client.post(url, {"password": "NewPass@123"})
        assert response.status_code == 400