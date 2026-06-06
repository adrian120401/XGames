import { useState } from "react";
import "../styles/Carousel.css";
import assassins from "../assets/assassins.jpg";
import spiderman from "../assets/spiderman.jpg";
import expedition from "../assets/expedition.jpg";
import candycrush from "../assets/candycrush.jpg";

const GAMES = [
  {
    id: "assassins-creed",
    title: "Assassin´s Creed II",
    image: assassins,
    author: "Adrian De los Reyes",
    date: "04/06/2026",
    description:
      "Explora el Renacimiento italiano y conviértete en Ezio Auditore, un joven asesino en busca de venganza. Vive una aventura épica llena de acción, sigilo y secretos históricos.",
  },
  {
    id: "spiderman",
    title: "Spider-Man",
    image: spiderman,
    author: "Agustin Bech",
    date: "04/06/2026",
    description:
      "El amigable hombre araña regresa con nuevas mecánicas de combate y balanceo a un Nueva York más vivo que nunca.",
  },

  {
    id: "candy-crush",
    title: "Candy Crush",
    image: candycrush,
    author: "Romina Sosa",
    date: "04/06/2026",
    description:
      "El fenómeno mobil que conquistó millones. Nuevos niveles y eventos especiales que no te podés perder.",
  },
  
  {
    id: "expedition-33",
    title: "Expedition 33",
    image: expedition,
    author: "Eric Gallo",
    date: "04/06/2026",
    description:
      "Únete a la Expedición 33 y lucha contra un destino inevitable. Vive una aventura de fantasía oscura con combates innovadores y una narrativa emocionante.",
  },
];

export default function Carousel() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((active - 1 + GAMES.length) % GAMES.length);
  const next = () => setActive((active + 1) % GAMES.length);

  const getStyle = (idx) => {
    const total = GAMES.length;
    const diff = (idx - active + total) % total;
    if (diff === 0)
      return {
        transform: "translateX(0) scale(1)",
        zIndex: 10,
        opacity: 1,
        filter: "none",
      };
    if (diff === 1)
      return {
        transform: "translateX(55%) scale(0.82)",
        zIndex: 7,
        opacity: 0.85,
        filter: "brightness(0.6)",
      };
    if (diff === total - 1)
      return {
        transform: "translateX(-55%) scale(0.82)",
        zIndex: 7,
        opacity: 0.85,
        filter: "brightness(0.6)",
      };
    if (diff === 2)
      return {
        transform: "translateX(90%) scale(0.68)",
        zIndex: 4,
        opacity: 0,
        filter: "brightness(0.35)",
      };
    return {
      transform: "translateX(-90%) scale(0.68)",
      zIndex: 4,
      opacity: 0,
      filter: "brightness(0.35)",
    };
  };

  return (
    <section className="carousel-section" id="juegos">
      <p className="carousel-label">Destacados</p>
      <h2 className="carousel-title">Juegos Principales</h2>

      <div className="carousel-stage">
        {GAMES.map((game, idx) => (
          <div
            key={idx}
            className="carousel-card"
            style={getStyle(idx)}
            onClick={() => setActive(idx)}
          >
            <h3 className="game-title">{game.title}</h3>
            <img src={game.image} alt={game.title} className="game-image" />
            <div className="game-info">
              <span className="game-author">{game.author}</span>
              <span className="game-date">{game.date}</span>
            </div>
            <p className="game-desc">{game.description}</p>
            <a href={`/${game.id}`} className="game-link">
              Leer más →
            </a>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <button className="ctrl-btn" onClick={prev}>
          ←
        </button>
        <div className="carousel-dots">
          {GAMES.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <button className="ctrl-btn" onClick={next}>
          →
        </button>
      </div>
    </section>
  );
}
