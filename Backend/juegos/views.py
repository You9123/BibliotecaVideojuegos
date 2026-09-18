from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import buscar_juegos


@api_view(["GET"])
def buscar_juegos_view(request):
    query = request.GET.get("q", "")
    if not query:
        return Response({"error": "Falta el parámetro q"}, status=400)
    return Response(buscar_juegos(query))