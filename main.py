from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from agents.main_agent import route_request

# 👇 IMPORTANT (force database load)
from Database.db import conn

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestModel(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "Multi-Agent Assistant is running 🚀"}

@app.post("/chat")
def chat(request: RequestModel):
    response = route_request(request.message)
    return {"response": response}