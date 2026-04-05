"""
ml_model.py — Paper 2 Edition
==============================
7-model Stacked Ensemble Learning
KNN + RF + ExtraTrees + GradientBoosting + XGBoost + SVM → Logistic Regression
105 careers × 43 psychometric features
Ikram Hamid P.K. et al., Aalim Muhammed Salegh College
"""
import json
import numpy as np
import joblib
from pathlib import Path
from sklearn.ensemble import (
    RandomForestClassifier, GradientBoostingClassifier,
    StackingClassifier, ExtraTreesClassifier
)
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, classification_report
from xgboost import XGBClassifier
import warnings
warnings.filterwarnings("ignore")

from ml_engine.career_data import (
    FEATURE_NAMES, ALL_CAREERS, CAREER_NAMES,
    get_career_profiles, get_career_metadata
)

MODEL_DIR = Path(__file__).parent / "models"
N_SAMPLES  = 200   # synthetic samples per career


# ─── Synthetic Dataset ────────────────────────────────────────────────────────

def generate_dataset():
    np.random.seed(42)
    X, y = [], []
    profiles = get_career_profiles()

    for career, vec in profiles.items():
        vec = np.array(vec, dtype=float)
        for _ in range(N_SAMPLES):
            noise = np.random.normal(0, 0.07, len(vec))
            sample = vec + noise
            # Clip 0-1 features
            sample[:35] = np.clip(sample[:35], 0.0, 1.0)
            # Academic counts
            sample[35] = np.clip(sample[35], 0.0, 1.0)   # gpa
            sample[36] = max(0, round(float(sample[36])))  # projects
            sample[37] = max(0, round(float(sample[37])))  # internships
            sample[38] = max(0, round(float(sample[38])))  # certifications
            sample[39] = max(0, round(float(sample[39])))  # extracurriculars
            sample[40] = max(0, round(float(sample[40])))  # competitive_exams
            sample[41] = max(0, round(float(sample[41])))  # publications
            sample[42] = max(0, round(float(sample[42])))  # work_experience
            X.append(sample)
            y.append(career)

    return np.array(X), np.array(y)


# ─── Build & Train ────────────────────────────────────────────────────────────

