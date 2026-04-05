"""
career_data.py — Paper 2 Edition
=================================
500+ career profiles across 15 streams
43 psychometric features (RIASEC + NEP 2020 aligned)
Ikram Hamid P.K. et al., Aalim Muhammed Salegh College of Engineering
"""

# ─── 43 Feature Names (RIASEC + Skills + Academic) ───────────────────────────
FEATURE_NAMES = [
    # --- Aptitude / Cognitive (8) ---
    "technical_aptitude",      # 0-1
    "analytical_thinking",     # 0-1
    "numerical_ability",       # 0-1
    "verbal_reasoning",        # 0-1
    "spatial_reasoning",       # 0-1
    "memory_retention",        # 0-1
    "problem_solving",         # 0-1
    "logical_reasoning",       # 0-1

    # --- RIASEC Personality (6) ---
    "riasec_realistic",        # 0-1 Doers — practical, hands-on
    "riasec_investigative",    # 0-1 Thinkers — analytical, intellectual
    "riasec_artistic",         # 0-1 Creators — imaginative, expressive
    "riasec_social",           # 0-1 Helpers — empathetic, cooperative
    "riasec_enterprising",     # 0-1 Persuaders — leadership, ambitious
    "riasec_conventional",     # 0-1 Organizers — detail, structured

    # --- Interpersonal / Soft Skills (7) ---
    "communication",           # 0-1
    "leadership",              # 0-1
    "teamwork",                # 0-1
    "empathy",                 # 0-1
    "creativity",              # 0-1
    "research_ability",        # 0-1
    "attention_to_detail",     # 0-1

    # --- Domain Knowledge (14) ---
    "programming",             # 0-1
    "mathematics",             # 0-1
    "biology_medicine",        # 0-1
    "law_studies",             # 0-1
    "design_arts",             # 0-1
    "data_analysis",           # 0-1
    "writing_language",        # 0-1
    "finance_economics",       # 0-1
    "science_lab",             # 0-1
    "engineering_core",        # 0-1
    "teaching_mentoring",      # 0-1
    "public_speaking",         # 0-1
    "social_skills",           # 0-1
    "business_acumen",         # 0-1

    # --- Academic / Experience (8) ---
    "gpa",                     # 0.0–1.0 (CGPA/10)
    "projects_count",          # 0–20
    "internships",             # 0–5
    "certifications",          # 0–15
    "extracurriculars",        # 0–10
    "competitive_exams",       # 0–5
    "publications",            # 0–10
    "work_experience",         # 0–5 years
]

assert len(FEATURE_NAMES) == 43, f"Expected 43 features, got {len(FEATURE_NAMES)}"

STREAMS = [
    "Technology", "Engineering", "Medical", "Business", "Law",
    "Arts", "Education", "Science", "Government", "Media",
    "Architecture", "Agriculture", "Sports", "Hospitality", "Finance"
]

# ─── Career Registry ──────────────────────────────────────────────────────────
# Feature vector order matches FEATURE_NAMES exactly (43 values)
# [tech, analyt, numer, verbal, spatial, memory, prob_solv, logical,
#  R, I, A, S, E, C,
#  comm, lead, team, empathy, creat, research, detail,
#  prog, math, bio, law, design, data, writing, finance, sci, eng, teach, speak, social, biz,
#  gpa, proj, intern, cert, extra, exam, pub, work,
#  stamina]

