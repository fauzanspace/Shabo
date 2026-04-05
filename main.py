from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
from google import genai
import json
import os

app = FastAPI(title="AI Interview Simulator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

# WARNING: Use environment variables in production!
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

print("Loading ML models...")
model = joblib.load('clarity_classifier.pkl')
tfidf = joblib.load('tfidf_vectorizer.pkl')
print("Models loaded successfully!")

# --- DATA STRUCTURES ---
class JobSetup(BaseModel):
    job_description: str
    mode: str
    question_count: int = 5 # <-- NEW: Tells FastAPI to expect the number from React

class InterviewSubmission(BaseModel):
    job_description: str
    question_text: str
    answer_text: str

# --- ENDPOINT 1: QUESTION GENERATOR ---
@app.post("/api/v1/generate_questions")
async def generate_questions(setup: JobSetup):
    # NEW: The prompt now dynamically asks for exactly {setup.question_count} questions
    prompt = f"""
    Act as an expert Technical Recruiter. Generate exactly {setup.question_count} interview questions for this job:
    "{setup.job_description}"
    
    Mode constraints:
    - If mode is "Quick Practice", ask general behavioral questions.
    - If mode is "Job-Specific", tailor them highly to the job description.
    - If mode is "Stress Mode", make them highly technical, difficult, and high-pressure.
    - If mode is "Beginner Mode", keep them foundational and encouraging.
    
    Current Mode: {setup.mode}
    
    Return ONLY a valid JSON object with this exact structure:
    {{
        "questions": [
            {{
                "text": "The exact question to ask the candidate",
                "focus_skill": "The primary skill being tested"
            }}
        ]
    }}
    """
    
    response = client.models.generate_content(
        model='gemini-2.5-flash-lite',
        contents=prompt,
        config={'response_mime_type': 'application/json'}
    )
    return json.loads(response.text)

# --- ENDPOINT 2: ANSWER EVALUATOR ---
@app.post("/api/v1/evaluate_answer")
async def evaluate_answer(submission: InterviewSubmission):
    # Part A: Custom ML Clarity Check
    vectorized_text = tfidf.transform([submission.answer_text])
    clarity_prob = model.predict_proba(vectorized_text)[0][1] * 100
    clarity_status = "Action-Oriented" if clarity_prob > 50 else "Hesitant"

    # Part B: Gemini Logic Check
    prompt = f"""
    Act as a Recruiter evaluating an interview answer.
    Job Description: {submission.job_description}
    Question Asked: {submission.question_text}
    Candidate Answer: {submission.answer_text}
    
    Evaluate if they answered the specific question logically and used the STAR method.
    
    Return a valid JSON object with this exact structure:
    {{
        "star_method_used": true/false,
        "missing_elements": ["List missing STAR elements"],
        "logic_score": [Rate 1-10],
        "feedback": "Two sentences of direct, actionable feedback."
    }}
    """
    
    response = client.models.generate_content(
        model='gemini-2.5-flash-lite',
        contents=prompt,
        config={'response_mime_type': 'application/json'}
    )
    llm_evaluation = json.loads(response.text)
    
    return {
        "delivery_metrics": {"status": clarity_status, "confidence_score": round(clarity_prob, 2)},
        "logic_metrics": llm_evaluation
    }