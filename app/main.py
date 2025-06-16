from fastapi import FastAPI
from app.core import solve_error
from pydantic import BaseModel

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # or ["POST", "GET", "OPTIONS"] etc.
    allow_headers=["*"],
)


class ErrorRequest(BaseModel):
    error: str
    error_title: str | None = None

@app.post("/solve_error")
async def solve_error_endpoint(request: ErrorRequest):
    result = await solve_error(request.error, request.error_title)
    return result 