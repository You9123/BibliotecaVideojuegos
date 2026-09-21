import { useState, type FormEvent } from "react";
import { useBuscarJuegos } from "../hooks/useBuscarJuegos";
import { useAgregarABiblioteca } from "../hooks/useAgregarABiblioteca";
import type { ResultadoJuego } from "../types/juego";

export function BuscarJuegos() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [agregados, setAgregados] = useState<Set<number>>(new Set());

  const { data: resultados, isLoading, isError } = useBuscarJuegos(query);
  const agregarMutation = useAgregarABiblioteca();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setQuery(input);
  }

  function handleAgregar(juego: ResultadoJuego) {
    agregarMutation.mutate(juego, {
      onSuccess: () => {
        setAgregados((prev) => new Set(prev).add(juego.rawg_id));
      },
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Buscar un juego..."
        />
        <button type="submit">Buscar</button>
      </form>

      {isLoading && <p>Buscando...</p>}
      {isError && (
        <p>Hubo un error al buscar. Revisa que el backend esté corriendo.</p>
      )}

      <ul className="resultados">
        {resultados?.map((juego) => {
          const yaAgregado = agregados.has(juego.rawg_id);
          const guardandoEste =
            agregarMutation.isPending &&
            agregarMutation.variables?.rawg_id === juego.rawg_id;

          return (
            <li key={juego.rawg_id}>
              {juego.portada_url && (
                <img src={juego.portada_url} alt={juego.titulo} width={120} />
              )}
              <h3>{juego.titulo}</h3>
              <p>{juego.generos}</p>
              <p>{juego.plataformas}</p>
              <button
                onClick={() => handleAgregar(juego)}
                disabled={yaAgregado || guardandoEste}
              >
                {yaAgregado
                  ? "Agregado ✓"
                  : guardandoEste
                    ? "Guardando..."
                    : "Agregar a mi biblioteca"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
