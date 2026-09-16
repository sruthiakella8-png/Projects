import pytest
from rest_framework.test import APIClient
from users.models import CustomUser


@pytest.mark.django_db
class TestLogin:
    def setup_method(self):
        self.client = APIClient()
        self.url = '/api/login/'
        self.user = CustomUser.objects.create_user(
            username="loginuser", email="login@example.com", phone="4444444444",
            password="StrongPass@123", role="user"
        )

    def test_successful_login_returns_tokens(self):
        response = self.client.post(self.url, {"username": "loginuser", "password": "StrongPass@123"})
        assert response.status_code == 200
        assert 'access' in response.data
        assert 'refresh' in response.data
        assert response.data['role'] == 'user'

    def test_wrong_password_rejected(self):
        response = self.client.post(self.url, {"username": "loginuser", "password": "WrongPass"})
        assert response.status_code == 401

    def test_nonexistent_user_rejected(self):
        response = self.client.post(self.url, {"username": "ghost", "password": "whatever"})
        assert response.status_code == 401