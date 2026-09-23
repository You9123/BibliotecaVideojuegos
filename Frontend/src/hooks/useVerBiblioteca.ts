import { useQuery } from "@tanstack/react-query";
import { verBiblioteca } from "../api/juegos";

export function useVerBiblioteca() {
  return useQuery({
    queryKey: ["ver-biblioteca"],
    queryFn: verBiblioteca,
  });
}
