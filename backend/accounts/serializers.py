from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'skills', 'interests',
            'resume_parsed', 'assessment_completed', 'last_assessment_date',
        ]
        read_only_fields = ['assessment_completed', 'last_assessment_date', 'resume_parsed']


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name',
            'phone', 'bio', 'college', 'graduation_year', 'current_gpa',
            'linkedin_url', 'github_url', 'avatar', 'created_at', 'profile',
        ]
        read_only_fields = ['id', 'email', 'created_at']


class RegisterSerializer(serializers.ModelSerializer):
    password  = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, label='Confirm password')

    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'password', 'password2']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': 'Passwords do not match.'})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UpdateProfileSerializer(serializers.ModelSerializer):
    """Allows updating both User and UserProfile in one call."""
    skills       = serializers.ListField(child=serializers.CharField(), required=False)
    interests    = serializers.ListField(child=serializers.CharField(), required=False)
    certifications = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'phone', 'bio',
            'college', 'graduation_year', 'current_gpa',
            'linkedin_url', 'github_url',
            'skills', 'interests', 'certifications',
        ]

    def update(self, instance, validated_data):
        profile_fields = ['skills', 'interests', 'certifications']
        profile_data   = {k: validated_data.pop(k) for k in profile_fields if k in validated_data}

        for attr, val in validated_data.items():
            setattr(instance, attr, val)
        instance.save()

        if profile_data and hasattr(instance, 'profile'):
            for attr, val in profile_data.items():
                setattr(instance.profile, attr, val)
            instance.profile.save()

        return instance