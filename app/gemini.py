import google.generativeai as genai
import os
import json
import asyncio
from app.config import GEMINI_API_KEY
import re

# Global model variable, will be initialized later
model = None

def initialize_gemini_model():
    global model
    if model is not None: # Avoid re-initializing if already done
        return
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("models/gemini-1.5-flash")

def parse_nested_json_string(text_content):
    # This function extracts and parses JSON embedded within markdown code blocks
    # It's specifically for handling cases where Gemini might return JSON as a string
    # wrapped in markdown, like '```json\n{...}\n```'
    json_match = re.search(r'```json\n(.*)\n```', text_content, re.DOTALL)
    if json_match:
        json_string = json_match.group(1)
        try:
            return json.loads(json_string)
        except json.JSONDecodeError:
            pass
    return text_content # Return original if no valid JSON found or not a string

async def get_gemini_suggestions(error: str) -> dict:
    """
    Get suggestions from Gemini about the error and potential fixes.
    """
    # Ensure model is initialized before use
    if model is None:
        raise RuntimeError("Gemini model not initialized. Call initialize_gemini_model() first.")

    try:
        prompt = f"""Given the following error message, provide:
1. A brief analysis of what might be causing the error
2. Specific suggestions for fixing the error
3. Best practices to prevent similar errors in the future

Error message: {error}

Please format your response as a JSON object with these keys:
- analysis: A brief explanation of the error
- suggestions: A list of specific fixes
- best_practices: A list of preventive measures
"""

        response = model.generate_content(prompt)
        
        try:
            # Try to parse the response as JSON
            suggestions = json.loads(response.text)
            return {
                "analysis": suggestions.get("analysis", ""),
                "suggestions": suggestions.get("suggestions", []),
                "best_practices": suggestions.get("best_practices", [])
            }
        except json.JSONDecodeError:
            # If the response isn't valid JSON, return a formatted version
            return {
                "analysis": "Error analysis from Gemini",
                "suggestions": [response.text],
                "best_practices": []
            }
            
    except Exception as e:
        return {
            "analysis": f"Unable to get Gemini suggestions: {str(e)}",
            "suggestions": [],
            "best_practices": []
        }

# async def summarize_answers(results: list) -> str:
#     """
#     Summarize the search results using Gemini.
    
#     Args:
#         results: List of dictionaries containing search results with 'content' field
        
#     Returns:
#         str: Summarized text of the search results
#     """
#     if not results:
#         return "No relevant results found."
    
#     # Prepare the content for summarization
#     content_to_summarize = "\n\n".join([
#         f"Result {i+1}:\n{r['content']}"
#         for i, r in enumerate(results)
#     ])
    
#     # Create the prompt for summarization
#     prompt = f"""Please summarize the following error solutions in a clear and concise way. 
#     Focus on the most important points and practical steps to resolve the issue:

#     {content_to_summarize}
    
#     Provide a clear, step-by-step summary that would help someone solve this error.
#     """
    
#     try:
#         response = model.generate_content(prompt)
#         return response.text
#     except Exception as e:
#         return f"Error generating summary: {str(e)}" 