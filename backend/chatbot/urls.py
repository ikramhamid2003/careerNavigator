from django.urls import path
from . import views

urlpatterns = [
    path('message/',        views.ChatMessageView.as_view(),    name='chat-message'),
    path('stream/',         views.ChatStreamView.as_view(),     name='chat-stream'),
    path('analyze-resume/', views.ResumeAnalysisView.as_view(), name='analyze-resume'),
    path('roadmap/',        views.RoadmapView.as_view(),        name='roadmap'),
    path('compare/',        views.CareerCompareView.as_view(),  name='career-compare'),
]
