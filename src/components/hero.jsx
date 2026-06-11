import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroCard from "./HeroCard";
import "../styles/hero.css";

export default function Hero() {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const closeModal = () => setIsModalOpen(false);
	const startAdventure = () => {
		setIsModalOpen(false);
		navigate("/shooter");
	};

	return (
		<section className="hero-shell" aria-label="Featured games">
			<HeroCard />

			<div className="hero-promo">
				<button
					type="button"
					className="hero-promo__button"
					onClick={() => setIsModalOpen(true)}
				>
					¿Querés jugar a algo?
				</button>
			</div>

			{isModalOpen ? (
				<div className="hero-modal" role="presentation" onClick={closeModal}>
					<div
						className="hero-modal__panel"
						role="dialog"
						aria-modal="true"
						aria-labelledby="hero-modal-title"
						aria-describedby="hero-modal-description"
						onClick={(event) => event.stopPropagation()}
					>
						<p className="hero-modal__eyebrow">Alerta de aventura</p>
						<h3 id="hero-modal-title" className="hero-modal__title">
							¿Estás preparado para esta gran aventura?
						</h3>
						<p id="hero-modal-description" className="hero-modal__copy">
							No prometemos descanso, pero sí balas, caos y una pequeña posibilidad de gloria.
						</p>

						<div className="hero-modal__actions">
							<button type="button" className="hero-modal__primary" onClick={startAdventure}>
								Sí, vamos
							</button>
							<button type="button" className="hero-modal__secondary" onClick={closeModal}>
								Todavía no
							</button>
						</div>
					</div>
				</div>
			) : null}
		</section>
	);
}
