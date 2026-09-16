import pytest
from rest_framework.test import APIClient
from users.models import CustomUser


@pytest.mark.django_db
class TestLogout:
    def setup_method(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(username="logoutuser", email="lo@example.com", phone="9999999999", password="Pass@123")
        login_response = self.client.post('/api/login/', {"username": "logoutuser", "password": "Pass@123"})
        self.access = login_response.data['access']
        self.refresh = login_response.data['refresh']

    def test_logout_blacklists_token(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access}')
        response = self.client.post('/api/auth/logout/', {"refresh": self.refresh})
        assert response.status_code == 205

        # Try refreshing with blacklisted token
        refresh_response = self.client.post('/api/auth/token/refresh/', {"refresh": self.refresh})
        assert refresh_response.status_code == 401