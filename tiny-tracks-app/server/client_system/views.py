from rest_framework import generics
from .models import Client
from .serializers import ClientSerializer

class ClientListCreate(generics.ListCreateAPIView):
    """
    API view for listing and creating clients.
    """
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ClientRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    """
    API view for retrieving, updating, and deleting a client.
    """
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
