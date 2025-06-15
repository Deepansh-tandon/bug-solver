from fastapi import APIRouter, Query
from app.core import solve_error
from app.models import SolutionResponse

router=APIRouter()

@router.get("/solve",response_model=SolutionResponse)
async def solve(error:Query(..., description="Paste your error messaage")):
    return await solve_error(error)