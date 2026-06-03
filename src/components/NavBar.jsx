import '../styles/NavBar.css';

function Navbar() {
  return (
    <nav className="navbarr">
      <a href="/" className="logo-nav">
        XgameS
      </a>

      <div className="lupa">
        <input type="text" placeholder="Buscar.." className="lupa-input" />

        <button className="lupa-btn">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
