from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth import get_user_model
from accounts.serializers import user_serializer

User = get_user_model()

class TestUserRegistration(APITestCase):
    def setUp(self):
        self.url = reverse('reg_list_create')
    def test_valid_user_creation(self):
        data = {"username": "ahmed", "password": "Pass@123"}
        serializer = user_serializer(data= data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

        user = serializer.save()
        self.assertEqual(user.username, "ahmed")
        self.assertTrue(user.check_password("Pass@123"))

    def test_username_not_lowercase(self):
        data = {"username": "Ahmed", "password": "Pass@123"}
        serializer = user_serializer(data= data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("Username should be all lowercase characters", str(serializer.errors))

    def test_password_too_short(self):
        data = {"username": "ahmed", "password": "abc"}
        serializer = user_serializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("Password must contain more than 6 characters", str(serializer.errors))

    def test_password_missing_number(self):
        data = {"username": "ahmed", "password": "Password@"}
        serializer = user_serializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("Password must atleast contain a single number", str(serializer.errors))

    def test_password_missing_special_char(self):
        data = {"username": "ahmed", "password": "Password1"}
        serializer = user_serializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("Password must atleast contain a special Character", str(serializer.errors))

    def test_password_write_only(self):
        serializer = user_serializer()
        self.assertTrue(serializer.fields["password"].write_only)

    def test_register_endpoint(self):
        data = {"username": "ahmed", "password": "Pass@123"}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


