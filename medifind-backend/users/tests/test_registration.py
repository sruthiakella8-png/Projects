import pytest
from rest_framework.test import APIClient
from users.models import CustomUser

@pytest.mark.django_db
class TestRegistration:
    def setup_method(self):
        self.client = APIClient()
        self.url = '/api/register/'

    def test_successful_registration(self):
        data = {
            "username": "testuser1",
            "email": "test1@example.com",
            "phone": "9876543210",
            "password": "StrongPass@123",
            "role": "user"
        }
        response = self.client.post(self.url, data)
        assert response.status_code == 201
        assert CustomUser.objects.filter(username="testuser1").exists()

    def test_duplicate_email_rejected(self):
        CustomUser.objects.create_user(username="existing", email="dupe@example.com", phone="1111111111", password="Pass@1234")
        data = {"username": "newuser", "email": "dupe@example.com", "phone": "2222222222", "password": "StrongPass@123", "role": "user"}
        response = self.client.post(self.url, data)
        assert response.status_code == 400

    def test_weak_password_rejected(self):
        data = {"username": "weakpassuser", "email": "weak@example.com", "phone": "3333333333", "password": "123", "role": "user"}
        response = self.client.post(self.url, data)
        assert response.status_code == 400

    def test_missing_fields_rejected(self):
        response = self.client.post(self.url, {"username": "onlyusername"})
        assert response.status_code == 400