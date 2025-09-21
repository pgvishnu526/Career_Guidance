import google.generativeai as genai
import os

# Test with direct key
API_KEY = "AIzaSyAt-jky6f9Ti2N9i1-afJvoK2D87aNjTqM"  # Replace with your actual key

try:
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Hello")
    print("API Key is valid!")
    print(response.text)
except Exception as e:
    print(f"Error: {e}")