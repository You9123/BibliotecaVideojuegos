from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .services import buscar_juegos
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from .models import Juego, JuegoUsuario
from .serializers import JuegoUsuarioSerializer


@api_view(["GET"])
def buscar_juegos_view(request):
    query = request.GET.get("q", "")
    if not query:
        return Response({"error": "Falta el parámetro q"}, status=400)
    return Response(buscar_juegos(query))

@api_view(["POST"])
@permission_classes([AllowAny]) # TEMPORAL: hasta que agreguemos login real
def agregar_a_biblioteca(request):
    usuario = User.objects.first()  # Para simplificar, usamos el primer usuario
    if usuario is None:
        return Response(
            {"error": "No hay ningun usuario. Corre createsuperuser primero"},
            status=400,
        )
        
    data = request.data
    if "rawg_id" not in data:
        return Response({"error": "Falta rawg_id"}, status=400)

    juego, _ = Juego.objects.get_or_create(
        rawg_id=data["rawg_id"],
        defaults={
            "titulo": data.get("titulo", ""),
            "portada_url": data.get("portada_url", ""),
            "generos": data.get("generos", ""),
            "plataformas": data.get("plataformas", ""),
            "fecha_lanzamiento": data.get("fecha_lanzamiento") or None,
            "metacritic": data.get("metacritic"),
        },
    )
    
    entrada, creada = JuegoUsuario.objects.get_or_create(usuario=usuario, juego=juego)
    
    if not creada:
        return Response({"mensaje": "Este juego ya esta en la biblioteca"}, status=200)
    
    return Response(JuegoUsuarioSerializer(entrada).data, status=201)

@api_view(["GET"])
@permission_classes([AllowAny])  # TEMPORAL: hasta que agreguemos login real
def ver_biblioteca(request):
    usuario = User.objects.first()  # TEMPORAL: mientras no hay login
    if usuario is None:
        return Response([])

    entradas = JuegoUsuario.objects.filter(usuario=usuario).select_related("juego")
    return Response(JuegoUsuarioSerializer(entradas, many=True).data)