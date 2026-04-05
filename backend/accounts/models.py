from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    college = models.CharField(max_length=200, blank=True)
    graduation_year = models.IntegerField(null=True, blank=True)
    current_gpa = models.FloatField(null=True, blank=True)
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    groups = models.ManyToManyField(
        'auth.Group', related_name='accounts_user_set', blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission', related_name='accounts_user_set', blank=True
    )

    def __str__(self):
        return self.email


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    skills = models.JSONField(default=list)
    interests = models.JSONField(default=list)
    resume_file = models.FileField(upload_to='resumes/', null=True, blank=True)
    resume_parsed = models.JSONField(default=dict)
    assessment_completed = models.BooleanField(default=False)
    last_assessment_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.email}'s profile"