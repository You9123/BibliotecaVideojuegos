import { useVerBiblioteca } from "../hooks/useVerBiblioteca";
import type { EstadoJuego } from "../types/juego";

const ETIQUETAS_ESTADO: Record<EstadoJuego, string> = {
  pendiente: "Pendiente",
  jugando: "Jugando",
  completado: "Completado",
  abandonado: "Abandonado",
};

export function MiBiblioteca() {
  const { data: entradas, isLoading, isError } = useVerBiblioteca();

  if (isLoading) return <p>Cargando tu biblioteca...</p>;
  if (isError)
    return (
      <p>
        No se pudo cargar la biblioteca. Revisa que el backend esté corriendo.
      </p>
    );
  if (!entradas || entradas.length === 0)
    return (
      <p>Todavía no tienes juegos en tu biblioteca. ¡Busca uno y agrégalo!</p>
    );

  return (
    <section>
      <h2>Mi biblioteca ({entradas.length})</h2>
      <ul className="biblioteca">
        {entradas.map((entrada) => (
          <li key={entrada.id} className="tarjeta">
            {entrada.portada_url && (
              <img src={entrada.portada_url} alt={entrada.titulo} />
            )}
            <div className="tarjeta-cuerpo">
              <h3>{entrada.titulo}</h3>
              <span className={`badge badge-${entrada.estado}`}>
                {ETIQUETAS_ESTADO[entrada.estado]}
              </span>
              <p>
                {entrada.calificacion !== null
                  ? `Calificación: ${entrada.calificacion}/10`
                  : "Sin calificar"}
              </p>
              <p>{entrada.horas_jugadas} h jugadas</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
