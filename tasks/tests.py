from rest_framework.test import APITestCase
from django.urls import reverse
from tasks.views import TaskListView
from django.contrib.auth import get_user_model
from tasks.models import User, Tasks
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken



class TestTaskViews(APITestCase):
    def setUp(self):
        self.normal_user = User.objects.create_user(username="test_user", password="Pass@122")
        self.admin_user = User.objects.create_superuser(username="admin", password="Adminadmin@122")
        self.task_object = Tasks.objects.create(
            task="Test task",
            description="Good task",
            category="task_category",
            owner = self.normal_user
        )
        self.url_get = reverse("task_list")
        self.url_post = reverse("task_create")
        self.url_updateD = reverse("task_detail", kwargs={'pk': self.task_object.pk})

    def authenticate(self, user):
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")


    def test_get_object(self):
        self.authenticate(self.normal_user)
        response = self.client.get(self.url_get)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["task"], self.task_object.task)

    def test_post_object(self):
        self.authenticate(self.normal_user)
        data = {
        "task": "New task",
        "description": "This is a test task",
        "category": "test_category"
        }
        response = self.client.post(self.url_post, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_object(self):
        self.authenticate(self.normal_user)
        data = {
            'task':"Test task",
            'description':"Good task, but this is also bad task",
            'category':"task_category" }
        response = self.client.put(self.url_updateD, data, format='json' )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["description"], data["description"])

    def test_delete_object(self):
        self.authenticate(self.normal_user)
        response = self.client.delete(self.url_updateD)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_admin_can_access_allobjects(self):
        self.authenticate(self.admin_user)
        response = self.client.get(self.url_get)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_get_fails(self):
        response = self.client.get(self.url_get)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthenticated_post_fails(self):
        data = {
            "task": "New task",
            "description": "This is a test task",
            "category": "test_category"
        }
        response = self.client.post(self.url_post, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthenticated_put_fails(self):
        modified_data = {
            'task': "Test task",
            'description': "Good task, but this is also bad task",
            'category': "task_category"
        }
        response = self.client.put(self.url_updateD, modified_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        def test_create_task_missing_field(self):
            self.authenticate(self.normal_user)
            data = {"task": ""}  
            response = self.client.post(self.url_post, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
            self.assertIn("description", response.data)







        


    