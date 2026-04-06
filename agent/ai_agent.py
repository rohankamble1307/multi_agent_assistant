from google import genai
from google.genai import types

# Initialize client
client = genai.Client(api_key="AIzaSyBTx3DdrsZvfA9AZn-StQ4bFFTVHZCfkwE")

def handle_ai(user_input):
    try:
        response = client.models.generate_content(
            model="models/gemini-2.5-flash",
            contents=user_input
        )
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"