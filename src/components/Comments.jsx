import { useEffect, useState } from 'react';

function buildStorageKey(gameId) {
	return `xgames:comments:${gameId ?? 'default'}`;
}

function readStoredComments(storageKey) {
	if (typeof window === 'undefined') {
		return [];
	}

	try {
		const rawComments = window.localStorage.getItem(storageKey);
		const parsedComments = rawComments ? JSON.parse(rawComments) : [];

		return Array.isArray(parsedComments) ? parsedComments : [];
	} catch {
		return [];
	}
}

function Comments({ gameId, title = 'Comentarios' }) {
	const storageKey = buildStorageKey(gameId);
	const [comments, setComments] = useState(() => readStoredComments(storageKey));
	const [draftComment, setDraftComment] = useState('');
	const [draftRating, setDraftRating] = useState(0);

	const ratingTotal = comments.reduce((total, comment) => total + (comment.rating ?? 0), 0);
	const reviewAverage = comments.length > 0 ? ratingTotal / comments.length : 0;
	const reviewCount = comments.length;

	function renderStars(value) {
		return Array.from({ length: 5 }, (_, index) => {
			const starValue = index + 1;
			const isFilled = value >= starValue;

			return (
				<span
					key={starValue}
					className={isFilled ? 'game-shell__star game-shell__star--filled' : 'game-shell__star'}
					aria-hidden="true"
				>
					★
				</span>
			);
		});
	}

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		window.localStorage.setItem(storageKey, JSON.stringify(comments));
	}, [comments, storageKey]);

	function handleSubmit(event) {
		event.preventDefault();

		const nextComment = draftComment.trim();

		if (!nextComment || draftRating < 1) {
			return;
		}

		setComments((currentComments) => [
			{
				id: `${Date.now()}-${currentComments.length}`,
				text: nextComment,
				rating: draftRating,
			},
			...currentComments,
		]);
		setDraftComment('');
		setDraftRating(0);
	}

	return (
		<section className="game-shell__comments mt-4" aria-labelledby="comments-title">
			<div className="game-shell__comments-header">
				<h2 id="comments-title" className="game-shell__comments-title mb-0">
					{title}
				</h2>
			</div>
			<div className="game-shell__comments-divider" aria-hidden="true" />

			<div className="game-shell__review d-flex flex-wrap align-items-center justify-content-between gap-2">
				<div className="game-shell__review-copy">
					<p className="game-shell__review-label mb-1">Review</p>
					<div className="game-shell__review-stars" aria-label={`Review promedio ${reviewAverage.toFixed(1)} de 5`}>
						{renderStars(Math.round(reviewAverage))}
					</div>
				</div>
				<p className="game-shell__review-score mb-0">
					{reviewCount > 0 ? `${reviewAverage.toFixed(1)}/5` : 'Sin reviews'}
				</p>
			</div>

			<form className="game-shell__comments-form" onSubmit={handleSubmit}>
				<label className="game-shell__comments-label" htmlFor={`${storageKey}-input`}>
					Dejá tu comentario
				</label>

				<div className="game-shell__rating-group">
					<p className="game-shell__comments-label mb-0">Rating</p>
					<div className="game-shell__rating-stars" role="radiogroup" aria-label="Seleccionar rating">
						{[1, 2, 3, 4, 5].map((value) => {
							const isActive = value <= draftRating;

							return (
								<button
									key={value}
									type="button"
									className={isActive ? 'game-shell__rating-star game-shell__rating-star--active' : 'game-shell__rating-star'}
									onClick={() => setDraftRating(value)}
									aria-label={`${value} estrella${value > 1 ? 's' : ''}`}
									aria-pressed={isActive}
								>
									★
								</button>
							);
						})}
					</div>
					<p className="game-shell__rating-hint mb-0">
						{draftRating > 0 ? `${draftRating}/5 seleccionado` : 'Elegí una puntuación de 1 a 5'}
					</p>
				</div>
				<textarea
					id={`${storageKey}-input`}
					className="game-shell__comments-input"
					value={draftComment}
					onChange={(event) => setDraftComment(event.target.value)}
					placeholder="Escribí un comentario para este juego..."
					rows={4}
				/>
				<div className="game-shell__comments-actions d-flex justify-content-end">
					<button className="game-shell__comments-btn btn btn-success fw-semibold" type="submit" disabled={!draftComment.trim() || draftRating < 1}>
						Enviar
					</button>
				</div>
			</form>

			{comments.length > 0 ? (
				<ul className="game-shell__comments-list list-unstyled mb-0">
					{comments.map((comment) => (
						<li key={comment.id} className="game-shell__comment-item">
								<div className="game-shell__comment-rating" aria-label={`Rating ${comment.rating ?? 0} de 5`}>
									{renderStars(comment.rating ?? 0)}
								</div>
							<p className="game-shell__comment-text mb-0">{comment.text}</p>
						</li>
					))}
				</ul>
			) : (
				<p className="game-shell__comments-empty mb-0">Todavía no hay comentarios para este juego.</p>
			)}
		</section>
	);
}

export default Comments;
