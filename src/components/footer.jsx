import { FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Columna izquierda */}
        <div className="footer-brand">
          <div className="logo-container">
            <h2>Ánima</h2>
            <span>Finest</span>
          </div>

          <p>
            © 2026 Ánima Corporation. Todos los derechos reservados. Todas las
            marcas registradas son propiedad de sus respectivos dueños en
            Uruguay. y otros países.
          </p>

          <div className="social-icons">
            <a
              href="https://www.youtube.com/@animadual"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <FaYoutube />{" "}
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/animaformaciondual"
            >
              {" "}
              <FaFacebook />
            </a>
            <a target="_blank" href="https://x.com/animadual">
              <FaTwitter />{" "}
            </a>
          </div>
        </div>

        {/* Columnas de enlaces */}
        <div className="footer-links">
          <div>
            <h3>Ánima</h3>
            <a href="https://anima.edu.uy/quienes-somos/">Acerca de Ánima</a>
            <a href="https://anima.edu.uy/plus-dual/">+Dual</a>
            <a href="https://anima.edu.uy/comunidad/">Comunidad</a>
            <a href="https://anima.edu.uy/donaciones/">Donar</a>
            <a href="https://anima.edu.uy/comunidad/#idSponsors">Sponsors</a>
          </div>

          <div>
            <h3>Finest</h3>
            <a href="https://anima.edu.uy/finest/">¿Que es Finest?</a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSccyNIAJOc9IkG9AViI71sOhfbqe2K3hISOtCCv6XwvID6XOA/viewform">
              Inscripción
            </a>
            <a href="https://anima.edu.uy/academia-de-empleabilidad/">
              Academia de empleabilidad
            </a>
            <a href="https://anima.edu.uy/comunidad/#idEmpresasFormadoras">
              Empresas formadoras
            </a>
          </div>

          <div>
            <h3>LEGAL</h3>
            <a href="#">Privacidad</a>
            <a href="#">Accesibilidad</a>
            <a href="#">Avisos y políticas</a>
            <a href="#">Cookies</a>
            <a href="#">Reembolsos</a>
          </div>

          <div>
            <h3>MÁS</h3>
            <a href="#">Obtener Steam</a>
            <a href="#">Aplicaciones móviles</a>
            <a href="#">Soporte</a>
            <a href="#">Mi cuenta</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
