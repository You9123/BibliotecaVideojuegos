import { NavLink, Route, Routes } from "react-router-dom";
import { BuscarJuegos } from "./components/BuscarJuegos";
import { MiBiblioteca } from "./components/MiBiblioteca";
import "./App.css";

function App() {
  return (
    <>
      <nav className="nav">
        <NavLink to="/" end>
          Buscar
        </NavLink>
        <NavLink to="/biblioteca">Mi biblioteca</NavLink>
      </nav>
      <main>
        <h1>Mi Biblioteca de Videojuegos</h1>
        <Routes>
          <Route path="/" element={<BuscarJuegos />} />
          <Route path="/biblioteca" element={<MiBiblioteca />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
