import requests
from django.conf import settings

RAWG_BASE_URL = "https://api.rawg.io/api"


def buscar_juegos(query, page_size=10):
    respuesta = requests.get(
        f"{RAWG_BASE_URL}/games",
        params={"key": settings.RAWG_API_KEY, "search": query, "page_size": page_size},
        timeout=5,
    )
    respuesta.raise_for_status()
    data = respuesta.json()

    resultados = []
    for juego in data.get("results", []):
        resultados.append({
            "rawg_id": juego["id"],
            "titulo": juego["name"],
            "portada_url": juego.get("background_image"),
            "fecha_lanzamiento": juego.get("released"),
            "metacritic": juego.get("metacritic"),
            "generos": ", ".join(g["name"] for g in juego.get("genres", [])),
            "plataformas": ", ".join(p["platform"]["name"] for p in juego.get("platforms", [])),
        })
    return resultados