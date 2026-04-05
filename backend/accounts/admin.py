from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserProfile


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    inlines = [UserProfileInline]
    list_display = ['email', 'username', 'first_name', 'last_name', 'is_staff', 'created_at']
    list_filter = ['is_staff', 'is_superuser', 'is_active', 'graduation_year']
    search_fields = ['email', 'username', 'first_name', 'last_name', 'college']
    ordering = ['-created_at']
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Extra Info', {'fields': ('phone', 'bio', 'college', 'graduation_year', 'current_gpa', 'linkedin_url', 'github_url', 'avatar')}),
    )


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'assessment_completed', 'last_assessment_date']
    list_filter = ['assessment_completed']
    search_fields = ['user__email']
