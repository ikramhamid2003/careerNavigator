import requests
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SavedCareer, Appointment, SkillProgress, CareerRoadmap, AssessmentResult
from .serializers import (
    SavedCareerSerializer, AppointmentSerializer,
    SkillProgressSerializer, CareerRoadmapSerializer, AssessmentResultSerializer,
)
from ml_engine.career_data import ALL_CAREERS, STREAMS


# ── Saved Careers ──────────────────────────────────────────────────────────────
class SavedCareerListCreateView(generics.ListCreateAPIView):
    serializer_class = SavedCareerSerializer
    def get_queryset(self):
        return SavedCareer.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SavedCareerDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = SavedCareerSerializer
    def get_queryset(self):
        return SavedCareer.objects.filter(user=self.request.user)


# ── Appointments ───────────────────────────────────────────────────────────────
class AppointmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AppointmentSerializer
    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user)


# ── Skill Progress ─────────────────────────────────────────────────────────────
class SkillProgressListView(generics.ListCreateAPIView):
    serializer_class = SkillProgressSerializer
    def get_queryset(self):
        qs = SkillProgress.objects.filter(user=self.request.user)
        career = self.request.query_params.get('career')
        if career:
            qs = qs.filter(target_career=career)
        return qs
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SkillProgressDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SkillProgressSerializer
    def get_queryset(self):
        return SkillProgress.objects.filter(user=self.request.user)

class SkillProgressBulkView(APIView):
    """POST { career, skills: ['skill1', 'skill2'] } — bulk create to_learn entries"""
    def post(self, request):
        career = request.data.get('career', '')
        skills = request.data.get('skills', [])
        created = []
        for skill in skills:
            obj, _ = SkillProgress.objects.get_or_create(
                user=request.user, skill_name=skill, target_career=career,
                defaults={'status': 'to_learn'}
            )
            created.append(SkillProgressSerializer(obj).data)
        return Response({'created': len(created), 'skills': created})


# ── Roadmaps ───────────────────────────────────────────────────────────────────
class RoadmapListView(generics.ListCreateAPIView):
    serializer_class = CareerRoadmapSerializer
    def get_queryset(self):
        return CareerRoadmap.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RoadmapDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = CareerRoadmapSerializer
    def get_queryset(self):
        return CareerRoadmap.objects.filter(user=self.request.user)


# ── Assessment History Chart ───────────────────────────────────────────────────
class AssessmentHistoryChartView(APIView):
    def get(self, request):
        assessments = AssessmentResult.objects.filter(user=request.user).order_by('created_at')[:20]
        data = []
        for a in assessments:
            data.append({
                'date':       a.created_at.strftime('%d %b'),
                'career':     a.top_career,
                'confidence': round(a.confidence, 1),
                'all':        a.all_predictions[:3] if a.all_predictions else [],
            })
        return Response({'history': data, 'total': len(data)})


