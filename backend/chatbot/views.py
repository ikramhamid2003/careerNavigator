import json
import logging
from django.conf import settings
from django.http import StreamingHttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from groq import Groq

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are Career Navigator AI — an expert career counselor specializing in Indian and global job markets.
You have deep knowledge of Technology, Engineering, Medical, Business, Law, Arts, Education, Science, Government, and Media careers.
For Indian students always provide: entrance exams (JEE/NEET/CAT/UPSC/GATE/CLAT), Indian salary in LPA, top Indian companies, free resources (NPTEL, Swayam).
Be warm, encouraging, specific, and practical."""


def get_client():
    key = settings.GROQ_API_KEY
    if not key:
        raise ValueError("GROQ_API_KEY not set")
    return Groq(api_key=key)


# ── Standard chat ──────────────────────────────────────────────────────────────
class ChatMessageView(APIView):
    def post(self, request):
        message = request.data.get('message', '').strip()
        history = request.data.get('history', [])
        if not message:
            return Response({'error': 'Message required.'}, status=400)
        try:
            client = get_client()
        except ValueError as e:
            return Response({'error': str(e)}, status=503)

        messages = [{'role': 'system', 'content': SYSTEM_PROMPT}]
        for t in history[-10:]:
            if t.get('role') in ('user', 'assistant') and t.get('content'):
                messages.append({'role': t['role'], 'content': t['content']})
        messages.append({'role': 'user', 'content': message})

        try:
            res = client.chat.completions.create(
                model='llama-3.3-70b-versatile',
                messages=messages,
                max_tokens=1024,
                temperature=0.7,
            )
            return Response({'reply': res.choices[0].message.content})
        except Exception as e:
            logger.error(f"Groq error: {e}")
            return Response({'error': 'AI service unavailable.'}, status=503)


# ── SSE Streaming chat ─────────────────────────────────────────────────────────
class ChatStreamView(APIView):
    def post(self, request):
        message = request.data.get('message', '').strip()
        history = request.data.get('history', [])
        if not message:
            return Response({'error': 'Message required.'}, status=400)
        try:
            client = get_client()
        except ValueError as e:
            return Response({'error': str(e)}, status=503)

        messages = [{'role': 'system', 'content': SYSTEM_PROMPT}]
        for t in history[-10:]:
            if t.get('role') in ('user', 'assistant') and t.get('content'):
                messages.append({'role': t['role'], 'content': t['content']})
        messages.append({'role': 'user', 'content': message})

        def event_stream():
            try:
                stream = client.chat.completions.create(
                    model='llama-3.3-70b-versatile',
                    messages=messages,
                    max_tokens=1024,
                    temperature=0.7,
                    stream=True,
                )
                for chunk in stream:
                    delta = chunk.choices[0].delta.content
                    if delta:
                        yield f"data: {json.dumps({'token': delta})}\n\n"
                yield "data: [DONE]\n\n"
            except Exception as e:
                yield f"data: {json.dumps({'error': str(e)})}\n\n"

        response = StreamingHttpResponse(event_stream(), content_type='text/event-stream')
        response['Cache-Control'] = 'no-cache'
        response['X-Accel-Buffering'] = 'no'
        return response


# ── Resume analysis ────────────────────────────────────────────────────────────
class ResumeAnalysisView(APIView):
    def post(self, request):
        resume_text   = request.data.get('resume_text', '').strip()
        target_career = request.data.get('target_career', '')

        if not resume_text:
            profile = getattr(request.user, 'profile', None)
            if profile and profile.resume_parsed:
                resume_text = profile.resume_parsed.get('raw_text', '')

        if not resume_text:
            return Response({'error': 'No resume text provided.'}, status=400)

        target_str = f" targeting **{target_career}**" if target_career else ""
        prompt = f"""Analyse this resume{target_str} and provide a detailed report with these exact sections:

## Overall Score
Give a score out of 100 with a 2-sentence justification.

## Strengths
3 specific bullet points about what's strong in this resume.

## Weaknesses / Gaps
3 specific improvements needed.

## ATS Optimisation Tips
3 concrete suggestions to improve ATS compatibility.

## Missing Keywords
List 5-8 important keywords missing for {target_career or 'software/tech roles'}.

## 90-Day Action Plan
3 concrete monthly milestones to improve career prospects.

