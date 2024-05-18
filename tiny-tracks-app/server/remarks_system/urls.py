from django.urls import path
from . import views

urlpatterns = [
    path('', views.RemarkListView.as_view(), name='remark-list'),
    path('<int:pk>/', views.RemarkDetailView.as_view(), name='remark-detail'),
]