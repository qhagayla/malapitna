from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Video
from .serializers import VideoSerializer, VideoUploadSerializer, VideoDeleteSerializer, VideoUploadProSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class VideoListView(APIView):
    """
    API view for listing and uploading videos.
    """
    def get(self, request):
        """
        Handles GET request to retrieve a list of all videos.
        """
        movement_type = request.GET.get('movement_type', 'all')
        if movement_type == 'all':
            videos = Video.objects.all().order_by('-upload_date')  # Order by upload date in descending order
        else:
            videos = Video.objects.filter(movement_type=movement_type).order_by('-upload_date')
        serializer = VideoSerializer(videos, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        """
        Handles POST request to upload a new video.
        """
        serializer = VideoUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VideoDetailView(APIView):
    """
    API view for retrieving and deleting a single video.
    """
    def get(self, request, pk):
        """
        Handles GET request to retrieve a single video by its primary key.
        """
        video = Video.objects.get(pk=pk)
        serializer = VideoSerializer(video, context={'request': request})
        return Response(serializer.data)

    def delete(self, request, pk):
        """
        Handles DELETE request to delete a single video by its primary key.
        """
        video = Video.objects.get(pk=pk)
        video.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class VideoDeleteView(APIView):
    """
    API view for deleting a video by its ID.
    """
    def post(self, request):
        """
        Handles POST request to delete a video by its ID.
        """
        serializer = VideoDeleteSerializer(data=request.data)
        if serializer.is_valid():
            video_id = serializer.validated_data['id']
            video = Video.objects.get(pk=video_id)
            video.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class VideoUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = VideoUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class VideoUploadProView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = VideoUploadProSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
