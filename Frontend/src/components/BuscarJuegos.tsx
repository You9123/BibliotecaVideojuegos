import { useState, type FormEvent } from "react";
import { useBuscarJuegos } from "../hooks/useBuscarJuegos";

export function BuscarJuegos() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  const { data: resultados, isLoading, isError } = useBuscarJuegos(query);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setQuery(input);
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
        {resultados?.map((juego) => (
          <li key={juego.rawg_id}>
            {juego.portada_url && (
              <img src={juego.portada_url} alt={juego.titulo} width={120} />
            )}
            <h3>{juego.titulo}</h3>
            <p>{juego.generos}</p>
            <p>{juego.plataformas}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
