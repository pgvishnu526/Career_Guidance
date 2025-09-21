import google.generativeai as genai
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .utils import load_career_data
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure Gemini with API key from environment
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY environment variable is not set. Please create a .env file with your API key.")

genai.configure(api_key=api_key)

careers = load_career_data()

# Preprocess for retrieval
documents = [c["description"] + " " + " ".join(c["skills_core"]) for c in careers]
vectorizer = TfidfVectorizer()
doc_vectors = vectorizer.fit_transform(documents)

def retrieve_context(query: str, top_k: int = 3):
    query_vec = vectorizer.transform([query])
    scores = cosine_similarity(query_vec, doc_vectors).flatten()
    top_indices = scores.argsort()[-top_k:][::-1]
    return [careers[i] for i in top_indices]

def generate_response(query: str):
    try:
        context = retrieve_context(query)
        context_text = "\n".join([
            f"- {c['role']}: {c['description']} (Skills: {', '.join(c['skills_core'])})"
            for c in context
        ])

        prompt = f"""
        You are a career guidance assistant. 
        User Query: {query}

        Here are some relevant careers:
        {context_text}

        Based on this, provide a personalized suggestion to the user.
        """

        # ✅ Updated model to gemini-1.5-flash
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)

        return {"suggestion": response.text, "matches": context}
    
    except Exception as e:
        return {"error": f"An error occurred: {str(e)}", "suggestion": "Sorry, I couldn't process your request at the moment."}