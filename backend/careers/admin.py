from django.contrib import admin
from .models import SavedCareer, Appointment, AssessmentResult, SkillProgress, CareerRoadmap

admin.site.register(SavedCareer)
admin.site.register(Appointment)
admin.site.register(AssessmentResult)
admin.site.register(SkillProgress)
admin.site.register(CareerRoadmap)
