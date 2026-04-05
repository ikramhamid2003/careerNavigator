from rest_framework import serializers
from .models import SavedCareer, Appointment, AssessmentResult, SkillProgress, CareerRoadmap


class AssessmentResultSerializer(serializers.ModelSerializer):
    class Meta:
        model  = AssessmentResult
        fields = ['id', 'top_career', 'confidence', 'all_predictions', 'created_at']
        read_only_fields = fields


class SavedCareerSerializer(serializers.ModelSerializer):
    class Meta:
        model  = SavedCareer
        fields = ['id', 'career_name', 'notes', 'saved_at']
        read_only_fields = ['id', 'saved_at']


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Appointment
        fields = ['id', 'counselor_name', 'scheduled_at', 'reason', 'status', 'notes', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']

    def validate_scheduled_at(self, value):
        from django.utils import timezone
        if value < timezone.now():
            raise serializers.ValidationError('Cannot book an appointment in the past.')
        return value


class SkillProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model  = SkillProgress
        fields = ['id', 'skill_name', 'target_career', 'status', 'notes', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class CareerRoadmapSerializer(serializers.ModelSerializer):
    class Meta:
        model  = CareerRoadmap
        fields = ['id', 'career', 'timeline_months', 'roadmap_data', 'created_at']
        read_only_fields = ['id', 'created_at']
