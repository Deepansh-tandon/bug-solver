from sentence_transformers import SentenceTransformer

# Initialize the model
model = SentenceTransformer('all-MiniLM-L6-v2')

def embed_text(text: str) -> list:
    """Convert text to embedding vector using sentence transformer"""
    # Encode the text
    embedding = model.encode(text)
    # Convert to list
    return embedding.tolist()
