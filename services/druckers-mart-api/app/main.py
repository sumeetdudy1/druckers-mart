from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import enquiries
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "").split(","),
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(enquiries.router)

@app.get("/api/health")
async def health():
    return {"status": "ok"}