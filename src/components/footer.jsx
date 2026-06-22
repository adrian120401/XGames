import { FaYoutube, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
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
            <a
              target="_blank"
              href="https://www.instagram.com/animadual?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            >
              <FaInstagram />{" "}
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
            <a href="https://anima.edu.uy/quienes-somos/" target="_blank">
              Acerca de Ánima
            </a>
            <a href="https://anima.edu.uy/plus-dual/" target="_blank">
              +Dual
            </a>
            <a href="https://anima.edu.uy/comunidad/" target="_blank">
              Comunidad
            </a>
            <a href="https://anima.edu.uy/donaciones/" target="_blank">
              Donar
            </a>
            <a
              href="https://anima.edu.uy/comunidad/#idSponsors"
              target="_blank"
            >
              Sponsors
            </a>
          </div>

          <div>
            <h3>Finest</h3>
            <a href="https://anima.edu.uy/finest/" target="_blank">
              ¿Que es Finest?
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSccyNIAJOc9IkG9AViI71sOhfbqe2K3hISOtCCv6XwvID6XOA/viewform"
              target="_blank"
            >
              Inscripción
            </a>
            <a
              href="https://anima.edu.uy/academia-de-empleabilidad/"
              target="_blank"
            >
              Academia de empleabilidad
            </a>
            <a
              href="https://anima.edu.uy/comunidad/#idEmpresasFormadoras"
              target="_blank"
            >
              Empresas formadoras
            </a>
          </div>

          <div>
            <h3>Programas</h3>
            <a href="https://anima.edu.uy/programa-educativo/" target="_blank">
              Bachillerato tecnológico
            </a>
            <a href="https://anima.edu.uy/finest/" target="_blank">
              Finest
            </a>
            <a
              href="https://anima.edu.uy/academia-de-empleabilidad/"
              target="_blank"
            >
              Academia de empleabilidad
            </a>
          </div>

          <div>
            <h3>MÁS</h3>
            <a href="https://anima.edu.uy/comunidad/#idEquipo" target="_blank">
              Equipo
            </a>
            <a href="tel:+59829093640">(+598) 2909 3640</a>
            <a href="mailto:info@anima.edu.uy">info@anima.edu.uy</a>
            <a
              href="https://maps.app.goo.gl/61h7awb6jNduUxGn9"
              target="_blank"
              rel="noreferrer"
            >
              Mercedes 984, esq. Julio Herrera y Obes
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
