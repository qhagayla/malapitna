from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):

    def email_validator(self, email: str):  ## to validate email addresses.
        """Method to validate email address.

        Args:
            email (str): User's email address.

        Raises:
            ValueError: Raises value error when user did not provide email.
        """
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError(_("You must provide a valid email"))

    def create_user(
        self,
        first_name: str,
        last_name: str,
        email: str,
        password: str,
        **extra_fields,
    ):
        """Creates a new user with the given details.

        Args:
            first_name (str): The user's first name.
            last_name (str): The user's last name.
            email (str): The user's email address (used as username). This field is required.
            password (str): The user's password.
            extra_fields (dict, optional): A dictionary of additional fields to be passed to the User model constructor.
                Default empty dictionary.


        Raises ValueError when:
            - User does not submit first name.
            - User does not submit last name.
            - User does not submit email address.

        Returns:
            User: Returns new instance of user.
        """

        if not first_name:
            raise ValueError(_("Users must submit a first name."))

        if not last_name:
            raise ValueError(_("Users must submit a last name."))

        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError(_("Email address is required."))

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email,
            **extra_fields,
        )

        user.set_password(password)
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)

        user.save()

        return user

    def create_superuser(
        self,
        first_name,
        last_name,
        email,
        password,
        **extra_fields,
    ):
        """Creates a new superuser (admin user) with the given details.

        Raises ValueError when:
            - If `is_superuser` is not set to True in `extra_fields`.
            - If `is_staff` is not set to True in `extra_fields`.
            - If password is empty.
            - If email is not provided.

        Returns:
            User: Returns new instance of user with admin privileges.
        """

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superusers must have is_superuser=True"))

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superusers must have is_staff=True"))

        if not password:
            raise ValueError(_("Superusers must have a password"))

        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError(_("Email address is required"))

        user = self.create_user(
            first_name,
            last_name,
            email,
            password,
            **extra_fields,
        )

        user.save()

        return user
