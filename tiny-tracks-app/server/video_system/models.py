from django.db import models
from django.utils import timezone
from client_system.models import Client  # Import the Client model

class Video(models.Model):
    """
    Model representing a video.
    
    Attributes:
        caption (str): The caption/title of the video.
        video (FileField): The file field to upload the video.
        upload_date (datetime): The timestamp when the video was uploaded.
        client (ForeignKey): The client associated with the video (optional).
        movement_type (str): The type of movement in the video.
    """
    RUN = 'run'
    GALLOP = 'gallop'
    HOP = 'hop'
    LEAP = 'leap'
    HORIZONTAL_JUMP = 'horizontal_jump'
    SLIDE = 'slide'
    SKIP = 'skip'
    
    MOVEMENT_CHOICES = [
        (RUN, 'Run'),
        (GALLOP, 'Gallop'),
        (HOP, 'Hop'),
        (LEAP, 'Leap'),
        (HORIZONTAL_JUMP, 'Horizontal Jump'),
        (SLIDE, 'Slide'),
        (SKIP, 'Skip'),
    ]
    
    caption = models.CharField(max_length=100)
    video = models.FileField(upload_to="videos/%Y/%m/%d")
    upload_date = models.DateTimeField(default=timezone.now)
    client = models.ForeignKey(Client, related_name='videos', on_delete=models.CASCADE, blank=True, null=True)  # Add blank and null attributes
    movement_type = models.CharField(max_length=20, choices=MOVEMENT_CHOICES, default=RUN)

    def __str__(self):
        """
        Returns the string representation of the video.
        """
        return self.caption
