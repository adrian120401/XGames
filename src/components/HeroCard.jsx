import "../styles/hero.css";

const defaultHeroCard = {
	title: "F1® 25",
	descriptionPrefix: "Recomendado",
	descriptionSuffix: "porque has jugado juegos etiquetados con Carreras, Simulador de Automóviles, Conducción y Deportes.",
	price: "$U2.300",
	mainImage:
		"https://images.unsplash.com/photo-1742744652734-d5ec6598b5da?auto=format&fit=crop&w=1200&q=80",
	gallery: [
		"https://images.unsplash.com/photo-1699138346782-8a8b211c3da2?auto=format&fit=crop&w=600&q=80",
		"https://images.unsplash.com/photo-1614949194403-9602bdc14a3a?auto=format&fit=crop&w=600&q=80",
		"https://images.unsplash.com/photo-1728116693268-125c5d6ad9e2?auto=format&fit=crop&w=600&q=80",
		"https://images.unsplash.com/photo-1712218952141-6e00f179fe84?auto=format&fit=crop&w=600&q=80",
	],
	tags: ["Carreras", "Simulador de Automóviles", "Conducción", "Deportes"],
};

export default function HeroCard({ card = defaultHeroCard }) {
	const {
		title,
		descriptionPrefix,
		descriptionSuffix,
		price,
		mainImage,
		gallery,
		tags,
	} = card;

	return (
		<article className="hero-card card border-0 rounded-4 overflow-hidden shadow-lg">
			<div className="hero-card__media position-relative p-0">
				<img className="hero-card__image w-100 h-100 object-fit-cover" src={mainImage} alt={title} />
				<div className="hero-card__media-overlay" />
			</div>

			<div className="hero-card__content d-flex flex-column gap-3">
				<div className="hero-card__header d-flex flex-column gap-1">
					<p className="hero-card__eyebrow mb-0">Destacado y Recomendado</p>
					<h2 className="hero-card__title mb-0">{title}</h2>
				</div>

				<div className="hero-card__gallery row row-cols-2 g-2" aria-label={`Imágenes de vista previa de ${title}`}>
					{gallery.map((image, index) => (
						<div key={`${title}-${index}`} className="col">
							<div className="ratio ratio-16x9 rounded-3 overflow-hidden">
								<img
									className="hero-card__thumbnail w-100 h-100 object-fit-cover"
									src={image}
									alt={`Vista previa de ${title} ${index + 1}`}
									loading="lazy"
								/>
							</div>
						</div>
					))}
				</div>

				<p className="hero-card__description mb-0">
					<span className="hero-card__highlight">{descriptionPrefix}</span> {descriptionSuffix}
				</p>

				<div className="hero-card__tags d-flex flex-wrap gap-2" aria-label="Etiquetas del juego">
					{tags.map((tag) => (
						<span key={tag} className="hero-card__tag badge rounded-pill text-bg-secondary">
							{tag}
						</span>
					))}
				</div>

				<div className="hero-card__footer d-flex align-items-center justify-content-between gap-3 mt-auto">
					<p className="hero-card__price mb-0">{price}</p>
					<button className="hero-card__cta btn btn-light fw-bold" type="button">
						<span>Jugar</span>
					</button>
				</div>
			</div>
		</article>
	);
}
