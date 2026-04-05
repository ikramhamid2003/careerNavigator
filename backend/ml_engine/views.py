from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .ml_model import predict_career, compute_skill_gap, load_model
from .career_data import FEATURE_NAMES, ALL_CAREERS, STREAMS, get_career_metadata
from careers.models import AssessmentResult
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)


class PredictCareerView(APIView):
    def post(self, request):
        features = request.data.get("features", {})
        missing = [f for f in FEATURE_NAMES if f not in features]
        if missing:
            return Response({"error": f"Missing features: {missing}"}, status=400)
        try:
            predictions = predict_career(features, top_n=5)
        except FileNotFoundError:
            return Response({"error": "Model not trained. Run: python manage.py train_model"}, status=503)
        except Exception as e:
            logger.error(f"Prediction error: {e}")
            return Response({"error": "Prediction failed."}, status=500)

        top = predictions[0]
        AssessmentResult.objects.create(
            user=request.user, features=features,
            top_career=top["career"], confidence=top["confidence"],
            all_predictions=predictions,
        )
        profile = getattr(request.user, "profile", None)
        if profile:
            profile.assessment_completed = True
            profile.last_assessment_date = timezone.now()
            profile.save()
        return Response({"predictions": predictions})


class SkillGapView(APIView):
    def post(self, request):
        features = request.data.get("features", {})
        target_career = request.data.get("target_career", "")
        if not target_career:
            return Response({"error": "target_career required."}, status=400)
        gaps = compute_skill_gap(features, target_career)
        metadata = get_career_metadata().get(target_career, {})
        return Response({"target_career": target_career, "skill_gaps": gaps, "courses": metadata.get("courses", []), "stream": metadata.get("stream", "")})


class CareerMetadataView(APIView):
    def get(self, request):
        career = request.query_params.get("career")
        stream = request.query_params.get("stream")
        meta = get_career_metadata()
        if career:
            item = meta.get(career)
            if not item:
                return Response({"error": "Career not found."}, status=404)
            return Response({career: item})
        if stream:
            return Response({k: v for k, v in meta.items() if v.get("stream") == stream})
        return Response(meta)


class StreamsListView(APIView):
    def get(self, request):
        stream_data = {}
        for stream in STREAMS:
            careers_in = [n for n, d in ALL_CAREERS.items() if d["stream"] == stream]
            stream_data[stream] = {"careers": careers_in, "count": len(careers_in)}
        return Response({"streams": stream_data, "total_careers": len(ALL_CAREERS)})


class AssessmentHistoryView(APIView):
    def get(self, request):
        results = AssessmentResult.objects.filter(user=request.user).order_by("-created_at")[:10]
        data = [{"id": r.id, "top_career": r.top_career, "confidence": r.confidence, "all_predictions": r.all_predictions, "created_at": r.created_at} for r in results]
        return Response({"results": data})


class ModelInfoView(APIView):
    def get(self, request):
        try:
            _, _, le, meta = load_model()
            return Response({"model_type": "Random Forest + Stacking Ensemble", "accuracy": meta.get("accuracy"), "features_count": len(meta.get("features", [])), "careers_count": meta.get("total_careers"), "careers": meta.get("careers", []), "streams": STREAMS})
        except FileNotFoundError:
            return Response({"error": "Model not trained yet."}, status=503)
