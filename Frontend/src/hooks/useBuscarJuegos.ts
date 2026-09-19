import { useQuery } from "@tanstack/react-query";
import { buscarJuegos } from "../api/juegos";

export function useBuscarJuegos(query: string) {
  return useQuery({
    queryKey: ["buscar-juegos", query],
    queryFn: () => buscarJuegos(query),
    enabled: query.trim().length > 2, // no busca hasta tener al menos 3 caracteres
  });
}
