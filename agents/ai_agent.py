import os
from dotenv import load_dotenv
from pathlib import Path
from google import genai

# Load .env properly
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

api_key = os.getenv("GEMINI_API_KEY")

print("DEBUG KEY:", api_key)

# 🚨 Safety check
if not api_key:
    raise ValueError("API key not loaded. Check .env file.")

client = genai.Client(api_key=api_key)

# ✅ MAKE SURE THIS FUNCTION EXISTS
def handle_ai(user_input):
    try:
        response = client.models.generate_content(
            model="models/gemini-1.5-flash",
            contents=user_input
        )
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"
