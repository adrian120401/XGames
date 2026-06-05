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

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		window.localStorage.setItem(storageKey, JSON.stringify(comments));
	}, [comments, storageKey]);

	function handleSubmit(event) {
		event.preventDefault();

		const nextComment = draftComment.trim();

		if (!nextComment) {
			return;
		}

		setComments((currentComments) => [
			{
				id: `${Date.now()}-${currentComments.length}`,
				text: nextComment,
			},
			...currentComments,
		]);
		setDraftComment('');
	}

	return (
		<section className="game-shell__comments mt-4" aria-labelledby="comments-title">
			<div className="game-shell__comments-header">
				<h2 id="comments-title" className="game-shell__comments-title mb-0">
					{title}
				</h2>
			</div>
			<div className="game-shell__comments-divider" aria-hidden="true" />

			<form className="game-shell__comments-form" onSubmit={handleSubmit}>
				<label className="game-shell__comments-label" htmlFor={`${storageKey}-input`}>
					Dejá tu comentario
				</label>
				<textarea
					id={`${storageKey}-input`}
					className="game-shell__comments-input"
					value={draftComment}
					onChange={(event) => setDraftComment(event.target.value)}
					placeholder="Escribí un comentario para este juego..."
					rows={4}
				/>
				<div className="game-shell__comments-actions d-flex justify-content-end">
					<button className="game-shell__comments-btn btn btn-success fw-semibold" type="submit">
						Enviar
					</button>
				</div>
			</form>

			{comments.length > 0 ? (
				<ul className="game-shell__comments-list list-unstyled mb-0">
					{comments.map((comment) => (
						<li key={comment.id} className="game-shell__comment-item">
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
