from flask import Flask, render_template, request, jsonify, redirect, url_for
from werkzeug.utils import secure_filename
import os
import logging
import json
import re
import requests
from docx import Document
import PyPDF2
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
XAI_API_KEY = os.getenv("XAI_API_KEY")
if not XAI_API_KEY:
    logging.error("XAI_API_KEY is not set in the environment variables.")
    raise EnvironmentError("XAI_API_KEY is required but missing.")

# Flask app initialization
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'pdf', 'docx'}
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Set up logging
logging.basicConfig(level=logging.DEBUG)


class RoadmapGenerator:
    """Handles roadmap and quiz generation, resume parsing, and API requests."""
    API_URL = "https://api.x.ai/v1/chat/completions"
    MODEL = "grok-2-1212"

    def __init__(self):
        self.roadmap_details = {}
        self.quiz_questions = {}

    @staticmethod
    def allowed_file(filename):
        """Validate file extension."""
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

    @staticmethod
    def send_api_request(prompt, max_tokens=500):
        """Send a prompt to the API and return the parsed response."""
        headers = {"Authorization": f"Bearer {XAI_API_KEY}"}
        payload = {
            "model": RoadmapGenerator.MODEL,
            "messages": [{"role": "system", "content": prompt}],
            "max_tokens": max_tokens,
        }

        try:
            response = requests.post(RoadmapGenerator.API_URL, json=payload, headers=headers)
            response.raise_for_status()
            logging.debug(f"API Response: {response.text}")
            response_data = response.json()
            if "choices" not in response_data or not response_data["choices"]:
                raise ValueError("API response does not contain 'choices'.")
            content = response_data["choices"][0]["message"]["content"].strip()
            if content.startswith("```json") and content.endswith("```"):
                content = content[7:-3].strip()
            return json.loads(content)
        except (json.JSONDecodeError, requests.exceptions.RequestException) as e:
            logging.error(f"API Request Error: {str(e)}")
            raise ValueError("Failed to process API response.")

    @staticmethod
    def parse_resume(file_path):
        """Extract experience and skills from a resume file."""
        try:
            text = ""
            if file_path.endswith(".pdf"):
                with open(file_path, "rb") as f:
                    pdf_reader = PyPDF2.PdfReader(f)
                    text = " ".join(page.extract_text() for page in pdf_reader.pages)
            elif file_path.endswith(".docx"):
                doc = Document(file_path)
                text = "\n".join(paragraph.text for paragraph in doc.paragraphs)

            experience = re.search(r"(Experience|Work History|Professional Experience):[\s\S]+?(?=\n\S+:|\Z)", text, re.IGNORECASE)
            skills = re.search(r"(Skills|Technical Skills|Core Competencies):[\s\S]+?(?=\n\S+:|\Z)", text, re.IGNORECASE)

            return {
                "experience": experience.group(0) if experience else None,
                "skills": skills.group(0) if skills else None,
            }
        except Exception as e:
            logging.error(f"Error parsing resume: {e}")
            return {"experience": None, "skills": None}

    def generate_roadmap(self, career_goal, resume_data=None):
        """Generate a detailed learning roadmap."""
        options = f"for someone with skills: {resume_data['skills']} and experience: {resume_data['experience']}" if resume_data else "for a beginner"
        prompt = f"Generate a learning roadmap {options} for a career goal: {career_goal}. Return as valid JSON."
        roadmap = self.send_api_request(prompt)
        self.roadmap_details = {str(i + 1): step for i, step in enumerate(roadmap)}
        return self.roadmap_details

    def generate_quiz(self, topic):
        """Generate quiz questions for a specific topic."""
        prompt = f"Generate 10 multiple-choice questions for the topic {topic}. Provide correct answers and return as JSON."
        quiz = self.send_api_request(prompt)
        self.quiz_questions = {str(i + 1): question for i, question in enumerate(quiz)}
        return self.quiz_questions


# Instantiate the generator
generator = RoadmapGenerator()


# Routes
@app.route("/", methods=["GET", "POST"])
def career_path():
    if request.method == "POST":
        career_goal = request.form.get("career_goal")
        resume = request.files.get("resume")

        if not career_goal:
            return render_template("index.html", error="Career goal is required.")

        # Parse resume if provided
        resume_data = None
        if resume and generator.allowed_file(resume.filename):
            filename = secure_filename(resume.filename)
            resume_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            resume.save(resume_path)
            resume_data = generator.parse_resume(resume_path)

        try:
            roadmap = generator.generate_roadmap(career_goal, resume_data)
            return render_template("roadmap.html", roadmap_nodes=list(roadmap.values()))
        except ValueError as e:
            return render_template("index.html", error=f"Error generating roadmap: {str(e)}")

    return render_template("index.html")


@app.route("/roadmap", methods=["GET"])
def roadmap():
    if not generator.roadmap_details:
        return render_template("roadmap.html", roadmap_nodes=None, error="Roadmap not available.")
    return render_template("roadmap.html", roadmap_nodes=list(generator.roadmap_details.values()))


@app.route("/step/<step_id>")
def step_details(step_id):
    step = generator.roadmap_details.get(step_id)
    if not step:
        return jsonify({"error": "Step not found"}), 404
    return render_template("step.html", step=step)


@app.route("/quiz/<step_id>")
def step_quiz(step_id):
    questions = generator.quiz_questions.get(step_id)
    if not questions:
        return jsonify({"error": "Quiz not found"}), 404
    return render_template("quiz.html", questions=questions)


if __name__ == "__main__":
    app.run(debug=True)
