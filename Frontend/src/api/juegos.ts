import { apiClient } from "./client";
import type { ResultadoJuego } from "../types/juego";

export async function buscarJuegos(query: string): Promise<ResultadoJuego[]> {
  const { data } = await apiClient.get<ResultadoJuego[]>("/juegos/buscar/", {
    params: { q: query },
  });
  return data;
}
