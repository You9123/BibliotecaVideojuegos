import { useMutation, useQueryClient } from "@tanstack/react-query";
import { agregarABiblioteca } from "../api/juegos";

export function useAgregarABiblioteca() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: agregarABiblioteca,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ver-biblioteca"] });
    },
  });
}