Resume:
---
{resume_text[:3000]}
---"""

        try:
            client = get_client()
            res = client.chat.completions.create(
                model='llama-3.3-70b-versatile',
                messages=[
                    {'role': 'system', 'content': SYSTEM_PROMPT},
                    {'role': 'user',   'content': prompt},
                ],
                max_tokens=1500,
                temperature=0.5,
            )
            analysis = res.choices[0].message.content

            # Extract score
            score = None
            import re
            match = re.search(r'\b([0-9]{1,3})\s*/\s*100\b', analysis)
            if match:
                score = int(match.group(1))

            return Response({'analysis': analysis, 'score': score, 'target_career': target_career})
        except Exception as e:
            logger.error(f"Resume analysis error: {e}")
            return Response({'error': 'AI service unavailable.'}, status=503)


# ── AI Roadmap ─────────────────────────────────────────────────────────────────
class RoadmapView(APIView):
    def post(self, request):
        career        = request.data.get('career', '').strip()
        current_skills = request.data.get('current_skills', [])
        timeline_months = request.data.get('timeline_months', 6)

        if not career:
            return Response({'error': 'Career name required.'}, status=400)

        skills_str = ', '.join(current_skills) if current_skills else 'none specified'
        prompt = f"""Create a detailed {timeline_months}-month learning roadmap for someone targeting **{career}**.
Their current skills: {skills_str}

Respond ONLY with a valid JSON object in this exact format:
{{
  "career": "{career}",
  "timeline_months": {timeline_months},
  "overview": "2-sentence summary of the path",
  "phases": [
    {{
      "month": 1,
      "title": "Phase title",
      "focus": "Main focus area",
      "goals": ["goal 1", "goal 2", "goal 3"],
      "resources": [
        {{"name": "Resource name", "type": "course/book/practice", "url_hint": "platform name", "free": true}}
      ],
      "milestone": "What you should be able to do by end of this month"
    }}
  ],
  "final_outcome": "What you'll achieve after {timeline_months} months",
  "key_skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "certifications": ["cert1", "cert2"],
  "job_titles": ["title1", "title2", "title3"]
}}
Return ONLY the JSON, no markdown, no explanation."""

        try:
            client = get_client()
            res = client.chat.completions.create(
                model='llama-3.3-70b-versatile',
                messages=[{'role': 'user', 'content': prompt}],
                max_tokens=2000,
                temperature=0.3,
            )
            raw = res.choices[0].message.content.strip()
            # Strip markdown fences if present
            raw = raw.replace('```json', '').replace('```', '').strip()
            data = json.loads(raw)
            return Response(data)
        except json.JSONDecodeError:
            return Response({'error': 'AI returned invalid JSON. Try again.'}, status=500)
        except Exception as e:
            logger.error(f"Roadmap error: {e}")
            return Response({'error': 'AI service unavailable.'}, status=503)


# ── Career Comparison ──────────────────────────────────────────────────────────
class CareerCompareView(APIView):
    def post(self, request):
        careers = request.data.get('careers', [])
        if len(careers) < 2:
            return Response({'error': 'Provide at least 2 careers to compare.'}, status=400)
        if len(careers) > 4:
            careers = careers[:4]

        careers_str = ', '.join(careers)
        prompt = f"""Compare these careers for an Indian student: {careers_str}

Respond ONLY with valid JSON in this exact format:
{{
  "careers": [
    {{
      "name": "Career name",
      "stream": "stream name",
      "avg_salary_india": "X-Y LPA",
      "avg_salary_global": "$X-Y k",
      "growth_rate": "High/Moderate/etc",
      "difficulty_to_enter": "Easy/Moderate/Hard/Very Hard",
      "time_to_job_ready": "X months/years",
      "entrance_exams": ["exam1", "exam2"],
      "top_skills": ["skill1", "skill2", "skill3"],
      "pros": ["pro1", "pro2", "pro3"],
      "cons": ["con1", "con2", "con3"],
      "best_for": "Type of person this suits",
      "demand_score": 8,
      "salary_score": 7,
      "growth_score": 9,
      "work_life_score": 6
    }}
  ],
  "verdict": "1-2 sentence recommendation on which to choose and why",
  "comparison_table": {{
    "highest_salary": "career name",
    "fastest_growth": "career name",
    "easiest_entry": "career name",
    "best_work_life": "career name"
  }}
}}
Return ONLY the JSON."""

        try:
            client = get_client()
            res = client.chat.completions.create(
                model='llama-3.3-70b-versatile',
                messages=[{'role': 'user', 'content': prompt}],
                max_tokens=2000,
                temperature=0.3,
            )
            raw = res.choices[0].message.content.strip()
            raw = raw.replace('```json', '').replace('```', '').strip()
            data = json.loads(raw)
            return Response(data)
        except json.JSONDecodeError:
            return Response({'error': 'AI returned invalid JSON. Try again.'}, status=500)
        except Exception as e:
            logger.error(f"Compare error: {e}")
            return Response({'error': 'AI service unavailable.'}, status=503)
