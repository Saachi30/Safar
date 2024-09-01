import os
import google.generativeai as genai
from django.http import JsonResponse
from dotenv import load_dotenv
from django.views.decorators.csrf import csrf_exempt

# Load environment variables from .env file
load_dotenv()

# Configure the SDK with your API key from the environment variable
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

@csrf_exempt
def generate_travel_plan(request):
    if request.method == 'POST':
        # Get the form data from the request
        location = request.POST.get('location')
        days = request.POST.get('days')
        companion = request.POST.get('companion')
        budget = request.POST.get('budget')

        # Create the model configuration
        generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 8192,
            "response_mime_type": "application/json",
        }

        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            generation_config=generation_config,
        )

        chat_session = model.start_chat(
            history=[
                {
                    "role": "user",
                    "parts": [
                        f"Generate travel plan for Location - {location}, for {days} days for {companion} with a budget range {budget}. Give me an itinerary of locations around {location} with placeName, place details, place image url, geo coordinates, ticket pricing and give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions, and Time to travel each location for {days} days with each day plan with the best time to visit in JSON format.",
                    ],
                },
            ]
        )

        # Send a message to the chat session with the input text
        response = chat_session.send_message(
            f"Generate travel plan for Location - {location}, for {days} days for {companion} with a budget range {budget}. Give me an itinerary of locations around {location} with placeName, place details, place image url, geo coordinates, ticket pricing and give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions, and Time to travel each location for {days} days with each day plan with the best time to visit in JSON format.")

        # Return the response as JSON
        return JsonResponse({"response": response.text})