import google.generativeai as genai
from app.config import GEMINI_API_KEY

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Use the specified model
model = genai.GenerativeModel("models/gemini-1.5-flash")

async def summarize_answers(results: list) -> str:
    """
    Summarize the search results using Gemini.
    
    Args:
        results: List of dictionaries containing search results with 'content' field
        
    Returns:
        str: Summarized text of the search results
    """
    if not results:
        return "No relevant results found."
    
    # Prepare the content for summarization
    content_to_summarize = "\n\n".join([
        f"Result {i+1}:\n{r['content']}"
        for i, r in enumerate(results)
    ])
    
    # Create the prompt for summarization
    prompt = f"""Please summarize the following error solutions in a clear and concise way. 
    Focus on the most important points and practical steps to resolve the issue:

    {content_to_summarize}
    
    Provide a clear, step-by-step summary that would help someone solve this error.
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating summary: {str(e)}" 