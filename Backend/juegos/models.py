from django.db import models
from django.contrib.auth.models import User


class Juego(models.Model):
    """Catálogo de juegos, alimentado desde RAWG. Existe una sola vez por juego."""
    rawg_id = models.IntegerField(unique=True)
    titulo = models.CharField(max_length=255)
    portada_url = models.URLField(blank=True, null=True)
    generos = models.CharField(max_length=255, blank=True)
    plataformas = models.CharField(max_length=255, blank=True)
    fecha_lanzamiento = models.DateField(blank=True, null=True)
    metacritic = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.titulo


class EstadoJuego(models.TextChoices):
    PENDIENTE = "pendiente", "Pendiente"
    JUGANDO = "jugando", "Jugando"
    COMPLETADO = "completado", "Completado"
    ABANDONADO = "abandonado", "Abandonado"


class JuegoUsuario(models.Model):
    """Tu registro personal sobre un juego: esto sí cambia con el tiempo."""
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="biblioteca")
    juego = models.ForeignKey(Juego, on_delete=models.CASCADE, related_name="entradas")
    estado = models.CharField(max_length=20, choices=EstadoJuego.choices, default=EstadoJuego.PENDIENTE)
    calificacion = models.PositiveSmallIntegerField(blank=True, null=True)  # 1 a 10
    horas_jugadas = models.DecimalField(max_digits=6, decimal_places=1, default=0)
    fecha_inicio = models.DateField(blank=True, null=True)
    fecha_fin = models.DateField(blank=True, null=True)
    resena = models.TextField(blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("usuario", "juego")

    def __str__(self):
        return f"{self.usuario.username} - {self.juego.titulo} ({self.estado})"