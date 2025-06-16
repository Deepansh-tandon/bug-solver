from qdrant_client import QdrantClient
from qdrant_client.http import models
from app.config import QDRANT_URL, QDRANT_API_KEY, SIMILARITY_THRESHOLD
import hashlib
import json

client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY,
)

# Initialize collection if it doesn't exist
try:
    client.get_collection("errors")
except Exception:
    client.create_collection(
        collection_name="errors",
        vectors_config=models.VectorParams(
            size=384,  # Size of the vectors from your embedding model
            distance=models.Distance.COSINE
        )
    )

def search_vector_store(vector: list, top_k: int = 5):
    results = client.search(
        collection_name="errors",
        query_vector=vector,
        limit=top_k,
    )
    return [
        {
            "title": r.payload.get("title", ""),
            "url": r.payload.get("url", ""),
            "content": r.payload.get("content", ""),
            "score": r.score,
            "error": r.payload.get("error", ""),
            "error_title": r.payload.get("error_title", ""),
            "source": r.payload.get("source", ""),
            "matches": r.payload.get("matches", []),
            "summary": r.payload.get("summary", ""),
            "gemini_suggestions": r.payload.get("gemini_suggestions", {})
        }
        for r in results
    ]

def add_to_vector_store(vector: list, payload: dict):
    """
    Add a new vector to the store with its associated payload.
    
    Args:
        vector: The vector to store
        payload: Dictionary containing the payload data
    """
    # Generate a positive integer ID using MD5 hash
    error_text = payload["error"]
    id_hash = int(hashlib.md5(error_text.encode()).hexdigest(), 16) % (2**63)  # Ensure positive 64-bit integer
    
    # Add a top-level 'title' field to the payload
    if "error_title" in payload and payload["error_title"]:
        payload["title"] = payload["error_title"]
    elif "error" in payload and payload["error"]:
        payload["title"] = payload["error"].split('\n')[0][:100]  # Use first line of error or first 100 chars
    else:
        payload["title"] = "No Title Provided"  # Default title

    # Ensure matches is stored as JSON string as it is not retrieved and used by the qdrant client
    if "matches" in payload and not isinstance(payload["matches"], str):
        payload["matches"] = json.dumps(payload["matches"])
    
    # Ensure gemini_suggestions is stored as JSON string
    if "gemini_suggestions" in payload and not isinstance(payload["gemini_suggestions"], str):
        payload["gemini_suggestions"] = json.dumps(payload["gemini_suggestions"])
            
    client.upsert(
        collection_name="errors",
        points=[
            models.PointStruct(
                id=id_hash,
                vector=vector,
                payload=payload
            )
        ]
    )
