from rest_framework.response    import Response                             # type: ignore
from rest_framework.decorators  import api_view, permission_classes         # type: ignore
from rest_framework.permissions import IsAuthenticated                      # type: ignore
import google.generativeai as genai                                         # type: ignore
import os

@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/gemini-api/get-weekly-routine",
    ]
    return Response(routes)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getWeeklyRoutine(request):
    genai.configure(api_key="AIzaSyBFgc9r7SU0YS5fu0LGkMBD9pjxLzpseaU")
    model = genai.GenerativeModel("gemini-1.5-flash")

    # response = model.generate_content("Write a story about a magic backpack.")
    # print(response.text)

    history=[
        {"role": "user", "parts": "Hello"},
        {"role": "model", "parts": "Great to meet you. What would you like to know?"},
    ]
    chat = model.start_chat(history=history,)
    response = chat.send_message("I have 2 dogs in my house.")
    print(response.text)
    response = chat.send_message("How many paws are in my house?")
    print(response.text)

    return