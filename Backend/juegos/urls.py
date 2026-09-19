from django.urls import path
from .views import buscar_juegos_view, agregar_a_biblioteca

urlpatterns = [
    path("buscar/", buscar_juegos_view, name="buscar-juegos"),
    path("agregar/", agregar_a_biblioteca, name="agregar-a-biblioteca"),
]