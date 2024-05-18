import json

import pytest
from django.urls import reverse
from faker import Faker
from rest_framework import status
from rest_framework.test import APIClient

fake = Faker()
client = APIClient()


def payload():
    return {
        "first_name": fake.first_name(),
        "last_name": fake.last_name(),
        "email": fake.email(),
        "password": "password123!",
        "re_password": "password123!",
    }


@pytest.mark.django_db
@pytest.mark.parametrize("user_data", [pytest.param(payload())])
def test_register_and_login(user_data):
    # Register the user
    register_response = client.post(reverse("register"), user_data)

    # Assert registration success
    assert register_response.status_code == status.HTTP_201_CREATED
    data = json.loads(register_response.content)
    assert data.get("email") == user_data["email"]

    # Login the user
    login_response = client.post(
        reverse("login"),
        data={
            "email": user_data["email"],
            "password": user_data["password"],
        },
    )

    # Assert login success
    login_data = json.loads(login_response.content.decode("utf-8"))
    assert "access", "refresh" in login_data

    # Retrieve user profile
    profile_response = client.get(
        reverse("profile"),
        headers={"Authorization": f"Bearer {login_data['access']}"},
    )

    # Assert profile retrieval success
    assert profile_response.status_code == status.HTTP_200_OK
    profile_data = json.loads(profile_response.content)
    print(profile_data)
    assert profile_data.get("email") == user_data["email"]


@pytest.mark.django_db
@pytest.mark.parametrize("user_data", [pytest.param(payload())])
def test_register_and_login_user2(user_data):
    test_register_and_login(user_data)


@pytest.mark.django_db
@pytest.mark.parametrize("user_data", [pytest.param(payload())])
def test_register_and_login_user3(user_data):
    test_register_and_login(user_data)


@pytest.mark.django_db
@pytest.mark.parametrize("user_data", [pytest.param(payload())])
def test_register_and_login_user4(user_data):
    test_register_and_login(user_data)


@pytest.mark.django_db
@pytest.mark.parametrize("user_data", [pytest.param(payload())])
def test_register_and_login_user5(user_data):
    test_register_and_login(user_data)
