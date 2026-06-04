import "../styles/hero.css";

const defaultHeroCard = {
	title: "F1® 25",
	descriptionPrefix: "Recommended",
	descriptionSuffix: "because you played games tagged with Racing, Automobile Sim, Driving and Sports.",
	price: "$U2.300",
	mainImage:
		"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
	gallery: [
		"https://images.unsplash.com/photo-1511216113907-8f0f6c2d5f1e?auto=format&fit=crop&w=600&q=80",
		"https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=600&q=80",
		"https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=600&q=80",
		"https://images.unsplash.com/photo-1541348263662-e068662d0c5a?auto=format&fit=crop&w=600&q=80",
	],
	tags: ["Racing", "Automobile Sim", "Driving", "Sports"],
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
		<article className="hero-card row g-0 card border-0 rounded-4 overflow-hidden shadow-lg">
			<div className="hero-card__media col-12 col-lg-7 position-relative p-0">
				<img className="hero-card__image w-100 h-100 object-fit-cover" src={mainImage} alt={title} />
				<div className="hero-card__media-overlay" />
			</div>

			<div className="hero-card__content col-12 col-lg-5 d-flex flex-column gap-3">
				<div className="hero-card__header d-flex flex-column gap-1">
					<p className="hero-card__eyebrow mb-0">Featured &amp; Recommended</p>
					<h2 className="hero-card__title mb-0">{title}</h2>
				</div>

				<div className="hero-card__gallery row row-cols-2 g-2" aria-label={`Preview images for ${title}`}>
					{gallery.map((image, index) => (
						<div key={`${title}-${index}`} className="col">
							<div className="ratio ratio-16x9 rounded-3 overflow-hidden">
								<img
									className="hero-card__thumbnail w-100 h-100 object-fit-cover"
									src={image}
									alt={`${title} preview ${index + 1}`}
									loading="lazy"
								/>
							</div>
						</div>
					))}
				</div>

				<p className="hero-card__description mb-0">
					<span className="hero-card__highlight">{descriptionPrefix}</span> {descriptionSuffix}
				</p>

				<div className="hero-card__tags d-flex flex-wrap gap-2" aria-label="Game tags">
					{tags.map((tag) => (
						<span key={tag} className="hero-card__tag badge rounded-pill text-bg-secondary">
							{tag}
						</span>
					))}
				</div>

				<div className="hero-card__footer d-flex align-items-center justify-content-between gap-3 mt-auto">
					<p className="hero-card__price mb-0">{price}</p>
					<button className="hero-card__cta btn btn-light fw-bold" type="button">
						<span>Play</span>
					</button>
				</div>
			</div>
		</article>
	);
}
