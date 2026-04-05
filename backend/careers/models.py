from django.db import models
from django.conf import settings


class AssessmentResult(models.Model):
    user           = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assessments')
    features       = models.JSONField()
    top_career     = models.CharField(max_length=100)
    confidence     = models.FloatField()
    all_predictions = models.JSONField(default=list)
    created_at     = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} → {self.top_career} ({self.confidence}%)"


class SavedCareer(models.Model):
    user        = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='saved_careers')
    career_name = models.CharField(max_length=100)
    notes       = models.TextField(blank=True)
    saved_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'career_name')
        ordering = ['-saved_at']

    def __str__(self):
        return f"{self.user.email} saved {self.career_name}"


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'), ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'), ('completed', 'Completed'),
    ]
    user           = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='appointments')
    counselor_name = models.CharField(max_length=100, default='Career Counselor')
    scheduled_at   = models.DateTimeField()
    reason         = models.TextField()
    status         = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes          = models.TextField(blank=True)
    created_at     = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-scheduled_at']

    def __str__(self):
        return f"{self.user.email} – {self.scheduled_at}"


class SkillProgress(models.Model):
    STATUS_CHOICES = [
        ('to_learn', 'To Learn'),
        ('learning', 'Learning'),
        ('learned',  'Learned'),
    ]
    user         = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='skill_progress')
    skill_name   = models.CharField(max_length=100)
    target_career = models.CharField(max_length=100, blank=True)
    status       = models.CharField(max_length=20, choices=STATUS_CHOICES, default='to_learn')
    notes        = models.TextField(blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'skill_name', 'target_career')
        ordering = ['status', 'skill_name']

    def __str__(self):
        return f"{self.user.email} — {self.skill_name} ({self.status})"


class CareerRoadmap(models.Model):
    user          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='roadmaps')
    career        = models.CharField(max_length=100)
    timeline_months = models.IntegerField(default=6)
    roadmap_data  = models.JSONField()
    created_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} roadmap → {self.career}"
