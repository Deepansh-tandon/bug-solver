import os


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
# GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")  # optional
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
SIMILARITY_THRESHOLD = float(os.getenv("SIMILARITY_THRESHOLD", 0.75))