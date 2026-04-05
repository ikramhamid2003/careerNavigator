"""
python manage.py train_model
Trains the Career Navigator ML model and saves artifacts.
"""
from django.core.management.base import BaseCommand
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))


class Command(BaseCommand):
    help = "Train the Career Navigator ML model (53 careers, 10 streams)"

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING("Training Career Navigator ML Model..."))
        try:
            from ml_engine.ml_model import build_and_train
            acc = build_and_train()
            self.stdout.write(self.style.SUCCESS(f"Model trained successfully! Accuracy: {acc*100:.2f}%"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Training failed: {e}"))
            raise
