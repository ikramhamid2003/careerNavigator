from django.urls import path
from . import views

urlpatterns = [
    path('saved/',                    views.SavedCareerListCreateView.as_view(),  name='saved-careers'),
    path('saved/<int:pk>/',           views.SavedCareerDetailView.as_view(),      name='saved-career-detail'),
    path('appointments/',             views.AppointmentListCreateView.as_view(),  name='appointments'),
    path('appointments/<int:pk>/',    views.AppointmentDetailView.as_view(),      name='appointment-detail'),
    path('trends/',                   views.JobTrendsView.as_view(),              name='job-trends'),
    path('skills/',                   views.SkillProgressListView.as_view(),      name='skill-progress'),
    path('skills/<int:pk>/',          views.SkillProgressDetailView.as_view(),    name='skill-progress-detail'),
    path('skills/bulk/',              views.SkillProgressBulkView.as_view(),      name='skill-progress-bulk'),
    path('roadmaps/',                 views.RoadmapListView.as_view(),            name='roadmaps'),
    path('roadmaps/<int:pk>/',        views.RoadmapDetailView.as_view(),          name='roadmap-detail'),
    path('jobs/',                     views.JobListingsView.as_view(),            name='job-listings'),
    path('assessment-history-chart/', views.AssessmentHistoryChartView.as_view(), name='assessment-history-chart'),
]
