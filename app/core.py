from app.qdrant_client import search_vector_store, add_to_vector_store
from app.embed import embed_text
from app.summarize import summarize_answers
from app.fallback import fetch_fallback_sources
from app.gemini import get_gemini_suggestions
import json

async def solve_error(error: str, error_title: str = None):
    query_vector = embed_text(error)
    results = search_vector_store(query_vector)

    # Get Gemini suggestions
    gemini_suggestions = await get_gemini_suggestions(error)

    if results and len(results) > 0 and results[0]["score"] > 0.75:
        # Get top 3 matches
        top_matches = results[:3]
        summary = await summarize_answers(top_matches)
        
        # Store in Qdrant
        add_to_vector_store(
            vector=query_vector,
            payload={
                "error": error,
                "error_title": error_title or error[:100],  # Use first 100 chars if no title provided
                "source": "vector-db",
                "matches": json.dumps(top_matches),
                "summary": summary,
                "gemini_suggestions": json.dumps(gemini_suggestions),
                "type": "error_solution"
            }
        )
        
        return {
            "source": "vector-db",
            "matches": top_matches,
            "summary": summary,
            "gemini_suggestions": gemini_suggestions
        }
    
    fallback_results = await fetch_fallback_sources(error)
    top_3_ranked = fallback_results[:3]
    summary = await summarize_answers(top_3_ranked)

    # Store in Qdrant
    add_to_vector_store(
        vector=query_vector,
        payload={
            "error": error,
            "error_title": error_title or error[:100],  # Use first 100 chars if no title provided
            "source": "live-fetch",
            "matches": json.dumps(top_3_ranked),
            "summary": summary,
            "gemini_suggestions": json.dumps(gemini_suggestions),
            "type": "error_solution"
        }
    )

    return {
        "source": "live-fetch",
        "matches": top_3_ranked,
        "summary": summary,
        "gemini_suggestions": gemini_suggestions
    }