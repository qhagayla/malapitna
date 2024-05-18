from django.db import models

class Client(models.Model):
    """
    Model representing a client.
    
    Attributes:
        name (str): The name of the client.
        age (int): The age of the client.
        birthdate (date): The birthdate of the client.
        date_of_assessment (date): The date of assessment for the client.
        gender (str): The gender of the client. Choices are 'M' for Male, 'F' for Female, 'O' for Other.
        grade_level (str): The grade level of the client.
    """
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    birthdate = models.DateField()
    date_of_assessment = models.DateField()
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female')
    ]
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    grade_level = models.CharField(max_length=20)

    def __str__(self):
        """
        Returns the string representation of the client.
        """
        return self.name
