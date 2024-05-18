from rest_framework import serializers
from .models import Remark

class RemarkSerializer(serializers.ModelSerializer):
    """
    Serializer for the Remark model.
    """
    class Meta:
        model = Remark
        fields = ['id', 'video', 'text', 'created_at']
