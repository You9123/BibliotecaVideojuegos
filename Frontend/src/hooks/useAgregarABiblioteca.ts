import { useMutation } from "@tanstack/react-query";
import { agregarABiblioteca } from "../api/juegos";

export function useAgregarABiblioteca() {
  return useMutation({
    mutationFn: agregarABiblioteca,
  });
}
