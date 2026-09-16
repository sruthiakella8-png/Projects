import pytest
from rest_framework.test import APIClient
from users.models import CustomUser
from unittest.mock import patch


@pytest.mark.django_db
class TestForgotPassword:
    def setup_method(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            username="fpuser", email="fp@example.com", phone="5555555555", password="StrongPass@123"
        )

    @patch("users.views.EmailMultiAlternatives")
    def test_forgot_password_sends_email(self,mock_email):
        response = self.client.post('/api/forgot-password/', {"email": "fp@example.com"})
        assert response.status_code == 200
        assert mock_email.called
        assert mock_email.return_value.send.called

    def test_forgot_password_invalid_email(self):
        response = self.client.post('/api/forgot-password/', {"email": "notfound@example.com"})
        assert response.status_code == 404