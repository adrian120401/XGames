import React from "react";
import pixelAdrian from "../assets/CardsAssests/pixelAdrian.png";
import pixelEric from "../assets/CardsAssests/pixelEric.png";
import pixelAgus from "../assets/CardsAssests/pixelAgus.png";
import pixelRomi from "../assets/CardsAssests/pixelRomi.png";
const CardsContainer = () => {
  const cardsData = [
    {
      id: 1,
      name: "Eric Gallo",
      text: "Encargado del diseño grafico en general. A cargo del footer y el about us. Interesado en front end (CSS, Javascript y react).",
      image: pixelEric,
    },
    {
      id: 2,
      name: "Agustin Bech",
      text: "Encargado de las principales funcionalidades (la NavBar, el carousel, el buscador y la API.) y el encargado de los followsup en trello. Interesado en fullstack development.",
      image: pixelAgus,
    },
    {
      id: 3,
      name: "Adrian De Los Reyes",
      text: "Web designer. Encargado principalmente de crear visuales lo mas parecidas a steam para lograr la meta del proyecto, que es una copia funcional. Es Adrian.",
      image: pixelAdrian,
    },
    {
      id: 4,
      name: "Romina Sosa",
      text: "Encargada de hacer su proyecto HTML para luego agregarlo como componente.",
      image: pixelRomi,
    },
  ];

  return (
    <section className="xgames-section">
      <div className="cards-grid">
        {cardsData.map((card) => (
          <div key={card.id} className="card-column">
            {/* Sección 1: Imagen */}
            <div className="card-image-wrapper">
              <img src={card.image} alt={card.name} className="card-image" />
            </div>

            {/* Sección 2: Título */}
            <h3 className="card-title">{card.name}</h3>

            {/* Sección 3: Párrafo */}
            <p className="card-text">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardsContainer;
