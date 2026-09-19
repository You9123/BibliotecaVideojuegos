from rest_framework import serializers
from .models import JuegoUsuario


class JuegoUsuarioSerializer(serializers.ModelSerializer):
    titulo = serializers.CharField(source="juego.titulo", read_only=True)
    portada_url = serializers.URLField(source="juego.portada_url", read_only=True)

    class Meta:
        model = JuegoUsuario
        fields = [
            "id",
            "estado",
            "calificacion",
            "horas_jugadas",
            "fecha_inicio",
            "fecha_fin",
            "resena",
            "titulo",
            "portada_url",
        ]