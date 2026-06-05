import "../styles/game.css";

const YOUTUBE_ID_PATTERN = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/;

function buildYoutubeEmbedUrl(link) {
	if (!link) {
		return "";
	}

	const match = link.match(YOUTUBE_ID_PATTERN);
	const videoId = match?.[1];

	if (!videoId) {
		return link;
	}

	const params = new URLSearchParams({
		autoplay: "1",
		controls: "1",
		mute: "1",
		playsinline: "1",
		rel: "0",
		modestbranding: "1",
	});

	return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function Game({
	title = "F1® 25",
	youtubeUrl,
	coverImage,
	summary,
	developer,
}) {
	const embedUrl = buildYoutubeEmbedUrl(youtubeUrl);

	return (
		<section className="game-shell container-fluid px-3 px-md-4" aria-labelledby="game-title">
			<article className="game-hero row g-0 shadow-lg rounded-4 overflow-hidden">
				<div className="game-hero__media col-12 col-lg-6 position-relative">
					{embedUrl ? (
						<iframe
							className="game-hero__video border-0 w-100 h-100"
							src={embedUrl}
							title={`${title} trailer`}
							allow="autoplay; encrypted-media; picture-in-picture"
							allowFullScreen
						/>
					) : (
						<div className="game-hero__video game-hero__video--empty d-flex align-items-center justify-content-center text-center h-100">
							<p>No hay video disponible.</p>
						</div>
					)}
				</div>

				<aside className="game-hero__sidebar col-12 col-lg-6 d-flex flex-column" aria-label={`Ficha de ${title}`}>
					<div className="game-hero__sidebar-row game-hero__cover-wrap justify-content-center">
						<div className="game-hero__cover ratio ratio-16x9">
							{coverImage ? (
								<img className="game-hero__cover-image" src={coverImage} alt={`Portada de ${title}`} />
							) : (
								<div className="game-hero__cover-placeholder d-flex align-items-center justify-content-center text-center h-100 w-100">
									Sin portada
								</div>
							)}
						</div>
					</div>

					<div className="game-hero__sidebar-row">
						<h1 id="game-title" className="game-hero__title mb-0">
							{title}
						</h1>
					</div>

					<div className="game-hero__sidebar-row">
						{summary ? <p className="game-hero__summary mb-0">{summary}</p> : null}
					</div>

					<div className="game-hero__sidebar-row">
						<p className="game-hero__eyebrow mb-0 text-uppercase">Developer</p>
						<p className="game-hero__developer mb-0">{developer ?? "No disponible"}</p>
					</div>
				</aside>
			</article>
		</section>
	);
}

export default Game;
