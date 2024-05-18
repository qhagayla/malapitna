from django.db import models
from django.utils import timezone
from video_system.models import Video

class Remark(models.Model):
    """
    Model representing a remark on a video.
    
    Attributes:
        video (ForeignKey): The video to which the remark belongs.
        text (str): The text content of the remark.
        created_at (datetime): The timestamp when the remark was created.
    """
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name='remarks')
    text = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)  # Default value set to current time

    def __str__(self):
        """
        Returns the string representation of the remark.
        """
        return f'Remark for {self.video.caption}'
