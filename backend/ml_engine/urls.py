from django.urls import path
from . import views

urlpatterns = [
    path("predict/",   views.PredictCareerView.as_view(),    name="predict"),
    path("skill-gap/", views.SkillGapView.as_view(),         name="skill-gap"),
    path("careers/",   views.CareerMetadataView.as_view(),   name="career-metadata"),
    path("streams/",   views.StreamsListView.as_view(),      name="streams"),
    path("history/",   views.AssessmentHistoryView.as_view(), name="assessment-history"),
    path("model-info/", views.ModelInfoView.as_view(),       name="model-info"),
]
