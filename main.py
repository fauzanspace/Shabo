from fastapi import FastAPI, HTTPException
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
    question_count: int = 5 

class InterviewSubmission(BaseModel):
    job_description: str
    question_text: str
    answer_text: str

# --- ENDPOINT 1: QUESTION GENERATOR ---
@app.post("/api/v1/generate_questions")
def generate_questions(setup: JobSetup):
    prompt = f"""
    Act as an expert Technical Recruiter. Generate exactly {setup.question_count} interview questions for this job:
    "{setup.job_description}"
    
    CRITICAL QUESTION WRITING RULES:
    1. THE ONE-BREATH RULE: Keep it concise. The candidate must be able to grasp the question instantly.
    2. NO COMPOUND QUESTIONS: Ask ONE specific thing per question. Never string multiple questions together.
    3. BE CONVERSATIONAL: Write the question exactly as a human recruiter would speak it naturally out loud. 
    
    Mode constraints:
    - If mode is "Quick Practice", ask one short, standard behavioral question.
    - If mode is "Job-Specific", pose one realistic technical scenario based strictly on the job description.
    - If mode is "Stress Mode", ask one direct, high-pressure question about a failure or critical edge-case.
    - If mode is "Beginner Mode", ask one simple, encouraging question about their foundational understanding.
    
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
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash-lite',
            contents=prompt,
            config={'response_mime_type': 'application/json'}
        )
        
        raw_text = response.text.strip()
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]
            
        return json.loads(raw_text.strip())
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")

# --- ENDPOINT 2: ANSWER EVALUATOR ---
@app.post("/api/v1/evaluate_answer")
def evaluate_answer(submission: InterviewSubmission):
    try:
        # 1. THE FAST-FAIL INTERCEPTOR
        cleaned_answer = submission.answer_text.strip().lower()
        word_count = len(cleaned_answer.split())
        
        if word_count < 5 or cleaned_answer in ["pass", "skip", "i don't know"]:
            return {
                "delivery_metrics": {"status": "Skipped", "confidence_score": 0.0},
                "logic_metrics": {
                    "star_method_used": False,
                    "missing_elements": ["Situation", "Task", "Action", "Result"],
                    "logic_score": 0,
                    "feedback": "You skipped the question or provided an insufficient answer. A real interview requires a complete narrative.",
                    "perfect_sample_answer": "Since you skipped this question, here is a general tip: A strong response here would clearly outline the specific Situation you faced, the Task you were responsible for, the Action you took to solve the problem, and the measurable Result of your work."
                }
            }

        # 2. Normal ML Clarity Check
        vectorized_text = tfidf.transform([submission.answer_text])
        clarity_prob = model.predict_proba(vectorized_text)[0][1] * 100
        clarity_status = "Action-Oriented" if clarity_prob > 50 else "Hesitant"

        # 3. Normal Gemini Logic Check (NOW WITH PERFECT SAMPLE ANSWER)
        prompt = f"""
        Act as a strict Technical Recruiter evaluating an interview answer.
        
        Evaluate normally using the STAR method based on:
        Job Description: {submission.job_description}
        Question Asked: {submission.question_text}
        Candidate Answer: {submission.answer_text}
        
        Return a valid JSON object with this exact structure:
        {{
            "star_method_used": true/false,
            "missing_elements": ["List missing STAR elements"],
            "logic_score": [Rate 0-10],
            "feedback": "Two sentences of direct, actionable feedback.",
            "perfect_sample_answer": "A concise, 10/10 example of how the candidate SHOULD have answered using the STAR method based on their scenario."
        }}
        """
        
        response = client.models.generate_content(
            model='gemini-2.5-flash-lite',
            contents=prompt,
            config={'response_mime_type': 'application/json'}
        )
        
        raw_text = response.text.strip()
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]
            
        llm_evaluation = json.loads(raw_text.strip())
        
        return {
            "delivery_metrics": {"status": clarity_status, "confidence_score": round(clarity_prob, 2)},
            "logic_metrics": llm_evaluation
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Evaluation Error: {str(e)}")