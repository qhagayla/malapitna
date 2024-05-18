from django.urls import path
from . import views

urlpatterns = [
    path('', views.VideoListView.as_view(), name='video-list'),
    path('<int:pk>/', views.VideoDetailView.as_view(), name='video-detail'),
    path('delete/', views.VideoDeleteView.as_view(), name='video-delete'),  # Add the URL for deleting a video
    path('upload/', views.VideoUploadView.as_view(), name='video-upload'),
    path('upload-pro/', views.VideoUploadProView.as_view(), name='video-upload-pro')
]