from django.urls import path
from .views import buscar_juegos_view

urlpatterns = [
    path("buscar/", buscar_juegos_view, name="buscar-juegos"),
]