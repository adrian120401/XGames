import { useState } from "react";
import "../styles/NavBar.css";

const API_KEY = "6b741a7861b348f0b4c886ffc8c5eab1";

export default function NavBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.lenght < 2) {
      setResults([]);
      return;
    }

    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${value}&page_size=4`,
    );
    const data = await response.json();
    setResults(data.results);
  };

  return (
    <nav className="navbar">
      <a href="#" className="navbar-logo">
        X<span>Games</span>
      </a>

      <div className="navbar-links">
        <a href="/" className="navbar-btn">
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
          value={query}
          onChange={handleSearch}
        />
        <button
          className="search-btn"
          onClick={() => {
            setSearchOpen(!searchOpen);
            if (searchOpen) {
              setQuery("");
              setResults([]);
            }
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        {results.length > 0 && (
          <ul className="search-results">
            {results.map((game) => (
              <li key={game.id} className="search-result-item">
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="search-result-img"
                />
                <span className="search-result-name">{game.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
