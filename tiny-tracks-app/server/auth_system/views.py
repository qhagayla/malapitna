# from django.contrib.auth import authenticate, login
from django.contrib.auth.models import update_last_login
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    profile_data = {
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "date_joined": user.date_joined,
    }
    return Response(profile_data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    current_password = request.data.get("current_password")
    new_password = request.data.get("new_password")

    if not user.check_password(current_password):
        return Response({"error": "Current password is incorrect."}, status=401)

    user.set_password(new_password)
    user.save()

    update_last_login(None, user)

    return Response({"success": "Password changed successfully."}, status=200)
