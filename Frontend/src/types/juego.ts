export interface ResultadoJuego {
  rawg_id: number;
  titulo: string;
  portada_url: string | null;
  fecha_lanzamiento: string | null;
  metacritic: number | null;
  generos: string;
  plataformas: string;
}

export type EstadoJuego = "pendiente" | "jugando" | "completado" | "abandonado";

export interface EntradaBiblioteca {
  id: number;
  titulo: string;
  portada_url: string | null;
  estado: EstadoJuego;
  calificacion: number | null;
  horas_jugadas: string;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  resena: string;
}
