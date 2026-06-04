import HeroCard from "./HeroCard";
import "../styles/hero.css";

export default function Hero() {
	return (
		<section className="hero-shell" aria-label="Featured games">
			<HeroCard />
		</section>
	);
}
