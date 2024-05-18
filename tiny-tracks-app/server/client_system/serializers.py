from rest_framework import serializers
from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    """
    Serializer for the Client model.
    """
    class Meta:
        model = Client
        fields = '__all__'
