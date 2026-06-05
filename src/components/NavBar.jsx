import { useState } from "react";
import "../styles/NavBar.css";

export default function NavBar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="navbar">
      <a href="#" className="navbar-logo">
        X<span>Games</span>
      </a>

      <div className="navbar-links">
        <a href="#" className="navbar-btn">
          Inicio
        </a>
        <a href="#juegos" className="navbar-btn">
          Juegos
        </a>
        <a href="#" className="navbar-btn">
          Sobre nosotros
        </a>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          className={`search-input ${searchOpen ? "open" : ""}`}
          placeholder="Buscar..."
        />
        <button
          className="search-btn"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </nav>
  );
}
