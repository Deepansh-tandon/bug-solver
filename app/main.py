from fastapi import FastAPI
from app.core import solve_error
from pydantic import BaseModel
from dotenv import load_dotenv
from app.qdrant_client import initialize_qdrant_client
from app.gemini import initialize_gemini_model

# Load environment variables from .env file
load_dotenv()

# Initialize external clients AFTER environment variables are loaded
initialize_qdrant_client()
initialize_gemini_model()

app = FastAPI()

class ErrorRequest(BaseModel):
    error: str
    error_title: str | None = None

@app.post("/solve_error")
async def solve_error_endpoint(request: ErrorRequest):
    result = await solve_error(request.error, request.error_title)
    return result 