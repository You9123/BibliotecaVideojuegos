import { apiClient } from "./client";
import type { ResultadoJuego } from "../types/juego";
import type { EntradaBiblioteca } from "../types/juego";

export async function buscarJuegos(query: string): Promise<ResultadoJuego[]> {
  const { data } = await apiClient.get<ResultadoJuego[]>("/juegos/buscar/", {
    params: { q: query },
  });
  return data;
}

export async function agregarABiblioteca(juego: ResultadoJuego) {
  const { data } = await apiClient.post("/juegos/agregar/", juego);
  return data;
}

export async function verBiblioteca(): Promise<EntradaBiblioteca[]> {
  const { data } = await apiClient.get<EntradaBiblioteca[]>(
    "/juegos/biblioteca/",
  );
  return data;
}