def build_and_train():
    print(f"Generating dataset ({len(ALL_CAREERS)} careers × {N_SAMPLES} samples)…")
    X, y = generate_dataset()
    print(f"Dataset shape: {X.shape}")

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    le = LabelEncoder()
    y_enc = le.fit_transform(y)

    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y_enc, test_size=0.2, random_state=42, stratify=y_enc
    )

    # ── 6 Base Models + Logistic Regression Meta-Learner (Paper 2 exact) ──
    print("Training 7-model Stacked Ensemble (Paper 2 architecture)…")
    print("  Base models: KNN + Random Forest + Extra Trees + Gradient Boosting + XGBoost + SVM")
    print("  Meta-learner: Logistic Regression")

    base_models = [
        ("knn", KNeighborsClassifier(n_neighbors=7, metric="euclidean")),
        ("rf",  RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1, max_features="sqrt")),
        ("et",  ExtraTreesClassifier(n_estimators=200, random_state=42, n_jobs=-1)),
        ("gb",  GradientBoostingClassifier(n_estimators=150, learning_rate=0.1, max_depth=5, random_state=42)),
        ("xgb", XGBClassifier(n_estimators=200, learning_rate=0.1, max_depth=6, random_state=42,
                               eval_metric="mlogloss", verbosity=0, use_label_encoder=False)),
        ("svm", SVC(kernel="rbf", C=10, gamma="scale", probability=True, random_state=42)),
    ]

    meta_learner = LogisticRegression(
        max_iter=1000, C=1.0, random_state=42, multi_class="multinomial"
    )

    stack = StackingClassifier(
        estimators=base_models,
        final_estimator=meta_learner,
        cv=5,
        stack_method="predict_proba",
        n_jobs=-1,
        passthrough=False,
    )

    stack.fit(X_train, y_train)

    y_pred = stack.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    print(f"\n✅ Stacked Ensemble Accuracy: {acc*100:.2f}%")
    print("\nPer-class Report:")
    print(classification_report(y_test, y_pred, target_names=le.classes_))

    # 5-fold cross-validation (as per Paper 2)
    print("Running 5-fold cross-validation…")
    cv_scores = cross_val_score(stack, X_scaled, y_enc, cv=5, scoring="accuracy", n_jobs=-1)
    print(f"CV Accuracy: {cv_scores.mean()*100:.2f}% ± {cv_scores.std()*100:.2f}%")

    # Save artifacts
    MODEL_DIR.mkdir(exist_ok=True)
    joblib.dump(stack,  MODEL_DIR / "stacking_model.pkl")
    joblib.dump(scaler, MODEL_DIR / "scaler.pkl")
    joblib.dump(le,     MODEL_DIR / "label_encoder.pkl")

    metadata = {
        "accuracy":       round(acc * 100, 2),
        "cv_accuracy":    round(cv_scores.mean() * 100, 2),
        "cv_std":         round(cv_scores.std() * 100, 2),
        "careers_count":  len(ALL_CAREERS),
        "features_count": len(FEATURE_NAMES),
        "features":       FEATURE_NAMES,
        "careers":        CAREER_NAMES,
        "streams":        sorted(set(d["stream"] for d in ALL_CAREERS.values())),
        "model_type":     "7-model Stacked Ensemble (KNN+RF+ET+GB+XGB+SVM → LR)",
        "paper":          "Ikram Hamid P.K. et al. — AMSCE Chennai",
    }
    with open(MODEL_DIR / "metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)

    print(f"✅ Model artifacts saved to {MODEL_DIR}")
    return stack, scaler, le


# ─── Load ─────────────────────────────────────────────────────────────────────

def load_model():
    model_path = MODEL_DIR / "stacking_model.pkl"
    if not model_path.exists():
        raise FileNotFoundError("Model not trained. Run: python -m ml_engine.ml_model")
    stack  = joblib.load(MODEL_DIR / "stacking_model.pkl")
    scaler = joblib.load(MODEL_DIR / "scaler.pkl")
    le     = joblib.load(MODEL_DIR / "label_encoder.pkl")
    return stack, scaler, le


# ─── Predict ──────────────────────────────────────────────────────────────────

def predict_career(features: dict, top_n: int = 5):
    stack, scaler, le = load_model()
    vec = np.array([features.get(f, 0.0) for f in FEATURE_NAMES], dtype=float).reshape(1, -1)
    vec_scaled = scaler.transform(vec)
    proba = stack.predict_proba(vec_scaled)[0]
    top_idx = np.argsort(proba)[::-1][:top_n]
    meta = get_career_metadata()
    results = []
    for idx in top_idx:
        name = le.classes_[idx]
        m = meta.get(name, {})
        results.append({
            "career":     name,
            "confidence": round(float(proba[idx]) * 100, 1),
            "stream":     m.get("stream", ""),
            "metadata":   m,
        })
    return results


# ─── Skill Gap ────────────────────────────────────────────────────────────────

def compute_skill_gap(user_features: dict, target_career: str):
    if target_career not in ALL_CAREERS:
        return []
    profile = ALL_CAREERS[target_career]["profile"]
    gaps = []
    for i, feat in enumerate(FEATURE_NAMES):
        user_val    = float(user_features.get(feat, 0.0))
        target_val  = float(profile[i])
        if target_val > user_val + 0.1:
            gaps.append({
                "feature":    feat,
                "user":       round(user_val, 2),
                "required":   round(target_val, 2),
                "gap":        round(target_val - user_val, 2),
            })
    return sorted(gaps, key=lambda x: x["gap"], reverse=True)


if __name__ == "__main__":
    build_and_train()