ALL_CAREERS = {

    # ════════════════════════════════════════════════════════
    # 💻 TECHNOLOGY (20 careers)
    # ════════════════════════════════════════════════════════

    "Software Engineer": {
        "stream": "Technology",
        "profile": [0.9, 0.9, 0.8, 0.6, 0.6, 0.7, 0.9, 0.9, 0.5, 0.9, 0.3, 0.4, 0.5, 0.6, 0.7, 0.6, 0.8, 0.4, 0.6, 0.7, 0.9, 0.95, 0.8, 0.1, 0.1, 0.3, 0.7, 0.5, 0.3, 0.4, 0.7, 0.3, 0.5, 0.5, 0.6, 0.75, 8, 2, 5, 4, 1, 1, 2],
        "description": "Design, build and maintain software applications and systems",
        "required_skills": ["Python","Java","Data Structures","Algorithms","Git","SQL"],
        "nice_to_have": ["System Design","Cloud","Docker","Kubernetes"],
        "avg_salary_inr": "6–25 LPA", "avg_salary_usd": "$70k–150k",
        "growth_rate": "Very High", "job_locations": ["Bangalore","Hyderabad","Pune","Chennai","Mumbai","Remote"],
        "courses": [{"name":"CS50 Harvard","url":"https://cs50.harvard.edu","free":True},{"name":"DSA - GeeksforGeeks","url":"https://geeksforgeeks.org","free":True}],
    },
    "Data Scientist": {
        "stream": "Technology",
        "profile": [0.85, 0.95, 0.95, 0.65, 0.5, 0.8, 0.9, 0.95, 0.4, 0.95, 0.4, 0.4, 0.5, 0.7, 0.65, 0.5, 0.7, 0.4, 0.6, 0.9, 0.9, 0.8, 0.95, 0.2, 0.1, 0.3, 0.95, 0.6, 0.5, 0.7, 0.5, 0.3, 0.4, 0.4, 0.6, 0.8, 7, 2, 6, 3, 1, 2, 2],
        "description": "Extract insights from large datasets using ML and statistical methods",
        "required_skills": ["Python","Machine Learning","Statistics","SQL","Data Visualization"],
        "nice_to_have": ["Deep Learning","Big Data","Spark","R"],
        "avg_salary_inr": "8–30 LPA", "avg_salary_usd": "$85k–160k",
        "growth_rate": "Explosive", "job_locations": ["Bangalore","Mumbai","Hyderabad","Delhi","Remote"],
        "courses": [{"name":"Fast.ai","url":"https://fast.ai","free":True},{"name":"Kaggle Learn","url":"https://kaggle.com/learn","free":True}],
    },
    "AI/ML Engineer": {
        "stream": "Technology",
        "profile": [0.95, 0.95, 0.95, 0.6, 0.5, 0.8, 0.95, 0.95, 0.4, 0.98, 0.4, 0.3, 0.5, 0.6, 0.6, 0.6, 0.7, 0.3, 0.7, 0.95, 0.9, 0.9, 0.95, 0.1, 0.1, 0.3, 0.95, 0.5, 0.4, 0.8, 0.6, 0.2, 0.4, 0.4, 0.5, 0.82, 8, 2, 7, 3, 1, 3, 2],
        "description": "Build and deploy machine learning models and AI systems",
        "required_skills": ["PyTorch","TensorFlow","Python","Linear Algebra","MLOps"],
        "nice_to_have": ["LLMs","Transformers","CUDA","Distributed Training"],
        "avg_salary_inr": "10–40 LPA", "avg_salary_usd": "$100k–200k",
        "growth_rate": "Explosive", "job_locations": ["Bangalore","Hyderabad","Remote","USA","UK"],
        "courses": [{"name":"deeplearning.ai","url":"https://deeplearning.ai","free":False},{"name":"Hugging Face Course","url":"https://huggingface.co/learn","free":True}],
    },
    "Cybersecurity Analyst": {
        "stream": "Technology",
        "profile": [0.85, 0.9, 0.7, 0.6, 0.5, 0.8, 0.9, 0.95, 0.6, 0.9, 0.3, 0.4, 0.5, 0.8, 0.6, 0.5, 0.7, 0.4, 0.5, 0.85, 0.95, 0.85, 0.7, 0.1, 0.1, 0.2, 0.7, 0.5, 0.3, 0.5, 0.7, 0.2, 0.4, 0.4, 0.5, 0.75, 5, 2, 7, 3, 2, 1, 2],
        "description": "Protect systems and networks from cyber threats and attacks",
        "required_skills": ["Network Security","Ethical Hacking","SIEM","Linux","Python"],
        "nice_to_have": ["CEH","CISSP","Penetration Testing","Cloud Security"],
        "avg_salary_inr": "7–28 LPA", "avg_salary_usd": "$75k–140k",
        "growth_rate": "Explosive", "job_locations": ["Bangalore","Hyderabad","Delhi","Mumbai","Remote"],
        "courses": [{"name":"TryHackMe","url":"https://tryhackme.com","free":True},{"name":"Cybrary","url":"https://cybrary.it","free":True}],
    },
    "Cloud Architect": {
        "stream": "Technology",
        "profile": [0.9, 0.9, 0.8, 0.65, 0.6, 0.75, 0.9, 0.9, 0.5, 0.9, 0.3, 0.4, 0.6, 0.75, 0.7, 0.7, 0.75, 0.3, 0.5, 0.8, 0.9, 0.85, 0.75, 0.1, 0.1, 0.3, 0.7, 0.5, 0.4, 0.5, 0.8, 0.3, 0.5, 0.5, 0.6, 0.8, 7, 3, 8, 3, 1, 1, 4],
        "description": "Design and manage cloud infrastructure and services at scale",
        "required_skills": ["AWS/Azure/GCP","Terraform","Docker","Kubernetes","Networking"],
        "nice_to_have": ["Multi-cloud","FinOps","Site Reliability Engineering"],
        "avg_salary_inr": "15–50 LPA", "avg_salary_usd": "$120k–200k",
        "growth_rate": "Explosive", "job_locations": ["Bangalore","Hyderabad","Remote","USA"],
        "courses": [{"name":"AWS Free Tier","url":"https://aws.amazon.com/free","free":True},{"name":"Google Cloud Skills Boost","url":"https://cloudskillsboost.google","free":True}],
    },
    "DevOps Engineer": {
        "stream": "Technology",
        "profile": [0.85, 0.85, 0.75, 0.6, 0.5, 0.75, 0.9, 0.85, 0.6, 0.85, 0.3, 0.4, 0.5, 0.8, 0.65, 0.55, 0.8, 0.3, 0.5, 0.75, 0.9, 0.85, 0.7, 0.1, 0.1, 0.2, 0.7, 0.5, 0.3, 0.4, 0.8, 0.3, 0.5, 0.4, 0.5, 0.75, 6, 2, 6, 3, 1, 1, 3],
        "description": "Bridge development and operations to enable CI/CD and automation",
        "required_skills": ["Linux","Docker","Kubernetes","Jenkins","Python/Bash"],
        "nice_to_have": ["GitOps","Ansible","Terraform","Prometheus"],
        "avg_salary_inr": "8–30 LPA", "avg_salary_usd": "$80k–150k",
        "growth_rate": "Very High", "job_locations": ["Bangalore","Hyderabad","Pune","Remote"],
        "courses": [{"name":"Linux Foundation Courses","url":"https://training.linuxfoundation.org","free":False},{"name":"KodeKloud","url":"https://kodekloud.com","free":False}],
    },
    "Full Stack Developer": {
        "stream": "Technology",
        "profile": [0.85, 0.85, 0.75, 0.65, 0.5, 0.7, 0.85, 0.85, 0.5, 0.85, 0.4, 0.4, 0.5, 0.7, 0.7, 0.5, 0.8, 0.4, 0.6, 0.7, 0.85, 0.9, 0.7, 0.1, 0.1, 0.5, 0.7, 0.5, 0.3, 0.3, 0.7, 0.3, 0.5, 0.4, 0.5, 0.72, 7, 2, 4, 4, 1, 1, 2],
        "description": "Build both frontend and backend of web applications end-to-end",
        "required_skills": ["React/Vue","Node.js","Python/Java","SQL","REST APIs"],
        "nice_to_have": ["TypeScript","GraphQL","Docker","AWS"],
        "avg_salary_inr": "6–22 LPA", "avg_salary_usd": "$65k–130k",
        "growth_rate": "High", "job_locations": ["Bangalore","Pune","Hyderabad","Remote"],
        "courses": [{"name":"The Odin Project","url":"https://theodinproject.com","free":True},{"name":"freeCodeCamp","url":"https://freecodecamp.org","free":True}],
    },
    "Mobile Developer": {
        "stream": "Technology",
        "profile": [0.85, 0.8, 0.7, 0.65, 0.6, 0.7, 0.85, 0.8, 0.5, 0.8, 0.5, 0.4, 0.5, 0.7, 0.65, 0.5, 0.75, 0.4, 0.65, 0.65, 0.85, 0.88, 0.65, 0.1, 0.1, 0.5, 0.6, 0.5, 0.3, 0.3, 0.6, 0.3, 0.5, 0.4, 0.5, 0.7, 6, 2, 4, 4, 1, 1, 2],
        "description": "Develop iOS and Android applications using native or cross-platform tools",
        "required_skills": ["Flutter/React Native","Swift/Kotlin","REST APIs","UI/UX basics"],
        "nice_to_have": ["Firebase","App Store Optimization","CI/CD for mobile"],
        "avg_salary_inr": "6–20 LPA", "avg_salary_usd": "$65k–130k",
        "growth_rate": "High", "job_locations": ["Bangalore","Hyderabad","Pune","Remote"],
        "courses": [{"name":"Flutter Dev","url":"https://flutter.dev/learn","free":True},{"name":"Android Developers","url":"https://developer.android.com/courses","free":True}],
    },
    "Embedded Systems Engineer": {
        "stream": "Technology",
        "profile": [0.9, 0.85, 0.85, 0.5, 0.7, 0.75, 0.9, 0.9, 0.8, 0.9, 0.3, 0.3, 0.4, 0.8, 0.5, 0.4, 0.7, 0.3, 0.5, 0.75, 0.95, 0.85, 0.85, 0.1, 0.1, 0.2, 0.6, 0.3, 0.2, 0.4, 0.9, 0.2, 0.4, 0.3, 0.4, 0.78, 6, 2, 5, 3, 2, 1, 2],
        "description": "Program microcontrollers and develop firmware for hardware systems",
        "required_skills": ["C/C++","RTOS","Microcontrollers","Assembly","PCB Design"],
        "nice_to_have": ["FPGA","IoT Protocols","ARM Architecture"],
        "avg_salary_inr": "5–18 LPA", "avg_salary_usd": "$60k–120k",
        "growth_rate": "High", "job_locations": ["Bangalore","Pune","Chennai","Hyderabad"],
        "courses": [{"name":"NPTEL Embedded Systems","url":"https://nptel.ac.in","free":True}],
    },
    "Game Developer": {
        "stream": "Technology",
        "profile": [0.85, 0.8, 0.7, 0.6, 0.8, 0.7, 0.85, 0.8, 0.6, 0.8, 0.8, 0.3, 0.5, 0.6, 0.6, 0.5, 0.7, 0.4, 0.9, 0.6, 0.8, 0.88, 0.75, 0.1, 0.1, 0.7, 0.5, 0.4, 0.3, 0.3, 0.6, 0.3, 0.4, 0.4, 0.4, 0.7, 8, 1, 3, 5, 1, 1, 2],
        "description": "Design and develop interactive video games for various platforms",
        "required_skills": ["Unity/Unreal","C#/C++","3D Math","Game Design","Physics"],
        "nice_to_have": ["Shader Programming","VR/AR","Networking for Games"],
        "avg_salary_inr": "4–18 LPA", "avg_salary_usd": "$55k–120k",
        "growth_rate": "High", "job_locations": ["Bangalore","Hyderabad","Pune","Remote"],
        "courses": [{"name":"Unity Learn","url":"https://learn.unity.com","free":True}],
    },
    "Blockchain Developer": {
        "stream": "Technology",
        "profile": [0.9, 0.9, 0.85, 0.6, 0.5, 0.8, 0.9, 0.95, 0.4, 0.95, 0.4, 0.3, 0.55, 0.75, 0.6, 0.5, 0.65, 0.3, 0.5, 0.85, 0.9, 0.9, 0.85, 0.1, 0.1, 0.3, 0.7, 0.4, 0.5, 0.5, 0.6, 0.2, 0.4, 0.3, 0.5, 0.78, 7, 2, 6, 3, 2, 2, 2],
        "description": "Build decentralized applications and smart contracts on blockchain platforms",
        "required_skills": ["Solidity","Ethereum","Web3.js","Cryptography","Smart Contracts"],
        "nice_to_have": ["DeFi","NFTs","Rust","Layer 2 Solutions"],
        "avg_salary_inr": "8–35 LPA", "avg_salary_usd": "$90k–180k",
        "growth_rate": "Very High", "job_locations": ["Remote","Bangalore","Hyderabad","Global"],
        "courses": [{"name":"CryptoZombies","url":"https://cryptozombies.io","free":True}],
    },
    "Product Manager": {
        "stream": "Technology",
        "profile": [0.7, 0.8, 0.7, 0.85, 0.5, 0.75, 0.85, 0.8, 0.3, 0.8, 0.5, 0.6, 0.85, 0.7, 0.9, 0.9, 0.85, 0.65, 0.7, 0.75, 0.8, 0.6, 0.65, 0.1, 0.1, 0.5, 0.8, 0.7, 0.7, 0.3, 0.5, 0.5, 0.8, 0.7, 0.85, 0.8, 5, 3, 4, 5, 2, 1, 3],
        "description": "Define product vision, roadmap and strategy while working with engineering and design",
        "required_skills": ["Product Strategy","Agile","User Research","Data Analytics","Stakeholder Management"],
        "nice_to_have": ["A/B Testing","SQL","OKRs","Market Research"],
        "avg_salary_inr": "12–40 LPA", "avg_salary_usd": "$100k–180k",
        "growth_rate": "Very High", "job_locations": ["Bangalore","Mumbai","Delhi","Hyderabad","Remote"],
        "courses": [{"name":"Product School","url":"https://productschool.com","free":False}],
    },
    "UI/UX Designer": {
        "stream": "Technology",
        "profile": [0.6, 0.7, 0.6, 0.75, 0.8, 0.65, 0.75, 0.7, 0.3, 0.7, 0.9, 0.6, 0.5, 0.6, 0.75, 0.5, 0.7, 0.65, 0.95, 0.7, 0.85, 0.5, 0.5, 0.1, 0.1, 0.95, 0.7, 0.65, 0.3, 0.2, 0.4, 0.5, 0.7, 0.6, 0.55, 0.72, 6, 2, 4, 5, 1, 1, 2],
        "description": "Design intuitive user interfaces and experiences for digital products",
        "required_skills": ["Figma","User Research","Wireframing","Prototyping","Design Systems"],
        "nice_to_have": ["Motion Design","HTML/CSS basics","Accessibility","Usability Testing"],
        "avg_salary_inr": "5–20 LPA", "avg_salary_usd": "$60k–120k",
        "growth_rate": "High", "job_locations": ["Bangalore","Mumbai","Hyderabad","Remote"],
        "courses": [{"name":"Google UX Design Certificate","url":"https://grow.google/certificates/ux-design","free":False},{"name":"Figma Learn","url":"https://figma.com/learn","free":True}],
    },
    "Data Engineer": {
        "stream": "Technology",
        "profile": [0.85, 0.9, 0.85, 0.6, 0.5, 0.75, 0.9, 0.9, 0.5, 0.9, 0.3, 0.3, 0.5, 0.75, 0.6, 0.5, 0.75, 0.3, 0.5, 0.85, 0.9, 0.85, 0.85, 0.1, 0.1, 0.2, 0.9, 0.5, 0.4, 0.5, 0.7, 0.3, 0.4, 0.4, 0.55, 0.78, 6, 2, 5, 3, 1, 1, 3],
        "description": "Build pipelines and infrastructure to collect, store and process large datasets",
        "required_skills": ["Python","SQL","Apache Spark","Airflow","Data Warehousing"],
        "nice_to_have": ["Kafka","dbt","Snowflake","Delta Lake"],
        "avg_salary_inr": "8–28 LPA", "avg_salary_usd": "$85k–155k",
        "growth_rate": "Explosive", "job_locations": ["Bangalore","Hyderabad","Pune","Remote"],
        "courses": [{"name":"DataTalks.Club DE Zoomcamp","url":"https://datatalks.club","free":True}],
    },
    "Network Engineer": {
        "stream": "Technology",
        "profile": [0.8, 0.8, 0.75, 0.6, 0.5, 0.75, 0.85, 0.85, 0.6, 0.85, 0.3, 0.4, 0.4, 0.8, 0.6, 0.5, 0.7, 0.3, 0.4, 0.7, 0.9, 0.75, 0.7, 0.1, 0.1, 0.2, 0.6, 0.4, 0.3, 0.4, 0.8, 0.2, 0.4, 0.4, 0.4, 0.72, 4, 2, 6, 3, 2, 1, 2],
        "description": "Design, implement and manage computer networks and infrastructure",
        "required_skills": ["Cisco","TCP/IP","Routing & Switching","Firewalls","Network Security"],
        "nice_to_have": ["SD-WAN","Cloud Networking","CCNP"],
        "avg_salary_inr": "4–18 LPA", "avg_salary_usd": "$55k–110k",
        "growth_rate": "Moderate", "job_locations": ["Bangalore","Chennai","Hyderabad","Mumbai"],
        "courses": [{"name":"Cisco NetAcad","url":"https://netacad.com","free":True}],
    },
    "QA Engineer": {
        "stream": "Technology",
        "profile": [0.75, 0.85, 0.7, 0.65, 0.4, 0.8, 0.85, 0.85, 0.4, 0.85, 0.3, 0.5, 0.4, 0.85, 0.65, 0.4, 0.75, 0.4, 0.4, 0.75, 0.95, 0.7, 0.65, 0.1, 0.1, 0.2, 0.65, 0.5, 0.3, 0.3, 0.5, 0.3, 0.5, 0.4, 0.4, 0.7, 5, 2, 4, 3, 1, 1, 2],
        "description": "Ensure software quality through manual and automated testing",
        "required_skills": ["Selenium","Pytest","JIRA","Test Planning","API Testing"],
        "nice_to_have": ["Cypress","Performance Testing","Security Testing"],
        "avg_salary_inr": "4–15 LPA", "avg_salary_usd": "$50k–100k",
        "growth_rate": "Moderate", "job_locations": ["Bangalore","Pune","Hyderabad","Chennai"],
        "courses": [{"name":"ISTQB Foundation","url":"https://istqb.org","free":False}],
    },
    "AR/VR Developer": {
        "stream": "Technology",
        "profile": [0.88, 0.82, 0.75, 0.6, 0.85, 0.7, 0.85, 0.82, 0.5, 0.85, 0.75, 0.35, 0.5, 0.65, 0.6, 0.5, 0.7, 0.4, 0.88, 0.65, 0.82, 0.88, 0.78, 0.1, 0.1, 0.75, 0.55, 0.4, 0.3, 0.3, 0.62, 0.3, 0.45, 0.4, 0.45, 0.72, 7, 2, 4, 5, 1, 1, 2],
        "description": "Build immersive augmented and virtual reality experiences",
        "required_skills": ["Unity","C#","3D Modeling","Spatial Computing","WebXR"],
        "nice_to_have": ["Apple Vision Pro","Meta Quest SDK","Shader Programming"],
        "avg_salary_inr": "6–25 LPA", "avg_salary_usd": "$70k–140k",
        "growth_rate": "Very High", "job_locations": ["Bangalore","Hyderabad","Remote","USA"],
        "courses": [{"name":"Unity XR","url":"https://learn.unity.com/pathway/vr-development","free":True}],
    },
    "Site Reliability Engineer": {
        "stream": "Technology",
        "profile": [0.88, 0.88, 0.8, 0.62, 0.52, 0.78, 0.92, 0.9, 0.55, 0.9, 0.3, 0.4, 0.55, 0.82, 0.65, 0.6, 0.78, 0.32, 0.48, 0.8, 0.92, 0.88, 0.75, 0.1, 0.1, 0.22, 0.72, 0.5, 0.35, 0.45, 0.82, 0.3, 0.48, 0.42, 0.55, 0.78, 6, 2, 7, 3, 1, 1, 4],
        "description": "Maintain reliability, scalability and performance of large-scale production systems",
        "required_skills": ["Linux","Go/Python","Kubernetes","Monitoring","Incident Management"],
        "nice_to_have": ["Chaos Engineering","SLO/SLA","Distributed Systems"],
        "avg_salary_inr": "15–45 LPA", "avg_salary_usd": "$120k–200k",
        "growth_rate": "Explosive", "job_locations": ["Bangalore","Hyderabad","Remote","USA"],
        "courses": [{"name":"Google SRE Book","url":"https://sre.google/books","free":True}],
    },
    "Prompt Engineer": {
        "stream": "Technology",
        "profile": [0.75, 0.85, 0.7, 0.9, 0.5, 0.78, 0.88, 0.85, 0.3, 0.9, 0.6, 0.5, 0.55, 0.7, 0.85, 0.5, 0.65, 0.45, 0.75, 0.9, 0.82, 0.7, 0.7, 0.1, 0.1, 0.4, 0.85, 0.8, 0.4, 0.5, 0.5, 0.4, 0.6, 0.5, 0.55, 0.75, 5, 1, 4, 4, 1, 2, 1],
        "description": "Design and optimize prompts for large language models and AI systems",
        "required_skills": ["LLMs","Python","NLP","Prompt Design","API Integration"],
        "nice_to_have": ["Fine-tuning","RAG","LangChain","Evaluation Frameworks"],
        "avg_salary_inr": "8–30 LPA", "avg_salary_usd": "$80k–160k",
        "growth_rate": "Explosive", "job_locations": ["Remote","Bangalore","Hyderabad","Global"],
        "courses": [{"name":"DeepLearning.AI Prompt Engineering","url":"https://deeplearning.ai","free":True}],
    },

    # ════════════════════════════════════════════════════════
    # ⚙️ ENGINEERING (10 careers)
    # ════════════════════════════════════════════════════════

    "Mechanical Engineer": {
        "stream": "Engineering",
        "profile": [0.85, 0.85, 0.85, 0.55, 0.85, 0.75, 0.9, 0.85, 0.9, 0.85, 0.3, 0.2, 0.4, 0.7, 0.55, 0.5, 0.75, 0.3, 0.5, 0.7, 0.85, 0.55, 0.9, 0.1, 0.1, 0.4, 0.5, 0.3, 0.3, 0.5, 0.95, 0.3, 0.4, 0.3, 0.5, 0.75, 5, 2, 4, 3, 2, 1, 2],
        "description": "Design and analyze mechanical systems, machines and thermal processes",
        "required_skills": ["CAD/SolidWorks","Thermodynamics","Strength of Materials","Manufacturing","FEA"],
        "nice_to_have": ["ANSYS","MATLAB","Six Sigma","Robotics"],
        "avg_salary_inr": "4–15 LPA", "avg_salary_usd": "$55k–110k",
        "growth_rate": "Moderate", "job_locations": ["Pune","Chennai","Bangalore","Mumbai"],
        "courses": [{"name":"NPTEL Mechanical","url":"https://nptel.ac.in","free":True}],
    },
    "Civil Engineer": {
        "stream": "Engineering",
        "profile": [0.8, 0.82, 0.82, 0.6, 0.82, 0.72, 0.85, 0.82, 0.88, 0.82, 0.25, 0.25, 0.45, 0.72, 0.6, 0.52, 0.72, 0.32, 0.42, 0.68, 0.85, 0.45, 0.85, 0.1, 0.1, 0.35, 0.48, 0.32, 0.32, 0.5, 0.92, 0.3, 0.42, 0.32, 0.48, 0.73, 5, 2, 4, 3, 2, 1, 2],
        "description": "Design and oversee construction of infrastructure — roads, bridges, buildings",
        "required_skills": ["AutoCAD","Structural Analysis","Project Management","Surveying","STAAD Pro"],
        "nice_to_have": ["BIM","GIS","Green Building","RERA knowledge"],
        "avg_salary_inr": "4–14 LPA", "avg_salary_usd": "$55k–100k",
        "growth_rate": "Moderate", "job_locations": ["Mumbai","Delhi","Chennai","Bangalore","Hyderabad"],
        "courses": [{"name":"NPTEL Civil Engineering","url":"https://nptel.ac.in","free":True}],
    },
    "Electronics/VLSI Engineer": {
        "stream": "Engineering",
        "profile": [0.9, 0.88, 0.88, 0.52, 0.75, 0.78, 0.9, 0.9, 0.85, 0.9, 0.25, 0.15, 0.38, 0.78, 0.5, 0.42, 0.7, 0.28, 0.48, 0.75, 0.92, 0.78, 0.9, 0.1, 0.1, 0.25, 0.62, 0.28, 0.25, 0.48, 0.92, 0.22, 0.38, 0.28, 0.42, 0.78, 6, 2, 5, 3, 2, 2, 2],
        "description": "Design integrated circuits, processors and electronic hardware systems",
        "required_skills": ["VHDL/Verilog","Digital Electronics","CMOS Design","Cadence","Signal Processing"],
        "nice_to_have": ["FPGA","Semiconductor Physics","DFT","Timing Analysis"],
        "avg_salary_inr": "5–20 LPA", "avg_salary_usd": "$70k–140k",
        "growth_rate": "High", "job_locations": ["Bangalore","Hyderabad","Chennai","Pune"],
        "courses": [{"name":"NPTEL VLSI","url":"https://nptel.ac.in","free":True}],
    },
    "Chemical Engineer": {
        "stream": "Engineering",
        "profile": [0.82, 0.85, 0.88, 0.52, 0.65, 0.72, 0.88, 0.85, 0.78, 0.88, 0.35, 0.15, 0.38, 0.72, 0.52, 0.42, 0.72, 0.28, 0.42, 0.78, 0.88, 0.45, 0.88, 0.15, 0.1, 0.25, 0.58, 0.28, 0.32, 0.55, 0.88, 0.25, 0.38, 0.28, 0.42, 0.75, 5, 2, 4, 3, 2, 1, 2],
        "description": "Design chemical processes and manufacturing plants for industry",
        "required_skills": ["Process Design","Thermodynamics","HAZOP","MATLAB","Safety Engineering"],
        "nice_to_have": ["Aspen Plus","Six Sigma","Environmental Engineering"],
        "avg_salary_inr": "4–14 LPA", "avg_salary_usd": "$55k–100k",
        "growth_rate": "Moderate", "job_locations": ["Mumbai","Gujarat","Chennai","Pune"],
        "courses": [{"name":"NPTEL Chemical Engineering","url":"https://nptel.ac.in","free":True}],
    },
    "Aerospace Engineer": {
        "stream": "Engineering",
        "profile": [0.92, 0.9, 0.92, 0.55, 0.88, 0.8, 0.92, 0.92, 0.88, 0.92, 0.25, 0.15, 0.38, 0.72, 0.52, 0.48, 0.72, 0.28, 0.52, 0.85, 0.92, 0.6, 0.92, 0.1, 0.1, 0.28, 0.62, 0.28, 0.28, 0.48, 0.95, 0.22, 0.38, 0.28, 0.42, 0.82, 6, 2, 5, 3, 2, 3, 2],
        "description": "Design and develop aircraft, spacecraft and related systems",
        "required_skills": ["CATIA","CFD","Aerodynamics","Structural Analysis","MATLAB"],
        "nice_to_have": ["ANSYS Fluent","Avionics","Propulsion Systems"],
        "avg_salary_inr": "5–22 LPA", "avg_salary_usd": "$70k–130k",
        "growth_rate": "High", "job_locations": ["Bangalore","Hyderabad","Chennai","Mumbai"],
        "courses": [{"name":"ISRO Online Courses","url":"https://isro.gov.in","free":True}],
    },
    "Biomedical Engineer": {
        "stream": "Engineering",
        "profile": [0.85, 0.85, 0.82, 0.58, 0.62, 0.75, 0.88, 0.85, 0.72, 0.88, 0.72, 0.18, 0.4, 0.72, 0.58, 0.48, 0.72, 0.42, 0.52, 0.82, 0.88, 0.62, 0.82, 0.18, 0.1, 0.28, 0.65, 0.32, 0.28, 0.58, 0.82, 0.28, 0.42, 0.38, 0.45, 0.78, 5, 2, 4, 3, 2, 2, 2],
        "description": "Apply engineering principles to solve medical and healthcare problems",
        "required_skills": ["Medical Devices","Signal Processing","Biomechanics","MATLAB","FDA Regulations"],
        "nice_to_have": ["3D Printing","AI in Healthcare","Regulatory Affairs"],
        "avg_salary_inr": "4–16 LPA", "avg_salary_usd": "$60k–120k",
        "growth_rate": "High", "job_locations": ["Bangalore","Hyderabad","Chennai","Mumbai"],
        "courses": [{"name":"MIT OpenCourseWare Bioengineering","url":"https://ocw.mit.edu","free":True}],
    },
    "Petroleum Engineer": {
        "stream": "Engineering",
        "profile": [0.85, 0.85, 0.88, 0.55, 0.72, 0.72, 0.88, 0.85, 0.85, 0.88, 0.25, 0.15, 0.42, 0.72, 0.55, 0.52, 0.72, 0.28, 0.42, 0.75, 0.88, 0.48, 0.88, 0.12, 0.1, 0.25, 0.55, 0.28, 0.45, 0.52, 0.92, 0.25, 0.38, 0.28, 0.48, 0.75, 5, 2, 4, 3, 2, 1, 2],
        "description": "Design methods for extracting oil and gas from beneath the earth",
        "required_skills": ["Reservoir Engineering","Drilling","PETREL","Fluid Mechanics","Well Logging"],
        "nice_to_have": ["Subsurface Modeling","HSE","Digital Oilfield"],
        "avg_salary_inr": "8–30 LPA", "avg_salary_usd": "$80k–150k",
        "growth_rate": "Moderate", "job_locations": ["Mumbai","Gujarat","Delhi","Middle East"],
        "courses": [{"name":"SPE e-Learning","url":"https://spe.org","free":False}],
    },
    "Environmental Engineer": {
        "stream": "Engineering",
        "profile": [0.78, 0.82, 0.78, 0.65, 0.68, 0.72, 0.82, 0.8, 0.72, 0.85, 0.38, 0.18, 0.42, 0.68, 0.65, 0.48, 0.75, 0.42, 0.52, 0.82, 0.85, 0.42, 0.78, 0.15, 0.1, 0.28, 0.62, 0.38, 0.32, 0.58, 0.82, 0.32, 0.45, 0.38, 0.45, 0.75, 5, 2, 4, 3, 2, 2, 2],
        "description": "Develop solutions to environmental problems like pollution and waste",
        "required_skills": ["Environmental Impact Assessment","Water Treatment","GIS","Environmental Law"],
        "nice_to_have": ["Remote Sensing","Climate Modeling","ESG Reporting"],
        "avg_salary_inr": "4–14 LPA", "avg_salary_usd": "$55k–100k",
        "growth_rate": "High", "job_locations": ["Delhi","Mumbai","Bangalore","Chennai"],
        "courses": [{"name":"NPTEL Environmental Engineering","url":"https://nptel.ac.in","free":True}],
    },
    "Robotics Engineer": {
        "stream": "Engineering",
        "profile": [0.92, 0.9, 0.88, 0.55, 0.82, 0.78, 0.92, 0.9, 0.85, 0.92, 0.45, 0.28, 0.42, 0.7, 0.55, 0.52, 0.75, 0.32, 0.65, 0.82, 0.92, 0.85, 0.9, 0.1, 0.1, 0.35, 0.68, 0.3, 0.28, 0.45, 0.92, 0.25, 0.4, 0.32, 0.45, 0.8, 7, 2, 5, 4, 2, 2, 2],
        "description": "Design, build and program robots and automated systems",
        "required_skills": ["ROS","Python/C++","Computer Vision","Control Systems","Kinematics"],
        "nice_to_have": ["Deep Learning","SLAM","Manipulation","Simulation"],
        "avg_salary_inr": "6–25 LPA", "avg_salary_usd": "$75k–150k",
        "growth_rate": "Explosive", "job_locations": ["Bangalore","Hyderabad","Pune","Remote"],
        "courses": [{"name":"ROS Tutorials","url":"https://ros.org","free":True}],
    },
    "Industrial Engineer": {
        "stream": "Engineering",
        "profile": [0.78, 0.82, 0.82, 0.62, 0.68, 0.75, 0.85, 0.82, 0.78, 0.82, 0.22, 0.22, 0.52, 0.78, 0.62, 0.58, 0.75, 0.32, 0.45, 0.72, 0.88, 0.5, 0.82, 0.1, 0.1, 0.28, 0.62, 0.32, 0.38, 0.48, 0.88, 0.3, 0.42, 0.35, 0.55, 0.75, 5, 2, 4, 3, 2, 1, 2],
        "description": "Optimize complex systems, processes and organizations for efficiency",
        "required_skills": ["Operations Research","Lean/Six Sigma","Simulation","Statistics","Supply Chain"],
        "nice_to_have": ["ERP Systems","Industry 4.0","Python for Operations"],
        "avg_salary_inr": "4–16 LPA", "avg_salary_usd": "$58k–110k",
        "growth_rate": "Moderate", "job_locations": ["Pune","Chennai","Bangalore","Mumbai"],
        "courses": [{"name":"NPTEL Industrial Engineering","url":"https://nptel.ac.in","free":True}],
    },

    # ════════════════════════════════════════════════════════
    # 🏥 MEDICAL (12 careers)
    # ════════════════════════════════════════════════════════

    "Medical Doctor (MBBS/MD)": {
        "stream": "Medical",
        "profile": [0.75, 0.85, 0.75, 0.8, 0.7, 0.9, 0.88, 0.85, 0.4, 0.9, 0.3, 0.95, 0.6, 0.7, 0.85, 0.75, 0.8, 0.95, 0.5, 0.9, 0.92, 0.3, 0.7, 0.95, 0.1, 0.3, 0.65, 0.6, 0.3, 0.95, 0.5, 0.65, 0.85, 0.55, 0.5, 0.85, 3, 1, 5, 4, 5, 2, 2],
        "description": "Diagnose and treat patients across all areas of medicine",
        "required_skills": ["Clinical Medicine","Anatomy","Physiology","Pharmacology","Patient Care"],
        "nice_to_have": ["Research","Telemedicine","Medical Technology"],
        "avg_salary_inr": "8–50 LPA", "avg_salary_usd": "$100k–300k",
        "growth_rate": "High", "job_locations": ["Chennai","Delhi","Mumbai","Bangalore","All cities"],
        "courses": [{"name":"Medscape Education","url":"https://medscape.com/education","free":True}],
    },
    "Surgeon": {
        "stream": "Medical",
        "profile": [0.78, 0.85, 0.75, 0.78, 0.68, 0.88, 0.88, 0.85, 0.42, 0.9, 0.28, 0.98, 0.62, 0.72, 0.82, 0.78, 0.78, 0.92, 0.48, 0.88, 0.95, 0.28, 0.68, 0.98, 0.1, 0.28, 0.62, 0.58, 0.28, 0.92, 0.48, 0.62, 0.82, 0.52, 0.48, 0.88, 3, 1, 6, 3, 5, 2, 5],
        "description": "Perform surgical procedures to treat diseases, injuries and deformities",
        "required_skills": ["Surgical Techniques","Anatomy","Patient Management","MS/MCh degree"],
        "nice_to_have": ["Laparoscopy","Robotic Surgery","Research"],
        "avg_salary_inr": "15–80 LPA", "avg_salary_usd": "$150k–400k",
        "growth_rate": "High", "job_locations": ["Delhi","Mumbai","Chennai","Bangalore"],
        "courses": [{"name":"Coursera Medical Courses","url":"https://coursera.org","free":False}],
    },
    "Dentist": {
        "stream": "Medical",
        "profile": [0.72, 0.78, 0.68, 0.78, 0.58, 0.82, 0.82, 0.78, 0.38, 0.82, 0.32, 0.88, 0.58, 0.72, 0.82, 0.62, 0.72, 0.88, 0.48, 0.72, 0.88, 0.25, 0.62, 0.85, 0.1, 0.3, 0.52, 0.55, 0.28, 0.82, 0.42, 0.55, 0.82, 0.48, 0.45, 0.82, 3, 1, 5, 3, 4, 1, 2],
        "description": "Diagnose and treat conditions of teeth, gums and oral cavity",
        "required_skills": ["BDS/MDS","Clinical Dentistry","Oral Surgery","Patient Management"],
        "nice_to_have": ["Cosmetic Dentistry","Implantology","Digital Dentistry"],
        "avg_salary_inr": "5–25 LPA", "avg_salary_usd": "$80k–180k",
        "growth_rate": "Moderate", "job_locations": ["Mumbai","Delhi","Chennai","Bangalore"],
        "courses": [{"name":"DentalXP","url":"https://dentalxp.com","free":False}],
    },
    "Pharmacist": {
        "stream": "Medical",
        "profile": [0.72, 0.82, 0.75, 0.72, 0.48, 0.78, 0.82, 0.82, 0.35, 0.85, 0.25, 0.82, 0.52, 0.75, 0.72, 0.52, 0.72, 0.78, 0.42, 0.82, 0.88, 0.28, 0.78, 0.88, 0.1, 0.25, 0.62, 0.52, 0.35, 0.82, 0.42, 0.52, 0.72, 0.45, 0.45, 0.78, 3, 1, 5, 3, 3, 1, 2],
        "description": "Dispense medications and counsel patients on drug therapy",
        "required_skills": ["Pharmacology","Drug Interactions","Clinical Pharmacy","Patient Counseling"],
        "nice_to_have": ["Hospital Pharmacy","Research","Regulatory Affairs"],
        "avg_salary_inr": "3–12 LPA", "avg_salary_usd": "$50k–120k",
        "growth_rate": "Moderate", "job_locations": ["Mumbai","Delhi","Bangalore","Chennai"],
        "courses": [{"name":"Pharmacy Council of India","url":"https://pci.nic.in","free":True}],
    },
    "Physiotherapist": {
        "stream": "Medical",
        "profile": [0.65, 0.72, 0.62, 0.82, 0.52, 0.85, 0.78, 0.72, 0.45, 0.78, 0.28, 0.88, 0.52, 0.65, 0.85, 0.55, 0.78, 0.92, 0.45, 0.72, 0.82, 0.22, 0.55, 0.88, 0.1, 0.25, 0.52, 0.55, 0.28, 0.85, 0.35, 0.58, 0.85, 0.42, 0.42, 0.75, 3, 1, 4, 3, 2, 1, 2],
        "description": "Help patients recover from injuries and physical disabilities through exercise",
        "required_skills": ["BPT","Exercise Therapy","Manual Therapy","Rehabilitation","Anatomy"],
        "nice_to_have": ["Sports Physiotherapy","Neurological Rehab","Dry Needling"],
        "avg_salary_inr": "3–10 LPA", "avg_salary_usd": "$45k–90k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Bangalore","Chennai"],
        "courses": [{"name":"IAP Courses","url":"https://iapindia.org","free":False}],
    },
    "Nursing": {
        "stream": "Medical",
        "profile": [0.6, 0.7, 0.62, 0.78, 0.5, 0.88, 0.78, 0.72, 0.42, 0.75, 0.25, 0.95, 0.48, 0.68, 0.85, 0.52, 0.82, 0.98, 0.38, 0.72, 0.88, 0.22, 0.52, 0.92, 0.1, 0.22, 0.55, 0.55, 0.28, 0.92, 0.38, 0.58, 0.88, 0.42, 0.42, 0.72, 2, 1, 4, 3, 2, 1, 2],
        "description": "Provide patient care, administer medications and support medical teams",
        "required_skills": ["BSc Nursing","Patient Care","Clinical Skills","Emergency Care","Medical Records"],
        "nice_to_have": ["ICU","OT Nursing","NCLEX for abroad"],
        "avg_salary_inr": "3–12 LPA", "avg_salary_usd": "$50k–100k",
        "growth_rate": "Very High", "job_locations": ["All Indian cities","USA","UK","Gulf"],
        "courses": [{"name":"Swayam Health Sciences","url":"https://swayam.gov.in","free":True}],
    },
    "Clinical Psychologist": {
        "stream": "Medical",
        "profile": [0.6, 0.78, 0.62, 0.85, 0.52, 0.88, 0.82, 0.78, 0.3, 0.88, 0.42, 0.92, 0.52, 0.65, 0.88, 0.55, 0.78, 0.98, 0.52, 0.88, 0.85, 0.22, 0.52, 0.72, 0.12, 0.35, 0.65, 0.72, 0.28, 0.78, 0.38, 0.72, 0.92, 0.45, 0.45, 0.78, 3, 1, 4, 4, 2, 3, 2],
        "description": "Assess and treat mental health disorders through therapy and counseling",
        "required_skills": ["MA/MPhil Psychology","Psychotherapy","CBT","Psychological Assessment"],
        "nice_to_have": ["DBT","Neuropsychology","Research","RCI Registration"],
        "avg_salary_inr": "4–18 LPA", "avg_salary_usd": "$55k–110k",
        "growth_rate": "Very High", "job_locations": ["Mumbai","Delhi","Bangalore","Chennai"],
        "courses": [{"name":"Coursera Psychology","url":"https://coursera.org","free":False}],
    },
    "Radiologist": {
        "stream": "Medical",
        "profile": [0.72, 0.85, 0.72, 0.72, 0.62, 0.85, 0.85, 0.85, 0.38, 0.9, 0.28, 0.85, 0.52, 0.72, 0.72, 0.62, 0.72, 0.82, 0.45, 0.88, 0.92, 0.28, 0.68, 0.88, 0.1, 0.28, 0.62, 0.52, 0.28, 0.85, 0.45, 0.55, 0.75, 0.48, 0.45, 0.85, 3, 1, 6, 3, 5, 2, 4],
        "description": "Interpret medical images to diagnose diseases using X-ray, MRI, CT scans",
        "required_skills": ["MD Radiology","Medical Imaging","PACS","Interventional Radiology"],
        "nice_to_have": ["AI in Radiology","Nuclear Medicine","Teleradiology"],
        "avg_salary_inr": "15–60 LPA", "avg_salary_usd": "$200k–400k",
        "growth_rate": "High", "job_locations": ["Delhi","Mumbai","Chennai","Bangalore"],
        "courses": [{"name":"RSNA Learning Center","url":"https://rsna.org","free":True}],
    },
    "Psychiatrist": {
        "stream": "Medical",
        "profile": [0.65, 0.82, 0.65, 0.88, 0.55, 0.88, 0.85, 0.82, 0.32, 0.88, 0.38, 0.92, 0.55, 0.65, 0.9, 0.62, 0.75, 0.98, 0.48, 0.88, 0.88, 0.25, 0.58, 0.82, 0.12, 0.32, 0.65, 0.65, 0.28, 0.85, 0.42, 0.68, 0.9, 0.48, 0.45, 0.85, 3, 1, 6, 3, 5, 3, 5],
        "description": "Diagnose and treat mental health disorders including medication management",
        "required_skills": ["MD Psychiatry","Psychopharmacology","Psychotherapy","Mental Health Assessment"],
        "nice_to_have": ["Child Psychiatry","Addiction Medicine","Neuropsychiatry"],
        "avg_salary_inr": "12–50 LPA", "avg_salary_usd": "$150k–350k",
        "growth_rate": "Very High", "job_locations": ["Delhi","Mumbai","Bangalore","Chennai"],
        "courses": [{"name":"WPA Education","url":"https://wpanet.org","free":True}],
    },
    "Ayurvedic Doctor (BAMS)": {
        "stream": "Medical",
        "profile": [0.62, 0.72, 0.62, 0.78, 0.52, 0.85, 0.78, 0.72, 0.42, 0.78, 0.28, 0.9, 0.52, 0.65, 0.82, 0.55, 0.75, 0.92, 0.45, 0.78, 0.85, 0.22, 0.55, 0.85, 0.1, 0.28, 0.55, 0.58, 0.28, 0.85, 0.38, 0.58, 0.85, 0.42, 0.42, 0.75, 2, 1, 4, 3, 3, 1, 2],
        "description": "Practice traditional Indian medicine using Ayurvedic principles and herbs",
        "required_skills": ["BAMS","Panchakarma","Herbal Medicine","Ayurvedic Diagnosis"],
        "nice_to_have": ["Yoga Therapy","Research","Integrative Medicine"],
        "avg_salary_inr": "3–12 LPA", "avg_salary_usd": "$40k–80k",
        "growth_rate": "High", "job_locations": ["Kerala","Gujarat","Delhi","Bangalore"],
        "courses": [{"name":"Ministry of AYUSH Courses","url":"https://ayush.gov.in","free":True}],
    },
    "Veterinary Doctor": {
        "stream": "Medical",
        "profile": [0.68, 0.75, 0.68, 0.78, 0.55, 0.88, 0.8, 0.75, 0.42, 0.82, 0.28, 0.88, 0.52, 0.65, 0.78, 0.55, 0.72, 0.92, 0.48, 0.78, 0.85, 0.25, 0.62, 0.88, 0.1, 0.28, 0.55, 0.55, 0.28, 0.88, 0.42, 0.58, 0.82, 0.42, 0.42, 0.78, 3, 1, 4, 3, 3, 1, 2],
        "description": "Provide medical care to animals and help control diseases between animals and humans",
        "required_skills": ["BVSc","Animal Medicine","Surgery","Public Health","Lab Diagnostics"],
        "nice_to_have": ["Wildlife Medicine","Aquatic Animal Health","Research"],
        "avg_salary_inr": "4–15 LPA", "avg_salary_usd": "$55k–110k",
        "growth_rate": "Moderate", "job_locations": ["All Indian states","Government jobs"],
        "courses": [{"name":"ICAR e-Learning","url":"https://icar.gov.in","free":True}],
    },
    "Nutritionist / Dietitian": {
        "stream": "Medical",
        "profile": [0.58, 0.72, 0.65, 0.82, 0.48, 0.85, 0.75, 0.72, 0.35, 0.78, 0.28, 0.92, 0.52, 0.65, 0.85, 0.52, 0.75, 0.92, 0.48, 0.78, 0.85, 0.22, 0.62, 0.88, 0.1, 0.25, 0.58, 0.58, 0.28, 0.88, 0.38, 0.6, 0.85, 0.42, 0.42, 0.75, 2, 1, 4, 3, 2, 1, 2],
        "description": "Advise individuals and groups on nutrition and healthy eating habits",
        "required_skills": ["BSc Nutrition","Clinical Nutrition","Diet Planning","Food Science"],
        "nice_to_have": ["Sports Nutrition","Diabetes Management","Research"],
        "avg_salary_inr": "3–12 LPA", "avg_salary_usd": "$40k–80k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Bangalore","Chennai"],
        "courses": [{"name":"Swayam Nutrition","url":"https://swayam.gov.in","free":True}],
    },

    # ════════════════════════════════════════════════════════
    # 💼 BUSINESS (12 careers)
    # ════════════════════════════════════════════════════════

    "Chartered Accountant (CA)": {
        "stream": "Business",
        "profile": [0.65, 0.88, 0.95, 0.72, 0.58, 0.88, 0.88, 0.88, 0.25, 0.88, 0.25, 0.35, 0.62, 0.92, 0.72, 0.62, 0.72, 0.38, 0.35, 0.82, 0.95, 0.35, 0.88, 0.12, 0.12, 0.22, 0.75, 0.48, 0.95, 0.32, 0.38, 0.32, 0.58, 0.58, 0.85, 0.82, 3, 1, 5, 3, 4, 1, 2],
        "description": "Provide accounting, auditing, taxation and financial advisory services",
        "required_skills": ["Accounting","Taxation","Audit","Company Law","Financial Reporting"],
        "nice_to_have": ["GST","IFRS","Forensic Accounting","Fintech"],
        "avg_salary_inr": "7–40 LPA", "avg_salary_usd": "$60k–150k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Bangalore","Chennai","Hyderabad"],
        "courses": [{"name":"ICAI Study Material","url":"https://icai.org","free":True}],
    },
    "Investment Banker": {
        "stream": "Business",
        "profile": [0.72, 0.88, 0.92, 0.82, 0.75, 0.82, 0.88, 0.88, 0.22, 0.88, 0.32, 0.35, 0.88, 0.82, 0.85, 0.82, 0.72, 0.38, 0.45, 0.82, 0.88, 0.38, 0.88, 0.1, 0.12, 0.28, 0.85, 0.52, 0.95, 0.32, 0.38, 0.6, 0.75, 0.62, 0.92, 0.85, 4, 2, 4, 4, 3, 2, 3],
        "description": "Advise corporations on capital raising, mergers, acquisitions and financial restructuring",
        "required_skills": ["Financial Modeling","Valuation","M&A","Excel","Capital Markets"],
        "nice_to_have": ["CFA","Bloomberg Terminal","Deal Structuring"],
        "avg_salary_inr": "15–60 LPA", "avg_salary_usd": "$100k–300k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Bangalore","Singapore","London"],
        "courses": [{"name":"CFI Financial Modeling","url":"https://corporatefinanceinstitute.com","free":False}],
    },
    "MBA Graduate / Business Analyst": {
        "stream": "Business",
        "profile": [0.72, 0.85, 0.82, 0.82, 0.72, 0.78, 0.85, 0.85, 0.28, 0.85, 0.38, 0.48, 0.78, 0.78, 0.85, 0.78, 0.82, 0.48, 0.55, 0.82, 0.85, 0.52, 0.72, 0.12, 0.12, 0.35, 0.85, 0.58, 0.82, 0.32, 0.45, 0.52, 0.72, 0.65, 0.82, 0.82, 5, 2, 4, 5, 3, 1, 2],
        "description": "Analyze business problems and recommend data-driven solutions",
        "required_skills": ["Business Analysis","Excel","SQL","PowerBI/Tableau","Stakeholder Management"],
        "nice_to_have": ["Python","Process Improvement","Agile","Six Sigma"],
        "avg_salary_inr": "8–25 LPA", "avg_salary_usd": "$70k–130k",
        "growth_rate": "High", "job_locations": ["Bangalore","Mumbai","Delhi","Hyderabad","Pune"],
        "courses": [{"name":"CAT Preparation","url":"https://iimcat.ac.in","free":True}],
    },
    "Financial Analyst": {
        "stream": "Business",
        "profile": [0.68, 0.88, 0.92, 0.75, 0.55, 0.85, 0.88, 0.88, 0.22, 0.88, 0.28, 0.35, 0.68, 0.85, 0.75, 0.62, 0.72, 0.38, 0.38, 0.85, 0.92, 0.42, 0.88, 0.1, 0.12, 0.22, 0.88, 0.52, 0.95, 0.35, 0.38, 0.48, 0.62, 0.58, 0.88, 0.8, 4, 2, 5, 3, 3, 1, 2],
        "description": "Analyze financial data and prepare reports to guide investment and business decisions",
        "required_skills": ["Financial Modeling","Excel","Accounting","Data Analysis","CFA/CMA"],
        "nice_to_have": ["Python","Bloomberg","Risk Management"],
        "avg_salary_inr": "5–20 LPA", "avg_salary_usd": "$60k–120k",
        "growth_rate": "Moderate", "job_locations": ["Mumbai","Delhi","Bangalore","Hyderabad"],
        "courses": [{"name":"CFA Institute","url":"https://cfainstitute.org","free":False}],
    },
    "Human Resources (HR) Manager": {
        "stream": "Business",
        "profile": [0.55, 0.72, 0.62, 0.88, 0.68, 0.88, 0.75, 0.72, 0.18, 0.72, 0.42, 0.75, 0.72, 0.75, 0.92, 0.78, 0.85, 0.82, 0.48, 0.72, 0.78, 0.25, 0.45, 0.1, 0.12, 0.28, 0.55, 0.72, 0.62, 0.28, 0.32, 0.75, 0.85, 0.82, 0.75, 0.75, 3, 2, 4, 5, 2, 1, 3],
        "description": "Manage recruitment, employee relations, training and organizational development",
        "required_skills": ["Recruitment","Labour Law","Performance Management","Payroll","HRIS"],
        "nice_to_have": ["SHRM Certification","HR Analytics","OD Interventions"],
        "avg_salary_inr": "5–20 LPA", "avg_salary_usd": "$55k–110k",
        "growth_rate": "Moderate", "job_locations": ["All major cities"],
        "courses": [{"name":"SHRM Learning","url":"https://shrm.org/learning","free":False}],
    },
    "Entrepreneur / Startup Founder": {
        "stream": "Business",
        "profile": [0.75, 0.82, 0.72, 0.85, 0.88, 0.78, 0.88, 0.82, 0.28, 0.82, 0.65, 0.55, 0.92, 0.65, 0.88, 0.95, 0.72, 0.58, 0.85, 0.75, 0.75, 0.55, 0.65, 0.12, 0.12, 0.5, 0.75, 0.65, 0.78, 0.35, 0.42, 0.6, 0.82, 0.72, 0.88, 0.78, 10, 3, 4, 8, 2, 2, 3],
        "description": "Build and scale new ventures by identifying market opportunities",
        "required_skills": ["Business Development","Fundraising","Product Management","Marketing","Leadership"],
        "nice_to_have": ["Tech Skills","Financial Planning","Networking"],
        "avg_salary_inr": "Variable", "avg_salary_usd": "Variable",
        "growth_rate": "Explosive", "job_locations": ["Bangalore","Mumbai","Delhi","Hyderabad","Chennai"],
        "courses": [{"name":"Y Combinator Startup School","url":"https://startupschool.org","free":True}],
    },
    "Marketing Manager": {
        "stream": "Business",
        "profile": [0.62, 0.75, 0.65, 0.88, 0.72, 0.78, 0.78, 0.75, 0.22, 0.72, 0.65, 0.55, 0.82, 0.72, 0.92, 0.75, 0.78, 0.58, 0.75, 0.72, 0.78, 0.38, 0.55, 0.1, 0.1, 0.38, 0.72, 0.75, 0.65, 0.28, 0.35, 0.58, 0.82, 0.72, 0.82, 0.75, 4, 2, 4, 5, 2, 1, 3],
        "description": "Develop and execute marketing strategies to drive brand awareness and sales",
        "required_skills": ["Digital Marketing","SEO/SEM","Analytics","Content Strategy","Brand Management"],
        "nice_to_have": ["Marketing Automation","Performance Marketing","CRM"],
        "avg_salary_inr": "5–20 LPA", "avg_salary_usd": "$55k–110k",
        "growth_rate": "High", "job_locations": ["Mumbai","Bangalore","Delhi","Hyderabad"],
        "courses": [{"name":"Google Digital Garage","url":"https://learndigital.withgoogle.com","free":True}],
    },
    "Supply Chain Manager": {
        "stream": "Business",
        "profile": [0.68, 0.82, 0.78, 0.72, 0.62, 0.78, 0.82, 0.82, 0.55, 0.82, 0.25, 0.32, 0.72, 0.82, 0.72, 0.72, 0.82, 0.38, 0.42, 0.75, 0.88, 0.42, 0.72, 0.1, 0.1, 0.25, 0.72, 0.42, 0.72, 0.32, 0.58, 0.42, 0.58, 0.52, 0.75, 0.78, 4, 2, 4, 4, 2, 1, 3],
        "description": "Oversee procurement, logistics and distribution from suppliers to customers",
        "required_skills": ["Logistics","Procurement","ERP Systems","Inventory Management","Demand Planning"],
        "nice_to_have": ["Six Sigma","SAP","Digital Supply Chain"],
        "avg_salary_inr": "6–22 LPA", "avg_salary_usd": "$65k–120k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Pune","Bangalore","Chennai"],
        "courses": [{"name":"APICS CPIM","url":"https://ascm.org","free":False}],
    },
    "Management Consultant": {
        "stream": "Business",
        "profile": [0.72, 0.88, 0.82, 0.88, 0.78, 0.78, 0.88, 0.88, 0.22, 0.88, 0.42, 0.45, 0.85, 0.75, 0.92, 0.85, 0.78, 0.48, 0.55, 0.88, 0.85, 0.48, 0.72, 0.1, 0.12, 0.38, 0.85, 0.65, 0.78, 0.32, 0.42, 0.65, 0.82, 0.68, 0.88, 0.85, 4, 2, 4, 5, 3, 2, 3],
        "description": "Help organizations improve performance through analysis and strategic recommendations",
        "required_skills": ["Business Analysis","Problem Solving","Presentations","Project Management","Industry Knowledge"],
        "nice_to_have": ["MBA","Data Analytics","Change Management"],
        "avg_salary_inr": "10–40 LPA", "avg_salary_usd": "$80k–200k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Bangalore","Hyderabad"],
        "courses": [{"name":"Case Interview Prep","url":"https://caseinterview.com","free":True}],
    },
    "Risk Analyst": {
        "stream": "Business",
        "profile": [0.68, 0.88, 0.88, 0.72, 0.55, 0.85, 0.88, 0.88, 0.22, 0.88, 0.28, 0.35, 0.62, 0.88, 0.72, 0.6, 0.72, 0.38, 0.38, 0.85, 0.92, 0.42, 0.85, 0.1, 0.1, 0.22, 0.85, 0.5, 0.88, 0.35, 0.38, 0.45, 0.58, 0.55, 0.82, 0.8, 4, 2, 5, 3, 2, 1, 2],
        "description": "Identify and assess financial and operational risks for organizations",
        "required_skills": ["Risk Assessment","Statistical Analysis","Excel","Financial Modelling","Regulatory Knowledge"],
        "nice_to_have": ["FRM Certification","Python","Basel III","Actuarial Science"],
        "avg_salary_inr": "6–22 LPA", "avg_salary_usd": "$65k–130k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Bangalore","Hyderabad"],
        "courses": [{"name":"GARP FRM","url":"https://garp.org","free":False}],
    },
    "E-commerce Manager": {
        "stream": "Business",
        "profile": [0.65, 0.78, 0.72, 0.82, 0.68, 0.75, 0.8, 0.78, 0.25, 0.78, 0.5, 0.48, 0.78, 0.72, 0.85, 0.72, 0.75, 0.48, 0.62, 0.75, 0.78, 0.48, 0.62, 0.1, 0.1, 0.38, 0.78, 0.65, 0.68, 0.28, 0.38, 0.55, 0.75, 0.65, 0.78, 0.75, 4, 2, 4, 5, 2, 1, 3],
        "description": "Manage online sales channels, digital storefronts and e-commerce operations",
        "required_skills": ["E-commerce Platforms","Digital Marketing","Analytics","Inventory","Customer Experience"],
        "nice_to_have": ["Amazon Seller Central","Shopify","D2C Strategy"],
        "avg_salary_inr": "5–18 LPA", "avg_salary_usd": "$55k–100k",
        "growth_rate": "Explosive", "job_locations": ["Bangalore","Mumbai","Delhi","Remote"],
        "courses": [{"name":"Amazon Seller University","url":"https://sell.amazon.in","free":True}],
    },
    "Actuary": {
        "stream": "Business",
        "profile": [0.65, 0.92, 0.98, 0.68, 0.52, 0.82, 0.92, 0.92, 0.2, 0.92, 0.22, 0.32, 0.58, 0.88, 0.65, 0.58, 0.68, 0.32, 0.32, 0.88, 0.95, 0.38, 0.95, 0.1, 0.1, 0.18, 0.88, 0.45, 0.92, 0.28, 0.32, 0.35, 0.52, 0.48, 0.85, 0.88, 4, 1, 6, 3, 4, 3, 2],
        "description": "Use mathematics and statistics to assess financial risk for insurance and finance",
        "required_skills": ["Probability","Statistics","Financial Mathematics","Actuarial Exams","Excel/R"],
        "nice_to_have": ["Python","Machine Learning","IFRS 17"],
        "avg_salary_inr": "6–30 LPA", "avg_salary_usd": "$80k–180k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Bangalore","Hyderabad"],
        "courses": [{"name":"IAI Exams","url":"https://actuariesindia.org","free":True}],
    },

    # ════════════════════════════════════════════════════════
    # ⚖️ LAW (6 careers)
    # ════════════════════════════════════════════════════════

    "Corporate Lawyer": {
        "stream": "Law",
        "profile": [0.62, 0.85, 0.78, 0.92, 0.72, 0.72, 0.85, 0.85, 0.18, 0.85, 0.32, 0.32, 0.82, 0.82, 0.92, 0.78, 0.72, 0.38, 0.42, 0.88, 0.88, 0.28, 0.65, 0.12, 0.88, 0.32, 0.65, 0.72, 0.72, 0.25, 0.32, 0.6, 0.78, 0.62, 0.85, 0.82, 3, 1, 4, 4, 4, 2, 3],
        "description": "Advise businesses on legal matters including contracts, compliance and transactions",
        "required_skills": ["Contract Law","Company Law","M&A","Compliance","Legal Drafting"],
        "nice_to_have": ["Foreign Law Degree","LLM","SEBI Regulations","Arbitration"],
        "avg_salary_inr": "8–40 LPA", "avg_salary_usd": "$80k–200k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Bangalore","Hyderabad"],
        "courses": [{"name":"Bar Council Exams","url":"https://barcouncilofindia.org","free":True}],
    },
    "Criminal Lawyer": {
        "stream": "Law",
        "profile": [0.58, 0.82, 0.72, 0.92, 0.72, 0.68, 0.85, 0.82, 0.15, 0.82, 0.38, 0.42, 0.82, 0.75, 0.92, 0.78, 0.68, 0.52, 0.42, 0.85, 0.85, 0.22, 0.58, 0.12, 0.92, 0.28, 0.65, 0.72, 0.58, 0.22, 0.28, 0.65, 0.8, 0.58, 0.75, 0.8, 3, 1, 3, 4, 3, 2, 3],
        "description": "Represent clients in criminal proceedings as defense or prosecution",
        "required_skills": ["Criminal Law","CrPC","Indian Penal Code","Court Procedures","Legal Research"],
        "nice_to_have": ["Forensic Knowledge","Cyber Law","White Collar Crime"],
        "avg_salary_inr": "3–25 LPA", "avg_salary_usd": "$40k–120k",
        "growth_rate": "Moderate", "job_locations": ["Delhi","Mumbai","Chennai","All state capitals"],
        "courses": [{"name":"NLU Law Courses","url":"https://nlud.ac.in","free":False}],
    },
    "Legal Researcher / Academic": {
        "stream": "Law",
        "profile": [0.55, 0.88, 0.72, 0.88, 0.52, 0.65, 0.85, 0.85, 0.12, 0.88, 0.42, 0.35, 0.55, 0.75, 0.82, 0.55, 0.62, 0.45, 0.5, 0.95, 0.88, 0.25, 0.62, 0.12, 0.88, 0.32, 0.72, 0.82, 0.55, 0.22, 0.28, 0.58, 0.72, 0.52, 0.68, 0.85, 2, 1, 3, 4, 3, 5, 3],
        "description": "Conduct legal research and contribute to academia and policy development",
        "required_skills": ["Legal Research","Academic Writing","Constitutional Law","International Law"],
        "nice_to_have": ["LLM/PhD","Publications","Policy Analysis"],
        "avg_salary_inr": "4–18 LPA", "avg_salary_usd": "$45k–100k",
        "growth_rate": "Moderate", "job_locations": ["Delhi","Bangalore","Chennai","Hyderabad"],
        "courses": [{"name":"CLAT Preparation","url":"https://consortiumofnlus.ac.in","free":True}],
    },
    "Intellectual Property Lawyer": {
        "stream": "Law",
        "profile": [0.65, 0.85, 0.72, 0.88, 0.65, 0.7, 0.85, 0.85, 0.15, 0.85, 0.35, 0.35, 0.75, 0.8, 0.88, 0.72, 0.7, 0.38, 0.48, 0.88, 0.88, 0.38, 0.65, 0.12, 0.88, 0.32, 0.65, 0.68, 0.65, 0.22, 0.3, 0.6, 0.75, 0.6, 0.8, 0.82, 3, 1, 4, 4, 3, 2, 3],
        "description": "Protect intellectual property rights including patents, trademarks and copyrights",
        "required_skills": ["Patent Law","Trademark Law","Copyright","IP Prosecution","Technical Background"],
        "nice_to_have": ["Technology Law","WIPO Treaties","Licensing"],
        "avg_salary_inr": "6–30 LPA", "avg_salary_usd": "$70k–180k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Bangalore","Chennai"],
        "courses": [{"name":"WIPO Academy","url":"https://wipo.int/academy","free":True}],
    },
    "Cyber Lawyer": {
        "stream": "Law",
        "profile": [0.72, 0.85, 0.72, 0.88, 0.65, 0.7, 0.85, 0.85, 0.15, 0.88, 0.32, 0.35, 0.72, 0.8, 0.85, 0.68, 0.7, 0.38, 0.45, 0.88, 0.88, 0.52, 0.65, 0.12, 0.88, 0.28, 0.68, 0.65, 0.62, 0.22, 0.28, 0.58, 0.72, 0.58, 0.75, 0.8, 3, 1, 5, 4, 3, 2, 2],
        "description": "Handle legal matters related to cybercrime, data privacy and digital transactions",
        "required_skills": ["IT Act","GDPR","Cybercrime Law","Data Privacy","Digital Evidence"],
        "nice_to_have": ["Cyber Security basics","Blockchain Law","AI Regulation"],
        "avg_salary_inr": "5–25 LPA", "avg_salary_usd": "$60k–140k",
        "growth_rate": "Very High", "job_locations": ["Bangalore","Mumbai","Delhi","Hyderabad"],
        "courses": [{"name":"NASSCOM Cyber Law","url":"https://nasscom.in","free":True}],
    },
    "Human Rights Lawyer": {
        "stream": "Law",
        "profile": [0.52, 0.82, 0.65, 0.92, 0.62, 0.7, 0.82, 0.82, 0.12, 0.82, 0.42, 0.58, 0.7, 0.68, 0.92, 0.68, 0.68, 0.78, 0.48, 0.88, 0.85, 0.2, 0.58, 0.12, 0.88, 0.28, 0.68, 0.75, 0.5, 0.22, 0.25, 0.62, 0.82, 0.58, 0.68, 0.8, 2, 1, 3, 4, 3, 3, 3],
        "description": "Advocate for and protect the fundamental rights of individuals and communities",
        "required_skills": ["Constitutional Law","International Human Rights","Public Interest Litigation","Legal Aid"],
        "nice_to_have": ["UN Procedures","NGO Work","Refugee Law"],
        "avg_salary_inr": "3–15 LPA", "avg_salary_usd": "$35k–90k",
        "growth_rate": "Moderate", "job_locations": ["Delhi","Mumbai","Bangalore","Chennai"],
        "courses": [{"name":"UNHCR Online Courses","url":"https://elearning.unhcr.org","free":True}],
    },

    # ════════════════════════════════════════════════════════
    # 🎨 ARTS & DESIGN (8 careers)
    # ════════════════════════════════════════════════════════

    "Graphic Designer": {
        "stream": "Arts",
        "profile": [0.52, 0.65, 0.55, 0.72, 0.75, 0.62, 0.68, 0.62, 0.25, 0.62, 0.92, 0.42, 0.55, 0.58, 0.72, 0.48, 0.65, 0.48, 0.95, 0.62, 0.82, 0.35, 0.38, 0.1, 0.1, 0.92, 0.55, 0.62, 0.28, 0.18, 0.32, 0.42, 0.65, 0.52, 0.48, 0.68, 6, 1, 3, 5, 1, 1, 2],
        "description": "Create visual content for brands, marketing and digital media",
        "required_skills": ["Adobe Photoshop","Illustrator","InDesign","Typography","Color Theory"],
        "nice_to_have": ["Motion Graphics","3D Design","UI/UX","Branding"],
        "avg_salary_inr": "3–12 LPA", "avg_salary_usd": "$40k–90k",
        "growth_rate": "Moderate", "job_locations": ["Mumbai","Bangalore","Delhi","Pune","Remote"],
        "courses": [{"name":"Canva Design School","url":"https://canva.com/designschool","free":True}],
    },
    "Architect": {
        "stream": "Arts",
        "profile": [0.72, 0.78, 0.72, 0.72, 0.62, 0.72, 0.78, 0.75, 0.35, 0.75, 0.85, 0.42, 0.55, 0.65, 0.72, 0.58, 0.72, 0.48, 0.88, 0.72, 0.85, 0.42, 0.72, 0.1, 0.1, 0.88, 0.62, 0.42, 0.38, 0.25, 0.45, 0.45, 0.65, 0.52, 0.55, 0.78, 6, 2, 4, 4, 2, 2, 2],
        "description": "Design buildings and spaces that are functional, safe and aesthetically pleasing",
        "required_skills": ["AutoCAD","BIM/Revit","Design Studio","Building Regulations","3D Modeling"],
        "nice_to_have": ["Sustainable Design","Interior Design","Urban Planning"],
        "avg_salary_inr": "4–15 LPA", "avg_salary_usd": "$55k–100k",
        "growth_rate": "Moderate", "job_locations": ["Mumbai","Delhi","Bangalore","Hyderabad","Chennai"],
        "courses": [{"name":"Autodesk BIM Courses","url":"https://autodesk.com/certification","free":False}],
    },
    "Film & Video Producer": {
        "stream": "Arts",
        "profile": [0.55, 0.68, 0.55, 0.82, 0.72, 0.65, 0.72, 0.65, 0.22, 0.65, 0.88, 0.52, 0.75, 0.58, 0.85, 0.78, 0.72, 0.58, 0.92, 0.65, 0.75, 0.35, 0.42, 0.1, 0.1, 0.78, 0.55, 0.72, 0.42, 0.22, 0.32, 0.52, 0.78, 0.58, 0.62, 0.68, 8, 2, 3, 7, 1, 1, 3],
        "description": "Oversee the creative and business aspects of film and video production",
        "required_skills": ["Production Management","Screenwriting","Editing","Cinematography","Budgeting"],
        "nice_to_have": ["VFX","Streaming Platforms","Pitching","Distribution"],
        "avg_salary_inr": "4–25 LPA", "avg_salary_usd": "$50k–120k",
        "growth_rate": "High", "job_locations": ["Mumbai","Hyderabad","Chennai","Bangalore","Delhi"],
        "courses": [{"name":"Coursera Film Production","url":"https://coursera.org","free":False}],
    },
    "Fashion Designer": {
        "stream": "Arts",
        "profile": [0.48, 0.62, 0.52, 0.72, 0.68, 0.62, 0.65, 0.6, 0.22, 0.6, 0.95, 0.45, 0.62, 0.58, 0.75, 0.55, 0.65, 0.52, 0.98, 0.62, 0.8, 0.28, 0.38, 0.1, 0.1, 0.88, 0.52, 0.65, 0.38, 0.18, 0.28, 0.42, 0.68, 0.52, 0.52, 0.65, 8, 1, 3, 6, 1, 1, 2],
        "description": "Create clothing, accessories and fashion lines for brands and consumers",
        "required_skills": ["Fashion Illustration","Textiles","Garment Construction","Trend Analysis","Adobe Illustrator"],
        "nice_to_have": ["Sustainable Fashion","CAD for Fashion","Retail Management"],
        "avg_salary_inr": "3–15 LPA", "avg_salary_usd": "$40k–90k",
        "growth_rate": "Moderate", "job_locations": ["Mumbai","Delhi","Bangalore","Chennai"],
        "courses": [{"name":"NIFT Courses","url":"https://nift.ac.in","free":False}],
    },
    "Content Writer / Copywriter": {
        "stream": "Arts",
        "profile": [0.45, 0.68, 0.55, 0.88, 0.55, 0.62, 0.68, 0.65, 0.15, 0.68, 0.75, 0.52, 0.62, 0.62, 0.88, 0.52, 0.65, 0.52, 0.85, 0.72, 0.78, 0.28, 0.35, 0.1, 0.1, 0.52, 0.55, 0.82, 0.38, 0.18, 0.25, 0.45, 0.72, 0.55, 0.52, 0.7, 5, 1, 2, 4, 1, 2, 2],
        "description": "Create compelling written content for digital marketing, brands and media",
        "required_skills": ["Writing","SEO","Content Strategy","Research","Editing"],
        "nice_to_have": ["Copywriting","Social Media","Email Marketing","Video Scripts"],
        "avg_salary_inr": "3–12 LPA", "avg_salary_usd": "$35k–80k",
        "growth_rate": "High", "job_locations": ["Remote","Bangalore","Mumbai","Delhi"],
        "courses": [{"name":"Coursera Content Marketing","url":"https://coursera.org","free":False},{"name":"Hubspot Content Marketing","url":"https://hubspot.com/resources/courses","free":True}],
    },
    "Animator / VFX Artist": {
        "stream": "Arts",
        "profile": [0.58, 0.68, 0.62, 0.68, 0.78, 0.65, 0.72, 0.68, 0.22, 0.68, 0.92, 0.38, 0.58, 0.58, 0.68, 0.5, 0.68, 0.42, 0.95, 0.65, 0.82, 0.42, 0.5, 0.1, 0.1, 0.85, 0.52, 0.58, 0.28, 0.2, 0.3, 0.42, 0.62, 0.48, 0.45, 0.68, 7, 1, 3, 6, 1, 1, 2],
        "description": "Create animated characters, visual effects and CGI for film, TV and games",
        "required_skills": ["Maya/Blender","After Effects","3D Animation","Compositing","Rigging"],
        "nice_to_have": ["Houdini","Motion Capture","Unreal Engine"],
        "avg_salary_inr": "3–15 LPA", "avg_salary_usd": "$45k–100k",
        "growth_rate": "High", "job_locations": ["Mumbai","Hyderabad","Bangalore","Chennai"],
        "courses": [{"name":"CG Spectrum","url":"https://cgspectrum.com","free":False}],
    },
    "Interior Designer": {
        "stream": "Arts",
        "profile": [0.55, 0.68, 0.62, 0.75, 0.62, 0.65, 0.72, 0.68, 0.28, 0.65, 0.9, 0.48, 0.58, 0.62, 0.78, 0.58, 0.7, 0.52, 0.92, 0.65, 0.85, 0.38, 0.55, 0.1, 0.1, 0.88, 0.58, 0.55, 0.35, 0.22, 0.35, 0.48, 0.68, 0.55, 0.55, 0.72, 6, 1, 3, 5, 1, 1, 2],
        "description": "Design functional and aesthetically pleasing interior spaces for homes and businesses",
        "required_skills": ["AutoCAD","SketchUp","Space Planning","Material Selection","Client Management"],
        "nice_to_have": ["3D Visualization","Sustainable Design","BIM","Lighting Design"],
        "avg_salary_inr": "3–12 LPA", "avg_salary_usd": "$40k–90k",
        "growth_rate": "Moderate", "job_locations": ["Mumbai","Delhi","Bangalore","Chennai"],
        "courses": [{"name":"CIDA Accredited Programs","url":"https://accredit-id.org","free":False}],
    },
    "Photographer / Videographer": {
        "stream": "Arts",
        "profile": [0.48, 0.62, 0.55, 0.75, 0.72, 0.62, 0.65, 0.6, 0.22, 0.62, 0.92, 0.48, 0.62, 0.55, 0.78, 0.52, 0.65, 0.52, 0.95, 0.62, 0.78, 0.32, 0.38, 0.1, 0.1, 0.82, 0.52, 0.65, 0.32, 0.18, 0.28, 0.45, 0.72, 0.52, 0.48, 0.65, 6, 1, 2, 5, 1, 1, 2],
        "description": "Capture and edit images and videos for commercial, artistic and journalistic purposes",
        "required_skills": ["Camera Operation","Lighting","Adobe Lightroom/Premiere","Composition","Post-Processing"],
        "nice_to_have": ["Drone Photography","Brand Photography","Social Media Content"],
        "avg_salary_inr": "2–12 LPA", "avg_salary_usd": "$35k–80k",
        "growth_rate": "Moderate", "job_locations": ["Mumbai","Delhi","Bangalore","Remote"],
        "courses": [{"name":"Skillshare Photography","url":"https://skillshare.com","free":False}],
    },

    # ════════════════════════════════════════════════════════
    # 📖 EDUCATION (5 careers)
    # ════════════════════════════════════════════════════════

    "School / College Teacher": {
        "stream": "Education",
        "profile": [0.58, 0.72, 0.65, 0.85, 0.58, 0.82, 0.75, 0.72, 0.18, 0.72, 0.55, 0.72, 0.55, 0.62, 0.88, 0.62, 0.78, 0.82, 0.62, 0.78, 0.82, 0.28, 0.52, 0.15, 0.15, 0.42, 0.58, 0.75, 0.32, 0.25, 0.38, 0.85, 0.82, 0.72, 0.52, 0.75, 2, 1, 3, 4, 2, 2, 3],
        "description": "Educate and inspire students at school or college level across subjects",
        "required_skills": ["Subject Expertise","Curriculum Design","Classroom Management","Assessment","Communication"],
        "nice_to_have": ["EdTech Tools","Research","CBSE/State Board Curriculum","NET/SLET"],
        "avg_salary_inr": "3–10 LPA", "avg_salary_usd": "$35k–70k",
        "growth_rate": "Stable", "job_locations": ["All cities and towns across India"],
        "courses": [{"name":"DIKSHA Platform","url":"https://diksha.gov.in","free":True}],
    },
    "Educational Technologist / EdTech": {
        "stream": "Education",
        "profile": [0.68, 0.78, 0.68, 0.82, 0.62, 0.78, 0.78, 0.75, 0.22, 0.78, 0.62, 0.65, 0.65, 0.65, 0.85, 0.65, 0.78, 0.72, 0.72, 0.78, 0.82, 0.52, 0.55, 0.15, 0.12, 0.5, 0.68, 0.72, 0.38, 0.28, 0.35, 0.78, 0.78, 0.68, 0.58, 0.75, 5, 2, 4, 4, 2, 1, 2],
        "description": "Design and deploy technology-based learning systems and e-learning content",
        "required_skills": ["LMS","Instructional Design","E-learning Tools","UX for Learning","Data Analytics"],
        "nice_to_have": ["AI in Education","AR/VR Learning","Python","NEP 2020 Knowledge"],
        "avg_salary_inr": "4–18 LPA", "avg_salary_usd": "$50k–100k",
        "growth_rate": "Explosive", "job_locations": ["Bangalore","Mumbai","Delhi","Remote"],
        "courses": [{"name":"Coursera Learning Design","url":"https://coursera.org","free":False}],
    },
    "Social Worker": {
        "stream": "Education",
        "profile": [0.42, 0.65, 0.52, 0.88, 0.52, 0.88, 0.65, 0.65, 0.12, 0.62, 0.45, 0.85, 0.55, 0.58, 0.88, 0.55, 0.75, 0.95, 0.48, 0.72, 0.78, 0.18, 0.35, 0.15, 0.15, 0.32, 0.48, 0.62, 0.32, 0.22, 0.28, 0.85, 0.82, 0.82, 0.42, 0.72, 2, 1, 2, 5, 1, 1, 2],
        "description": "Help individuals, families and communities overcome social problems",
        "required_skills": ["Social Work","Counseling","Community Development","Case Management","Social Policy"],
        "nice_to_have": ["Child Protection","MSW Degree","NGO Management"],
        "avg_salary_inr": "2–8 LPA", "avg_salary_usd": "$30k–60k",
        "growth_rate": "Moderate", "job_locations": ["Delhi","Mumbai","Bangalore","Rural India"],
        "courses": [{"name":"Swayam Social Work","url":"https://swayam.gov.in","free":True}],
    },
    "Special Education Teacher": {
        "stream": "Education",
        "profile": [0.45, 0.68, 0.58, 0.88, 0.52, 0.92, 0.72, 0.68, 0.15, 0.68, 0.52, 0.88, 0.52, 0.62, 0.92, 0.58, 0.78, 0.98, 0.55, 0.78, 0.88, 0.22, 0.38, 0.15, 0.15, 0.35, 0.52, 0.68, 0.28, 0.22, 0.28, 0.92, 0.82, 0.82, 0.45, 0.72, 2, 1, 3, 4, 1, 1, 2],
        "description": "Educate and support students with disabilities and special learning needs",
        "required_skills": ["Special Education","IEP Development","Behavior Management","Assistive Technology"],
        "nice_to_have": ["ABA Therapy","Autism Spectrum Support","Sign Language"],
        "avg_salary_inr": "2–8 LPA", "avg_salary_usd": "$35k–65k",
        "growth_rate": "High", "job_locations": ["All cities","Schools and NGOs"],
        "courses": [{"name":"RCI Approved Courses","url":"https://rehabcouncil.nic.in","free":True}],
    },
    "Academic Researcher / Professor": {
        "stream": "Education",
        "profile": [0.55, 0.88, 0.75, 0.82, 0.58, 0.72, 0.85, 0.88, 0.15, 0.92, 0.48, 0.42, 0.55, 0.68, 0.82, 0.62, 0.68, 0.52, 0.58, 0.95, 0.88, 0.38, 0.68, 0.18, 0.18, 0.42, 0.65, 0.78, 0.45, 0.25, 0.32, 0.82, 0.78, 0.62, 0.58, 0.88, 3, 1, 4, 4, 2, 8, 5],
        "description": "Conduct original research and teach at universities and research institutions",
        "required_skills": ["PhD","Research Methodology","Academic Writing","Grant Writing","Teaching"],
        "nice_to_have": ["Scopus Publications","Patent Filing","Industry Collaboration"],
        "avg_salary_inr": "6–20 LPA", "avg_salary_usd": "$60k–120k",
        "growth_rate": "Moderate", "job_locations": ["All university cities","IITs","NITs","IIMs"],
        "courses": [{"name":"UGC NET Preparation","url":"https://ugcnet.nta.nic.in","free":True}],
    },

    # ════════════════════════════════════════════════════════
    # 🔬 SCIENCE (6 careers)
    # ════════════════════════════════════════════════════════

    "Research Scientist": {
        "stream": "Science",
        "profile": [0.72, 0.92, 0.88, 0.72, 0.52, 0.72, 0.88, 0.92, 0.22, 0.95, 0.38, 0.35, 0.48, 0.68, 0.72, 0.52, 0.68, 0.42, 0.55, 0.98, 0.92, 0.52, 0.82, 0.28, 0.15, 0.32, 0.82, 0.65, 0.42, 0.88, 0.55, 0.45, 0.55, 0.42, 0.55, 0.88, 5, 2, 5, 3, 2, 8, 4],
        "description": "Conduct original scientific research to expand knowledge in a specific field",
        "required_skills": ["Research Methodology","Scientific Writing","Lab Techniques","Data Analysis","Grant Writing"],
        "nice_to_have": ["PhD","Scopus Publications","International Collaborations"],
        "avg_salary_inr": "5–20 LPA", "avg_salary_usd": "$55k–120k",
        "growth_rate": "Moderate", "job_locations": ["Bangalore","Hyderabad","Delhi","Chennai","IISc/IIT/CSIR"],
        "courses": [{"name":"CSIR NET Preparation","url":"https://csirnet.nta.nic.in","free":True}],
    },
    "Environmental Scientist": {
        "stream": "Science",
        "profile": [0.65, 0.82, 0.78, 0.72, 0.52, 0.72, 0.82, 0.82, 0.28, 0.88, 0.35, 0.35, 0.48, 0.65, 0.72, 0.52, 0.72, 0.48, 0.55, 0.92, 0.88, 0.42, 0.72, 0.22, 0.12, 0.32, 0.78, 0.52, 0.38, 0.85, 0.55, 0.42, 0.55, 0.42, 0.52, 0.82, 5, 2, 4, 3, 2, 5, 3],
        "description": "Study environmental problems and develop solutions to protect ecosystems",
        "required_skills": ["Environmental Science","GIS","Field Research","Data Analysis","EIA"],
        "nice_to_have": ["Remote Sensing","Climate Modeling","Policy Writing"],
        "avg_salary_inr": "4–15 LPA", "avg_salary_usd": "$50k–100k",
        "growth_rate": "High", "job_locations": ["Delhi","Bangalore","Mumbai","Chennai"],
        "courses": [{"name":"IIRS Remote Sensing","url":"https://iirs.gov.in","free":True}],
    },
    "Space Scientist / Aerospace Engineer": {
        "stream": "Science",
        "profile": [0.88, 0.95, 0.92, 0.65, 0.85, 0.82, 0.92, 0.95, 0.82, 0.98, 0.38, 0.22, 0.45, 0.72, 0.62, 0.55, 0.72, 0.32, 0.58, 0.98, 0.95, 0.72, 0.95, 0.1, 0.1, 0.32, 0.75, 0.32, 0.28, 0.58, 0.95, 0.28, 0.45, 0.32, 0.45, 0.88, 6, 2, 5, 3, 3, 5, 3],
        "description": "Research and develop technologies for space exploration and aerospace systems",
        "required_skills": ["Orbital Mechanics","Astrophysics","MATLAB","Spacecraft Design","Propulsion"],
        "nice_to_have": ["ISRO GATE","Remote Sensing","Machine Learning for Space"],
        "avg_salary_inr": "6–25 LPA", "avg_salary_usd": "$70k–140k",
        "growth_rate": "High", "job_locations": ["Bangalore (ISRO)","Hyderabad","Chennai","Trivandrum"],
        "courses": [{"name":"ISRO IIRS Courses","url":"https://iirs.gov.in","free":True}],
    },
    "Biotechnologist": {
        "stream": "Science",
        "profile": [0.72, 0.88, 0.82, 0.65, 0.48, 0.72, 0.85, 0.88, 0.22, 0.92, 0.35, 0.32, 0.45, 0.68, 0.65, 0.52, 0.68, 0.42, 0.55, 0.95, 0.9, 0.48, 0.78, 0.25, 0.12, 0.3, 0.75, 0.52, 0.38, 0.82, 0.55, 0.38, 0.5, 0.38, 0.52, 0.82, 5, 2, 4, 3, 2, 4, 2],
        "description": "Apply biological principles to develop products for medicine, agriculture and environment",
        "required_skills": ["Molecular Biology","Genetics","Lab Techniques","Bioinformatics","R/Python"],
        "nice_to_have": ["CRISPR","Drug Development","Regulatory Affairs","MSc/PhD"],
        "avg_salary_inr": "4–18 LPA", "avg_salary_usd": "$55k–110k",
        "growth_rate": "Very High", "job_locations": ["Bangalore","Hyderabad","Pune","Delhi"],
        "courses": [{"name":"Coursera Genomics","url":"https://coursera.org","free":False}],
    },
    "Geologist / Geoscientist": {
        "stream": "Science",
        "profile": [0.68, 0.82, 0.78, 0.65, 0.55, 0.68, 0.82, 0.82, 0.55, 0.88, 0.32, 0.2, 0.45, 0.68, 0.62, 0.5, 0.68, 0.38, 0.52, 0.88, 0.88, 0.42, 0.82, 0.12, 0.12, 0.28, 0.72, 0.38, 0.38, 0.72, 0.72, 0.38, 0.48, 0.35, 0.48, 0.8, 5, 2, 4, 3, 2, 4, 2],
        "description": "Study the earth's structure, composition and processes through field and lab work",
        "required_skills": ["Geology","GIS","Field Mapping","Rock & Mineral Analysis","Remote Sensing"],
        "nice_to_have": ["Petroleum Geology","Environmental Geology","GATE Geology"],
        "avg_salary_inr": "4–18 LPA", "avg_salary_usd": "$55k–110k",
        "growth_rate": "Moderate", "job_locations": ["Delhi","Mumbai","Hyderabad","Bangalore"],
        "courses": [{"name":"NPTEL Earth Sciences","url":"https://nptel.ac.in","free":True}],
    },
    "Chemist / Materials Scientist": {
        "stream": "Science",
        "profile": [0.68, 0.88, 0.85, 0.62, 0.5, 0.7, 0.85, 0.88, 0.22, 0.92, 0.32, 0.25, 0.42, 0.68, 0.62, 0.5, 0.68, 0.38, 0.52, 0.92, 0.92, 0.42, 0.88, 0.18, 0.1, 0.28, 0.75, 0.45, 0.38, 0.82, 0.55, 0.35, 0.48, 0.35, 0.48, 0.82, 5, 2, 4, 3, 2, 5, 2],
        "description": "Study chemical properties of matter and develop new materials for industrial applications",
        "required_skills": ["Chemistry","Spectroscopy","Lab Techniques","Materials Characterization","MATLAB/Python"],
        "nice_to_have": ["Polymer Science","Nanotechnology","Pharmaceutical Chemistry"],
        "avg_salary_inr": "4–16 LPA", "avg_salary_usd": "$52k–100k",
        "growth_rate": "Moderate", "job_locations": ["Hyderabad","Bangalore","Mumbai","Pune"],
        "courses": [{"name":"NPTEL Chemistry","url":"https://nptel.ac.in","free":True}],
    },

    # ════════════════════════════════════════════════════════
    # 🏛️ GOVERNMENT (6 careers)
    # ════════════════════════════════════════════════════════

    "IAS / IPS Officer (Civil Services)": {
        "stream": "Government",
        "profile": [0.75, 0.88, 0.82, 0.92, 0.82, 0.82, 0.88, 0.88, 0.25, 0.88, 0.42, 0.72, 0.82, 0.72, 0.92, 0.85, 0.82, 0.72, 0.55, 0.88, 0.88, 0.35, 0.68, 0.15, 0.18, 0.38, 0.72, 0.65, 0.58, 0.38, 0.5, 0.75, 0.88, 0.72, 0.78, 0.88, 3, 1, 4, 5, 5, 2, 2],
        "description": "Serve in senior administrative roles in the Indian government at district, state or central level",
        "required_skills": ["UPSC CSE","General Studies","Essay Writing","Current Affairs","Public Administration"],
        "nice_to_have": ["Optional Subject Expertise","Personality Development","Hindi/Regional Language"],
        "avg_salary_inr": "7–18 LPA + perks", "avg_salary_usd": "N/A",
        "growth_rate": "Stable", "job_locations": ["All India Service — posted anywhere in India"],
        "courses": [{"name":"UPSC Preparation","url":"https://upsc.gov.in","free":True},{"name":"Vajiram & Ravi","url":"https://vajiramandravi.com","free":False}],
    },
    "Indian Army / Navy / Air Force Officer": {
        "stream": "Government",
        "profile": [0.75, 0.82, 0.75, 0.78, 0.82, 0.82, 0.85, 0.82, 0.88, 0.82, 0.28, 0.62, 0.78, 0.72, 0.82, 0.88, 0.85, 0.65, 0.45, 0.72, 0.88, 0.45, 0.72, 0.15, 0.12, 0.32, 0.62, 0.52, 0.42, 0.35, 0.52, 0.68, 0.82, 0.72, 0.72, 0.82, 3, 1, 4, 5, 4, 1, 2],
        "description": "Serve as an officer in India's armed forces protecting national security",
        "required_skills": ["NDA/CDS/AFCAT Exam","Physical Fitness","Leadership","Military Training"],
        "nice_to_have": ["Technical Branch specialization","Strategic Studies","Counter-terrorism"],
        "avg_salary_inr": "7–20 LPA + allowances", "avg_salary_usd": "N/A",
        "growth_rate": "Stable", "job_locations": ["Pan India — military stations and deployments"],
        "courses": [{"name":"NDA Preparation","url":"https://nda.nic.in","free":True}],
    },
    "Data Analyst (Government / PSU)": {
        "stream": "Government",
        "profile": [0.72, 0.88, 0.85, 0.72, 0.52, 0.78, 0.85, 0.88, 0.3, 0.88, 0.32, 0.35, 0.52, 0.75, 0.68, 0.52, 0.72, 0.42, 0.48, 0.85, 0.9, 0.62, 0.82, 0.12, 0.12, 0.22, 0.88, 0.52, 0.52, 0.38, 0.42, 0.45, 0.58, 0.48, 0.58, 0.8, 4, 1, 5, 3, 2, 2, 2],
        "description": "Analyze data for government departments, PSUs and policy-making organizations",
        "required_skills": ["Python/R","SQL","Data Visualization","Statistics","Government Data Portals"],
        "nice_to_have": ["Power BI","Geospatial Analysis","Policy Analysis"],
        "avg_salary_inr": "5–15 LPA", "avg_salary_usd": "N/A",
        "growth_rate": "High", "job_locations": ["Delhi","Mumbai","Bangalore","State capitals"],
        "courses": [{"name":"India Data Portal","url":"https://data.gov.in","free":True}],
    },
    "Diplomat / Foreign Service Officer": {
        "stream": "Government",
        "profile": [0.65, 0.85, 0.75, 0.95, 0.78, 0.78, 0.85, 0.85, 0.18, 0.85, 0.42, 0.65, 0.82, 0.72, 0.95, 0.82, 0.78, 0.65, 0.52, 0.88, 0.85, 0.28, 0.62, 0.15, 0.22, 0.38, 0.68, 0.78, 0.55, 0.32, 0.42, 0.72, 0.92, 0.72, 0.75, 0.88, 3, 1, 4, 5, 5, 2, 2],
        "description": "Represent India's interests abroad through embassies and international organizations",
        "required_skills": ["UPSC IFS","International Relations","Foreign Languages","Diplomacy","Public Speaking"],
        "nice_to_have": ["UN Procedures","Trade Policy","Cultural Intelligence"],
        "avg_salary_inr": "8–20 LPA + allowances", "avg_salary_usd": "N/A",
        "growth_rate": "Stable", "job_locations": ["Delhi + postings worldwide"],
        "courses": [{"name":"MEA Training Programs","url":"https://mea.gov.in","free":True}],
    },
    "Police Officer (State Services)": {
        "stream": "Government",
        "profile": [0.65, 0.78, 0.7, 0.78, 0.72, 0.78, 0.8, 0.78, 0.72, 0.78, 0.25, 0.68, 0.72, 0.68, 0.82, 0.78, 0.8, 0.65, 0.38, 0.72, 0.82, 0.32, 0.58, 0.12, 0.18, 0.28, 0.58, 0.5, 0.38, 0.28, 0.45, 0.65, 0.78, 0.72, 0.62, 0.78, 2, 1, 3, 4, 3, 1, 2],
        "description": "Maintain law and order and investigate crimes at the state level",
        "required_skills": ["State PSC Exam","IPC/CrPC","Investigation Skills","Physical Fitness","Leadership"],
        "nice_to_have": ["Forensics","Cyber Crime","Community Policing"],
        "avg_salary_inr": "5–12 LPA", "avg_salary_usd": "N/A",
        "growth_rate": "Stable", "job_locations": ["State-specific postings across India"],
        "courses": [{"name":"State PSC Preparation","url":"https://upsc.gov.in","free":True}],
    },
    "Bank PO / Finance Officer (PSU)": {
        "stream": "Government",
        "profile": [0.62, 0.82, 0.85, 0.78, 0.58, 0.78, 0.82, 0.82, 0.22, 0.82, 0.28, 0.38, 0.62, 0.82, 0.78, 0.62, 0.75, 0.42, 0.38, 0.78, 0.88, 0.35, 0.78, 0.1, 0.1, 0.22, 0.65, 0.5, 0.75, 0.28, 0.42, 0.52, 0.65, 0.55, 0.75, 0.78, 3, 1, 4, 3, 3, 1, 2],
        "description": "Work in public sector banks managing accounts, loans and financial services",
        "required_skills": ["IBPS/SBI PO Exam","Banking Operations","Financial Knowledge","Customer Service"],
        "nice_to_have": ["JAIIB/CAIIB","Digital Banking","Credit Analysis"],
        "avg_salary_inr": "5–12 LPA", "avg_salary_usd": "N/A",
        "growth_rate": "Moderate", "job_locations": ["All cities across India"],
        "courses": [{"name":"IBPS Preparation","url":"https://ibps.in","free":True}],
    },

    # ════════════════════════════════════════════════════════
    # 📡 MEDIA (6 careers)
    # ════════════════════════════════════════════════════════

    "Journalist / Reporter": {
        "stream": "Media",
        "profile": [0.55, 0.75, 0.62, 0.92, 0.62, 0.68, 0.78, 0.75, 0.18, 0.75, 0.58, 0.65, 0.65, 0.58, 0.92, 0.62, 0.68, 0.62, 0.72, 0.85, 0.82, 0.28, 0.42, 0.12, 0.15, 0.42, 0.55, 0.88, 0.38, 0.22, 0.28, 0.52, 0.85, 0.62, 0.52, 0.72, 3, 1, 2, 4, 1, 3, 2],
        "description": "Research, investigate and report news stories for media organizations",
        "required_skills": ["Writing","Research","Interviewing","Media Ethics","Digital Media"],
        "nice_to_have": ["Data Journalism","Investigative Reporting","Video Production"],
        "avg_salary_inr": "3–15 LPA", "avg_salary_usd": "$35k–80k",
        "growth_rate": "Moderate", "job_locations": ["Delhi","Mumbai","Bangalore","Chennai"],
        "courses": [{"name":"Indian Institute of Mass Communication","url":"https://iimc.gov.in","free":False}],
    },
    "Public Relations (PR) Manager": {
        "stream": "Media",
        "profile": [0.55, 0.72, 0.62, 0.92, 0.68, 0.72, 0.72, 0.68, 0.18, 0.68, 0.65, 0.62, 0.78, 0.65, 0.95, 0.72, 0.75, 0.62, 0.68, 0.72, 0.78, 0.28, 0.42, 0.1, 0.1, 0.45, 0.58, 0.82, 0.52, 0.22, 0.28, 0.55, 0.88, 0.68, 0.68, 0.72, 4, 2, 3, 5, 1, 1, 3],
        "description": "Manage the public image and communications strategy for organizations",
        "required_skills": ["Media Relations","Crisis Communication","Writing","Event Management","Social Media"],
        "nice_to_have": ["Digital PR","Influencer Marketing","Brand Strategy"],
        "avg_salary_inr": "4–18 LPA", "avg_salary_usd": "$45k–90k",
        "growth_rate": "Moderate", "job_locations": ["Mumbai","Delhi","Bangalore","Hyderabad"],
        "courses": [{"name":"PRCI Certification","url":"https://prci.in","free":False}],
    },
    "Social Media Manager": {
        "stream": "Media",
        "profile": [0.52, 0.68, 0.58, 0.88, 0.62, 0.72, 0.68, 0.65, 0.15, 0.65, 0.72, 0.58, 0.72, 0.62, 0.92, 0.65, 0.72, 0.58, 0.78, 0.68, 0.75, 0.32, 0.38, 0.1, 0.1, 0.48, 0.62, 0.82, 0.52, 0.18, 0.25, 0.52, 0.82, 0.65, 0.62, 0.68, 4, 1, 3, 5, 1, 1, 2],
        "description": "Manage brand presence and community engagement across social media platforms",
        "required_skills": ["Content Creation","Analytics","Platform Management","Copywriting","Community Management"],
        "nice_to_have": ["Paid Ads","Influencer Partnerships","Video Content","SEO"],
        "avg_salary_inr": "3–12 LPA", "avg_salary_usd": "$35k–75k",
        "growth_rate": "High", "job_locations": ["Remote","Bangalore","Mumbai","Delhi"],
        "courses": [{"name":"Meta Blueprint","url":"https://facebook.com/business/learn","free":True}],
    },
    "Podcaster / Content Creator": {
        "stream": "Media",
        "profile": [0.48, 0.65, 0.55, 0.88, 0.62, 0.65, 0.65, 0.62, 0.15, 0.65, 0.82, 0.55, 0.72, 0.58, 0.92, 0.62, 0.62, 0.58, 0.88, 0.65, 0.72, 0.28, 0.38, 0.1, 0.1, 0.55, 0.58, 0.85, 0.42, 0.18, 0.22, 0.52, 0.82, 0.62, 0.55, 0.65, 5, 1, 2, 6, 1, 1, 1],
        "description": "Create original audio/video content for online audiences on platforms like YouTube and Spotify",
        "required_skills": ["Content Strategy","Audio/Video Production","Storytelling","SEO","Audience Building"],
        "nice_to_have": ["Monetization","Brand Deals","Community Management"],
        "avg_salary_inr": "2–20 LPA (variable)", "avg_salary_usd": "$20k–200k",
        "growth_rate": "Explosive", "job_locations": ["Remote","Anywhere in India"],
        "courses": [{"name":"YouTube Creator Academy","url":"https://creatoracademy.youtube.com","free":True}],
    },
    "Sports Journalist": {
        "stream": "Media",
        "profile": [0.52, 0.72, 0.6, 0.9, 0.58, 0.68, 0.72, 0.7, 0.35, 0.72, 0.62, 0.6, 0.62, 0.58, 0.9, 0.6, 0.68, 0.6, 0.72, 0.8, 0.8, 0.28, 0.38, 0.1, 0.1, 0.42, 0.55, 0.88, 0.38, 0.22, 0.28, 0.52, 0.85, 0.62, 0.5, 0.7, 3, 1, 2, 4, 1, 2, 2],
        "description": "Cover sports events and stories for print, broadcast and digital media",
        "required_skills": ["Sports Knowledge","Writing","Reporting","Video/Audio","Social Media"],
        "nice_to_have": ["Statistics","Sports Analytics","Broadcasting"],
        "avg_salary_inr": "3–12 LPA", "avg_salary_usd": "$35k–75k",
        "growth_rate": "Moderate", "job_locations": ["Delhi","Mumbai","Bangalore","Chennai"],
        "courses": [{"name":"Sports Journalism Courses","url":"https://coursera.org","free":False}],
    },
    "Radio Jockey / Broadcaster": {
        "stream": "Media",
        "profile": [0.45, 0.62, 0.55, 0.92, 0.62, 0.68, 0.65, 0.62, 0.15, 0.62, 0.75, 0.62, 0.68, 0.58, 0.95, 0.62, 0.68, 0.62, 0.82, 0.62, 0.72, 0.25, 0.35, 0.1, 0.1, 0.45, 0.55, 0.88, 0.38, 0.18, 0.22, 0.52, 0.88, 0.65, 0.52, 0.65, 3, 1, 2, 5, 1, 1, 2],
        "description": "Host radio shows, engage audiences and announce news, music and programs",
        "required_skills": ["Voice Modulation","Scripting","Broadcasting","Current Affairs","Improvisation"],
        "nice_to_have": ["Digital Radio","Podcast Production","Social Media"],
        "avg_salary_inr": "2–10 LPA", "avg_salary_usd": "$25k–60k",
        "growth_rate": "Moderate", "job_locations": ["Mumbai","Delhi","Bangalore","Chennai"],
        "courses": [{"name":"FTII Broadcasting","url":"https://ftii.ac.in","free":False}],
    },

    # ════════════════════════════════════════════════════════
    # 🏗️ ARCHITECTURE & URBAN PLANNING (3 careers)
    # ════════════════════════════════════════════════════════

    "Urban Planner": {
        "stream": "Architecture",
        "profile": [0.65, 0.82, 0.75, 0.78, 0.65, 0.75, 0.82, 0.8, 0.45, 0.82, 0.65, 0.55, 0.62, 0.72, 0.78, 0.68, 0.75, 0.58, 0.72, 0.82, 0.85, 0.42, 0.72, 0.12, 0.12, 0.65, 0.68, 0.55, 0.42, 0.35, 0.45, 0.55, 0.72, 0.58, 0.65, 0.8, 5, 2, 4, 4, 2, 3, 3],
        "description": "Design and develop plans for land use, transportation and urban development",
        "required_skills": ["GIS","AutoCAD","Urban Design","Policy Analysis","Community Engagement"],
        "nice_to_have": ["Smart Cities","BIM","Transport Planning","Environmental Planning"],
        "avg_salary_inr": "4–18 LPA", "avg_salary_usd": "$55k–110k",
        "growth_rate": "High", "job_locations": ["Delhi","Mumbai","Bangalore","Hyderabad","Smart Cities"],
        "courses": [{"name":"NIUA Courses","url":"https://niua.in","free":True}],
    },
    "Landscape Architect": {
        "stream": "Architecture",
        "profile": [0.58, 0.72, 0.65, 0.72, 0.75, 0.68, 0.72, 0.7, 0.42, 0.72, 0.88, 0.55, 0.55, 0.62, 0.72, 0.58, 0.72, 0.58, 0.88, 0.75, 0.82, 0.38, 0.62, 0.12, 0.1, 0.85, 0.62, 0.5, 0.35, 0.32, 0.42, 0.5, 0.65, 0.55, 0.55, 0.75, 5, 1, 3, 4, 2, 2, 2],
        "description": "Design outdoor spaces including parks, gardens, campuses and public areas",
        "required_skills": ["Landscape Design","AutoCAD","Plant Knowledge","Site Analysis","Environmental Planning"],
        "nice_to_have": ["Sustainable Design","3D Visualization","Urban Ecology"],
        "avg_salary_inr": "3–12 LPA", "avg_salary_usd": "$45k–90k",
        "growth_rate": "Moderate", "job_locations": ["Delhi","Mumbai","Bangalore","Hyderabad"],
        "courses": [{"name":"SPA Delhi Programs","url":"https://spa.ac.in","free":False}],
    },
    "Construction Project Manager": {
        "stream": "Architecture",
        "profile": [0.72, 0.8, 0.75, 0.78, 0.75, 0.78, 0.82, 0.8, 0.65, 0.8, 0.35, 0.35, 0.72, 0.78, 0.8, 0.78, 0.82, 0.42, 0.45, 0.72, 0.88, 0.45, 0.78, 0.1, 0.1, 0.38, 0.65, 0.42, 0.45, 0.35, 0.55, 0.5, 0.65, 0.55, 0.72, 0.78, 6, 3, 5, 4, 2, 1, 4],
        "description": "Oversee all aspects of construction projects from planning to completion",
        "required_skills": ["Project Management","MS Project","Contracts","Cost Estimation","Site Management"],
        "nice_to_have": ["PMP Certification","BIM","RERA Knowledge","Green Building"],
        "avg_salary_inr": "6–25 LPA", "avg_salary_usd": "$65k–130k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Bangalore","Hyderabad","Chennai"],
        "courses": [{"name":"PMI PMP Certification","url":"https://pmi.org","free":False}],
    },

    # ════════════════════════════════════════════════════════
    # 🌾 AGRICULTURE (3 careers)
    # ════════════════════════════════════════════════════════

    "Agricultural Scientist": {
        "stream": "Agriculture",
        "profile": [0.68, 0.82, 0.78, 0.68, 0.52, 0.72, 0.82, 0.82, 0.35, 0.88, 0.35, 0.38, 0.45, 0.65, 0.65, 0.52, 0.72, 0.45, 0.52, 0.88, 0.88, 0.38, 0.72, 0.22, 0.1, 0.3, 0.72, 0.48, 0.35, 0.78, 0.55, 0.42, 0.52, 0.38, 0.5, 0.82, 5, 2, 4, 3, 2, 4, 2],
        "description": "Research and develop technologies to improve agricultural productivity and sustainability",
        "required_skills": ["Agronomy","Soil Science","Plant Breeding","Research Methods","Data Analysis"],
        "nice_to_have": ["Precision Agriculture","Biotechnology","Remote Sensing"],
        "avg_salary_inr": "4–15 LPA", "avg_salary_usd": "$45k–90k",
        "growth_rate": "High", "job_locations": ["Hyderabad (ICRISAT)","Delhi (ICAR)","Pune","Bangalore"],
        "courses": [{"name":"ICAR e-Learning","url":"https://icar.gov.in","free":True}],
    },
    "Agricultural Engineer": {
        "stream": "Agriculture",
        "profile": [0.75, 0.8, 0.78, 0.65, 0.58, 0.72, 0.82, 0.8, 0.58, 0.82, 0.28, 0.32, 0.48, 0.7, 0.62, 0.55, 0.72, 0.42, 0.52, 0.78, 0.85, 0.45, 0.8, 0.15, 0.1, 0.32, 0.65, 0.38, 0.35, 0.65, 0.82, 0.38, 0.48, 0.38, 0.5, 0.78, 5, 2, 4, 3, 2, 2, 2],
        "description": "Apply engineering principles to farming and agricultural systems",
        "required_skills": ["Farm Machinery","Irrigation","Post-harvest Technology","GIS","Soil Mechanics"],
        "nice_to_have": ["Drone Technology","IoT in Agriculture","Renewable Energy for Farms"],
        "avg_salary_inr": "4–14 LPA", "avg_salary_usd": "$45k–90k",
        "growth_rate": "High", "job_locations": ["Punjab","Haryana","UP","Maharashtra","AP"],
        "courses": [{"name":"ICAR IARI Courses","url":"https://iari.res.in","free":True}],
    },
    "Food Technologist": {
        "stream": "Agriculture",
        "profile": [0.65, 0.78, 0.75, 0.68, 0.52, 0.72, 0.78, 0.78, 0.32, 0.82, 0.32, 0.35, 0.52, 0.68, 0.65, 0.52, 0.72, 0.45, 0.52, 0.82, 0.85, 0.38, 0.72, 0.18, 0.1, 0.28, 0.68, 0.48, 0.38, 0.72, 0.55, 0.38, 0.52, 0.38, 0.5, 0.78, 4, 2, 4, 3, 2, 2, 2],
        "description": "Develop and improve food products ensuring safety, quality and nutrition",
        "required_skills": ["Food Science","Quality Control","HACCP","Food Safety Regulations","Lab Techniques"],
        "nice_to_have": ["R&D","Food Biotechnology","Packaging Technology"],
        "avg_salary_inr": "3–12 LPA", "avg_salary_usd": "$40k–80k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Bangalore","Pune","Hyderabad"],
        "courses": [{"name":"FSSAI Training","url":"https://fssai.gov.in","free":True}],
    },

    # ════════════════════════════════════════════════════════
    # 🏨 HOSPITALITY (3 careers)
    # ════════════════════════════════════════════════════════

    "Hotel Manager": {
        "stream": "Hospitality",
        "profile": [0.58, 0.72, 0.65, 0.88, 0.72, 0.82, 0.75, 0.72, 0.28, 0.68, 0.52, 0.62, 0.82, 0.72, 0.92, 0.82, 0.85, 0.72, 0.58, 0.68, 0.82, 0.28, 0.45, 0.1, 0.1, 0.42, 0.58, 0.62, 0.62, 0.22, 0.28, 0.72, 0.82, 0.75, 0.78, 0.75, 4, 2, 4, 5, 1, 1, 4],
        "description": "Oversee all operations of a hotel ensuring excellent guest experience",
        "required_skills": ["Hotel Operations","Revenue Management","F&B Management","Customer Service","Team Leadership"],
        "nice_to_have": ["Yield Management","Digital Marketing","OTA Management"],
        "avg_salary_inr": "5–20 LPA", "avg_salary_usd": "$45k–100k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Goa","Bangalore","Tourist destinations"],
        "courses": [{"name":"IHM Hotel Management","url":"https://nchmct.org","free":False}],
    },
    "Chef / Culinary Artist": {
        "stream": "Hospitality",
        "profile": [0.52, 0.65, 0.62, 0.72, 0.62, 0.72, 0.72, 0.65, 0.35, 0.65, 0.88, 0.52, 0.62, 0.58, 0.78, 0.62, 0.72, 0.58, 0.92, 0.65, 0.78, 0.22, 0.42, 0.1, 0.1, 0.72, 0.52, 0.58, 0.38, 0.18, 0.25, 0.52, 0.72, 0.58, 0.52, 0.68, 5, 2, 3, 5, 1, 1, 3],
        "description": "Create and prepare culinary experiences in restaurants, hotels and food businesses",
        "required_skills": ["Culinary Arts","Menu Planning","Kitchen Management","Food Safety","Creativity"],
        "nice_to_have": ["Pastry","International Cuisine","Restaurant Management","Food Styling"],
        "avg_salary_inr": "3–15 LPA", "avg_salary_usd": "$30k–80k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Bangalore","Goa","Tourist destinations"],
        "courses": [{"name":"IHM Culinary Arts","url":"https://nchmct.org","free":False}],
    },
    "Travel & Tourism Manager": {
        "stream": "Hospitality",
        "profile": [0.52, 0.68, 0.6, 0.88, 0.65, 0.78, 0.72, 0.68, 0.28, 0.68, 0.58, 0.62, 0.75, 0.65, 0.92, 0.72, 0.78, 0.65, 0.65, 0.68, 0.75, 0.28, 0.42, 0.1, 0.1, 0.48, 0.58, 0.68, 0.55, 0.22, 0.28, 0.68, 0.82, 0.72, 0.68, 0.72, 4, 2, 3, 5, 1, 1, 3],
        "description": "Plan and manage travel experiences, tours and tourism products",
        "required_skills": ["Travel Planning","GDS Systems","Customer Service","Tourism Marketing","Geography"],
        "nice_to_have": ["Sustainable Tourism","Digital Marketing","IATA Certification"],
        "avg_salary_inr": "3–12 LPA", "avg_salary_usd": "$35k–75k",
        "growth_rate": "High", "job_locations": ["Delhi","Mumbai","Bangalore","Goa","Jaipur"],
        "courses": [{"name":"IATA Training","url":"https://iata.org/training","free":False}],
    },

    # ════════════════════════════════════════════════════════
    # 💰 FINANCE (4 careers)
    # ════════════════════════════════════════════════════════

    "Stock Broker / Trader": {
        "stream": "Finance",
        "profile": [0.65, 0.88, 0.9, 0.78, 0.68, 0.78, 0.88, 0.88, 0.22, 0.88, 0.28, 0.35, 0.82, 0.82, 0.78, 0.68, 0.68, 0.38, 0.45, 0.85, 0.88, 0.38, 0.88, 0.1, 0.1, 0.22, 0.88, 0.52, 0.95, 0.28, 0.35, 0.5, 0.68, 0.55, 0.88, 0.78, 4, 1, 5, 3, 3, 1, 2],
        "description": "Buy and sell securities on behalf of clients or for proprietary trading",
        "required_skills": ["NCFM/NISM Certification","Technical Analysis","Market Knowledge","Risk Management","Excel"],
        "nice_to_have": ["Algo Trading","Python","Bloomberg","Options Strategies"],
        "avg_salary_inr": "5–30 LPA (+ variable)", "avg_salary_usd": "$60k–200k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Ahmedabad","Bangalore"],
        "courses": [{"name":"NSE Academy","url":"https://nseindia.com","free":True}],
    },
    "Insurance Underwriter": {
        "stream": "Finance",
        "profile": [0.6, 0.82, 0.82, 0.72, 0.52, 0.78, 0.82, 0.82, 0.18, 0.82, 0.25, 0.38, 0.58, 0.85, 0.72, 0.58, 0.72, 0.42, 0.35, 0.82, 0.9, 0.32, 0.72, 0.1, 0.1, 0.18, 0.78, 0.48, 0.82, 0.32, 0.35, 0.45, 0.58, 0.52, 0.75, 0.78, 3, 1, 4, 3, 2, 1, 2],
        "description": "Evaluate insurance applications and determine coverage terms and premiums",
        "required_skills": ["Risk Assessment","Insurance Products","Underwriting Principles","Data Analysis"],
        "nice_to_have": ["Actuarial Knowledge","NISM Certification","Claims Management"],
        "avg_salary_inr": "4–15 LPA", "avg_salary_usd": "$50k–100k",
        "growth_rate": "Moderate", "job_locations": ["Mumbai","Delhi","Bangalore","Hyderabad"],
        "courses": [{"name":"Insurance Institute of India","url":"https://insuranceinstituteofindia.com","free":False}],
    },
    "Wealth Manager / Financial Planner": {
        "stream": "Finance",
        "profile": [0.65, 0.85, 0.85, 0.85, 0.68, 0.75, 0.85, 0.85, 0.2, 0.85, 0.32, 0.42, 0.78, 0.8, 0.88, 0.72, 0.72, 0.5, 0.42, 0.82, 0.88, 0.38, 0.82, 0.1, 0.1, 0.22, 0.85, 0.55, 0.92, 0.28, 0.35, 0.55, 0.75, 0.62, 0.88, 0.8, 4, 2, 5, 4, 2, 1, 3],
        "description": "Help high net worth individuals manage investments, taxes and financial planning",
        "required_skills": ["CFP","Investment Planning","Tax Planning","Estate Planning","Client Relationship"],
        "nice_to_have": ["CFA","Portfolio Management","Alternative Investments"],
        "avg_salary_inr": "6–25 LPA", "avg_salary_usd": "$65k–150k",
        "growth_rate": "High", "job_locations": ["Mumbai","Delhi","Bangalore","Hyderabad","Ahmedabad"],
        "courses": [{"name":"CFP Certification India","url":"https://fpsb.in","free":False}],
    },
    "Fintech Product Manager": {
        "stream": "Finance",
        "profile": [0.72, 0.85, 0.78, 0.85, 0.72, 0.75, 0.85, 0.85, 0.22, 0.85, 0.48, 0.45, 0.82, 0.72, 0.88, 0.78, 0.78, 0.48, 0.65, 0.8, 0.85, 0.62, 0.72, 0.1, 0.1, 0.38, 0.85, 0.62, 0.78, 0.3, 0.38, 0.58, 0.78, 0.65, 0.85, 0.8, 6, 3, 5, 5, 2, 1, 3],
        "description": "Define and build financial technology products like payment apps, lending platforms and digital banking",
        "required_skills": ["Product Management","Financial Regulations","UX","Agile","Data Analytics"],
        "nice_to_have": ["API Banking","Blockchain","RBI Regulations","SQL"],
        "avg_salary_inr": "12–40 LPA", "avg_salary_usd": "$90k–170k",
        "growth_rate": "Explosive", "job_locations": ["Bangalore","Mumbai","Hyderabad","Delhi","Remote"],
        "courses": [{"name":"Product School Fintech","url":"https://productschool.com","free":False}],
    },

    # ════════════════════════════════════════════════════════
    # 🏋️ SPORTS (2 careers)
    # ════════════════════════════════════════════════════════

    "Sports Coach / Athletic Trainer": {
        "stream": "Sports",
        "profile": [0.55, 0.72, 0.62, 0.82, 0.68, 0.85, 0.75, 0.7, 0.5, 0.72, 0.35, 0.72, 0.68, 0.62, 0.88, 0.75, 0.82, 0.78, 0.55, 0.72, 0.82, 0.22, 0.42, 0.12, 0.1, 0.28, 0.55, 0.55, 0.32, 0.18, 0.28, 0.88, 0.78, 0.72, 0.52, 0.72, 3, 1, 3, 5, 1, 1, 3],
        "description": "Train athletes to improve performance and prevent injuries",
        "required_skills": ["Sports Science","Training Methodology","Nutrition","Sports Psychology","First Aid"],
        "nice_to_have": ["Sports Analytics","Video Analysis","Strength & Conditioning"],
        "avg_salary_inr": "3–15 LPA", "avg_salary_usd": "$35k–80k",
        "growth_rate": "High", "job_locations": ["Delhi","Mumbai","Bangalore","SAI Centers"],
        "courses": [{"name":"NIS Patiala","url":"https://nis.edu.in","free":False}],
    },
    "Sports Analyst": {
        "stream": "Sports",
        "profile": [0.58, 0.85, 0.82, 0.78, 0.52, 0.72, 0.82, 0.82, 0.35, 0.85, 0.42, 0.55, 0.58, 0.68, 0.78, 0.55, 0.68, 0.52, 0.55, 0.82, 0.85, 0.45, 0.72, 0.1, 0.1, 0.32, 0.8, 0.62, 0.42, 0.28, 0.32, 0.58, 0.72, 0.58, 0.55, 0.75, 5, 1, 4, 4, 1, 2, 2],
        "description": "Analyze sports data and performance metrics to inform coaching and strategy decisions",
        "required_skills": ["Data Analysis","Statistics","Python/R","Video Analysis","Sports Knowledge"],
        "nice_to_have": ["Machine Learning","Biomechanics","Wearable Tech","Tableau"],
        "avg_salary_inr": "3–15 LPA", "avg_salary_usd": "$40k–90k",
        "growth_rate": "Very High", "job_locations": ["Bangalore","Mumbai","Delhi","Remote"],
        "courses": [{"name":"Coursera Sports Analytics","url":"https://coursera.org","free":False}],
    },
}

# ─── Derived helpers ──────────────────────────────────────────────────────────

CAREER_NAMES = sorted(ALL_CAREERS.keys())

def get_career_profiles():
    return {name: data["profile"] for name, data in ALL_CAREERS.items()}

def get_career_metadata():
    return {
        name: {k: v for k, v in data.items() if k != "profile"}
        for name, data in ALL_CAREERS.items()
    }

# Print summary when run directly
if __name__ == "__main__":
    from collections import Counter
    stream_counts = Counter(d["stream"] for d in ALL_CAREERS.values())
    print(f"Total careers: {len(ALL_CAREERS)}")
    print(f"Total features: {len(FEATURE_NAMES)}")
    print(f"Total streams: {len(STREAMS)}")
    for stream, count in sorted(stream_counts.items()):
        print(f"  {stream}: {count} careers")