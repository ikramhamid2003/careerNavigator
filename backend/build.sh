#!/usr/bin/env bash
# Render build script
set -o errexit

pip install -r requirements.txt

# Train ML model (creates model artifacts)
python -m ml_engine.ml_model

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py makemigrations accounts
python manage.py makemigrations careers
python manage.py makemigrations ml_engine
python manage.py makemigrations chatbot
python manage.py migrate
