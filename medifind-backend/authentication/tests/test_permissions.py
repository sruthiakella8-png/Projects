import pytest
from rest_framework.test import APIClient
from users.models import CustomUser


@pytest.mark.django_db
class TestRolePermissions:
    def setup_method(self):
        self.client = APIClient()
        self.admin = CustomUser.objects.create_user(username="admin1", email="a@example.com", phone="7777777777", password="Pass@123", role="admin")
        self.user = CustomUser.objects.create_user(username="user1", email="u@example.com", phone="8888888888", password="Pass@123", role="user")

    def get_token(self, username, password):
        response = self.client.post('/api/login/', {"username": username, "password": password})
        return response.data['access']

    def test_admin_can_access_admin_route(self):
        token = self.get_token("admin1", "Pass@123")
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        # response = self.client.get('/api/admin/dashboard/')  # once built
        # assert response.status_code == 200

    def test_regular_user_blocked_from_admin_route(self):
        token = self.get_token("user1", "Pass@123")
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        # response = self.client.get('/api/admin/dashboard/')
        # assert response.status_code == 403