from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Remark
from .serializers import RemarkSerializer

class RemarkListView(APIView):
    """
    API view for listing and creating remarks.
    """
    def get(self, request):
        """
        Handles GET request to retrieve a list of all remarks.
        """
        remarks = Remark.objects.all()
        serializer = RemarkSerializer(remarks, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Handles POST request to create a new remark.
        """
        serializer = RemarkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RemarkDetailView(APIView):
    """
    API view for retrieving and deleting a single remark.
    """
    def get(self, request, pk):
        """
        Handles GET request to retrieve a single remark by its primary key.
        """
        remark = Remark.objects.get(pk=pk)
        serializer = RemarkSerializer(remark)
        return Response(serializer.data)

    def delete(self, request, pk):
        """
        Handles DELETE request to delete a single remark by its primary key.
        """
        remark = Remark.objects.get(pk=pk)
        remark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
