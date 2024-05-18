from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import User

class UserAdmin(BaseUserAdmin):
    ordering = ["email"] ## Specifies the default ordering of user instances in the admin interface
    add_form = CustomUserCreationForm ## Specifies the form to be used for adding new users
    form = CustomUserChangeForm ## Specifies the form to be used for editing existing users
    model = User ## Specifies the model to which this admin class applies, which is User.
    list_display = ["email", "first_name", "last_name", "is_staff", "is_active"] ## Specifies the fields to be displayed in the user list view
    list_display_links = ["email"] ## Specifies the fields to be linked to the change view in the user list view.
    list_filter = ["email", "first_name", "last_name", "is_staff", "is_active"] ## Specifies the fields to be used as filters in the user list view.
    search_fields = ["email", "first_name", "last_name"] ## Specifies the fields to be searched when performing a search in the user list view.
    fieldsets = ( ## Specifies the layout of form fieldsets in the user add form
        (
            _("Login Credentials"), {
                "fields": ("email", "password",)
            }, 
        ),
        (
            _("Personal Information"),
            {
                "fields": ('first_name', 'last_name',)
            },
        ),
        (
            _("Permissions and Groups"),
            {
                "fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")
            },
        ),
        (
            _("Important Dates"),
            {
                "fields": ("last_login",)
            },
        ),
    )
    add_fieldsets = (
            (None, {
                "classes": ("wide",),
                "fields": ("email", "first_name", "last_name", "password1", "password2", "is_staff", "is_active"),
            },),
        )


admin.site.register(User, UserAdmin)