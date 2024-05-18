from rest_framework import serializers
from .models import Video
from client_system.serializers import ClientSerializer
from client_system.models import Client

class VideoSerializer(serializers.ModelSerializer):
    """
    Serializer for the Video model.
    """
    video = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ['id', 'caption', 'video', 'upload_date', 'client_name', 'movement_type']

    def get_video(self, obj):
        """
        Returns the absolute URL of the video.
        """
        return self.context['request'].build_absolute_uri(obj.video.url)

    def get_client_name(self, obj):
        """
        Returns the name of the client associated with the video (if any).
        """
        if obj.client:
            client_serializer = ClientSerializer(obj.client)
            return client_serializer.data['name']
        else:
            return None

class VideoUploadSerializer(serializers.ModelSerializer):
    """
    Serializer for uploading a video.
    """
    class Meta:
        model = Video
        fields = ['caption', 'video', 'client', 'movement_type']

    def create(self, validated_data):
        video_file = validated_data.pop('video', None)
        instance = super().create(validated_data)
        if video_file:
            instance.video = video_file
            instance.save()
        return instance

class VideoUploadProSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(write_only=True, required=False)
    movement_type = serializers.CharField(write_only=True, required=False)
    """
    Serializer for uploading a video.
    """
    class Meta:
        model = Video
        fields = ['caption', 'video', 'client', 'client_name', 'movement_type']

    def create(self, validated_data):
        client_name = validated_data.pop('client_name', None)
        client = None
        if client_name:
            client, _ = Client.objects.get_or_create(name=client_name)
        validated_data['client'] = client

        movement_type = validated_data.pop('movement_type', None)  # Retrieve movement type from validated data
        if movement_type:  # Check if movement type is provided
            validated_data['movement_type'] = movement_type  # Set the movement type to the provided value
        print("Final Validated Data:", validated_data)

        video_file = validated_data.pop('video', None)
        instance = super().create(validated_data)
        if video_file:
            instance.video = video_file
            instance.save()
        return instance

class VideoDeleteSerializer(serializers.Serializer):
    """
    Serializer for deleting a video.
    """
    id = serializers.IntegerField()
