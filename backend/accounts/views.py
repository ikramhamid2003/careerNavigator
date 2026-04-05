from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model, authenticate
from .models import UserProfile
from .serializers import RegisterSerializer, UserSerializer, UpdateProfileSerializer
import io

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user':   UserSerializer(user).data,
            'tokens': {
                'access':  str(refresh.access_token),
                'refresh': str(refresh),
            }
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email    = request.data.get('email', '').strip().lower()
        password = request.data.get('password', '')

        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=400)

        user = None
        try:
            u = User.objects.get(email=email)
            user = authenticate(request, username=u.username, password=password)
        except User.DoesNotExist:
            pass

        if not user:
            return Response({'error': 'Invalid email or password.'}, status=401)

        if not user.is_active:
            return Response({'error': 'Account is disabled.'}, status=403)

        refresh = RefreshToken.for_user(user)
        return Response({
            'user':   UserSerializer(user).data,
            'tokens': {
                'access':  str(refresh.access_token),
                'refresh': str(refresh),
            }
        })


class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
        except Exception:
            pass
        return Response({'message': 'Logged out.'})


class MeView(APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def patch(self, request):
        serializer = UpdateProfileSerializer(
            request.user, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(UserSerializer(request.user).data)


class ResumeUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    SKILL_KEYWORDS = [
        'python','java','javascript','typescript','c++','c#','golang','rust','php','ruby','swift','kotlin','dart',
        'react','angular','vue','nextjs','nodejs','django','flask','fastapi','spring','laravel','html','css',
        'machine learning','deep learning','tensorflow','pytorch','scikit-learn','pandas','numpy',
        'sql','nosql','mongodb','postgresql','mysql','redis','spark','kafka','tableau','power bi','excel',
        'aws','azure','gcp','docker','kubernetes','jenkins','ci/cd','terraform','ansible','linux','git',
        'flutter','react native','android','ios',
        'leadership','communication','teamwork','problem solving','project management','agile','scrum',
        'accounting','taxation','audit','legal','research','teaching','design','photoshop','figma','autocad',
        'matlab','statistics','finance','marketing','sales','hr','recruitment',
    ]

    def post(self, request):
        file_obj = request.FILES.get('resume')
        if not file_obj:
            return Response({'error': 'No file uploaded.'}, status=400)

        if not file_obj.name.lower().endswith('.pdf'):
            return Response({'error': 'Only PDF files are accepted.'}, status=400)

        pdf_bytes = file_obj.read()
        text = ''

        # pdfplumber
        try:
            import pdfplumber
            with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
                for page in pdf.pages:
                    extracted = page.extract_text(x_tolerance=3, y_tolerance=3) or page.extract_text() or ''
                    text += extracted + '\n'
        except Exception:
            pass

        # PyPDF2 fallback
        if not text.strip():
            try:
                import PyPDF2
                reader = PyPDF2.PdfReader(io.BytesIO(pdf_bytes))
                for page in reader.pages:
                    text += (page.extract_text() or '') + '\n'
            except Exception:
                pass

        if not text.strip():
            return Response({
                'error': (
                    'Could not extract text from this PDF. '
                    'Make sure it is a text-based PDF (not a scanned image). '
                    'Open the PDF and press Ctrl+A — if text highlights blue it will work. '
                    'If not, export from Word/Google Docs as PDF instead.'
                )
            }, status=400)

        text_lower    = text.lower()
        found_skills  = [s for s in self.SKILL_KEYWORDS if s in text_lower]
        word_count    = len(text.split())
        clean_text    = text.strip()

        # Save to profile
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        file_obj.seek(0)
        profile.resume_file   = file_obj
        profile.resume_parsed = {
            'raw_text':     clean_text[:5000],
            'word_count':   word_count,
            'found_skills': found_skills,
            'char_count':   len(clean_text),
        }
        profile.save()

        # Return everything the frontend needs inside `parsed`
        return Response({
            'message': 'Resume uploaded and parsed successfully.',
            'parsed': {
                'raw_text':     clean_text[:5000],
                'word_count':   word_count,
                'found_skills': found_skills,
                'char_count':   len(clean_text),
                'text_preview': clean_text[:400] + ('…' if len(clean_text) > 400 else ''),
            }
        })