# ── Job Listings ───────────────────────────────────────────────────────────────
class JobListingsView(APIView):
    def get(self, request):
        career  = request.query_params.get('career', 'software engineer')
        country = request.query_params.get('country', 'in')

        # Adzuna free API — sign up at developer.adzuna.com
        # Falls back to mock data if not configured
        import os
        app_id  = os.environ.get('ADZUNA_APP_ID', '')
        app_key = os.environ.get('ADZUNA_APP_KEY', '')

        if app_id and app_key:
            try:
                url = f"https://api.adzuna.com/v1/api/jobs/{country}/search/1"
                params = {
                    'app_id':          app_id,
                    'app_key':         app_key,
                    'what':            career,
                    'results_per_page': 8,
                    'content-type':    'application/json',
                }
                res = requests.get(url, params=params, timeout=8)
                jobs = res.json().get('results', [])
                return Response({
                    'jobs': [{
                        'title':    j.get('title', ''),
                        'company':  j.get('company', {}).get('display_name', ''),
                        'location': j.get('location', {}).get('display_name', ''),
                        'salary':   f"₹{j.get('salary_min',0)/100000:.1f}L–{j.get('salary_max',0)/100000:.1f}L" if j.get('salary_min') else 'Not disclosed',
                        'url':      j.get('redirect_url', ''),
                        'posted':   j.get('created', '')[:10],
                    } for j in jobs],
                    'source': 'adzuna',
                    'career': career,
                })
            except Exception:
                pass

        # Mock data fallback
        MOCK = {
            'Software Engineer':  ['Google', 'Microsoft', 'Flipkart', 'Infosys', 'TCS'],
            'Data Scientist':     ['Amazon', 'Walmart Labs', 'Uber', 'Swiggy', 'Razorpay'],
            'AI/ML Engineer':     ['NVIDIA', 'Sarvam AI', 'Anthropic', 'OpenAI', 'Google'],
            'default':            ['Top MNCs', 'Indian Startups', 'PSUs', 'Consulting firms'],
        }
        companies = MOCK.get(career, MOCK['default'])
        mock_jobs = [
            {
                'title':    career,
                'company':  co,
                'location': 'Bangalore / Remote',
                'salary':   'Competitive',
                'url':      f'https://www.linkedin.com/jobs/search/?keywords={career.replace(" ", "+")}',
                'posted':   'Recently',
                'is_mock':  True,
            }
            for co in companies
        ]
        return Response({
            'jobs':   mock_jobs,
            'source': 'mock',
            'career': career,
            'note':   'Add ADZUNA_APP_ID and ADZUNA_APP_KEY to .env for real listings.',
        })


# ── Job Trends ─────────────────────────────────────────────────────────────────
class JobTrendsView(APIView):
    def get(self, request):
        career_name = request.query_params.get('career')
        stream_name = request.query_params.get('stream')
        GROWTH_ORDER = ['Explosive', 'Very High', 'High', 'Moderate', 'Stable', 'Low']
        GROWTH_SCORE = {g: 10 - i * 1.5 for i, g in enumerate(GROWTH_ORDER)}
        HIRING = {
            'Software Engineer':         ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Infosys'],
            'Data Scientist':            ['Amazon', 'Walmart Labs', 'Uber', 'Swiggy', 'Razorpay'],
            'AI/ML Engineer':            ['Google DeepMind', 'NVIDIA', 'Sarvam AI', 'Anthropic', 'Microsoft'],
            'Medical Doctor (MBBS/MD)':  ['Apollo', 'Fortis', 'AIIMS', 'Max Healthcare', 'Narayana'],
            'Chartered Accountant (CA)': ['Deloitte', 'EY', 'KPMG', 'PwC', 'Grant Thornton'],
            'Corporate Lawyer':          ['AZB & Partners', 'Cyril Amarchand', 'Khaitan & Co', 'J Sagar'],
        }

        def build(name, d):
            gr = d.get('growth_rate', 'Moderate')
            gs = GROWTH_SCORE.get(gr, 4)
            return {
                'career':          name,
                'stream':          d.get('stream', ''),
                'growth_rate':     gr,
                'growth_score':    round(gs, 1),
                'demand_score':    round(min(10, gs * 1.1), 1),
                'avg_salary_inr':  d.get('avg_salary_inr', 'N/A'),
                'avg_salary_usd':  d.get('avg_salary_usd', 'N/A'),
                'top_locations':   d.get('job_locations', [])[:5],
                'hiring_companies': HIRING.get(name, ['Various companies across India & globally']),
            }

        if career_name:
            if career_name not in ALL_CAREERS:
                return Response({'error': f'Career not found: {career_name}'}, status=404)
            return Response(build(career_name, ALL_CAREERS[career_name]))

        source = ALL_CAREERS
        if stream_name:
            source = {k: v for k, v in ALL_CAREERS.items() if v.get('stream') == stream_name}
        sorted_careers = sorted(
            source.items(),
            key=lambda x: GROWTH_ORDER.index(x[1].get('growth_rate', 'Moderate'))
        )[:15]
        return Response({
            'trends':        [build(n, d) for n, d in sorted_careers],
            'total_careers': len(ALL_CAREERS),
            'streams':       STREAMS,
        })
