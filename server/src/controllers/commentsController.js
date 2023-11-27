import managerComments from '../dao/managerComments.js';

export const newComment = async (req, res) => {
	const email = req.params.email;
	const text = req.body;

	try {
		const newComment = await managerComments.createNewComment(email, text);

		if (newComment === 'FIELDS_EMPTY')
			return res
				.status(400)
				.json({ data: { errorMessage: 'El campo no puede ir vacío' }, status: 1 });

		if (newComment === 'EMAIL_NOT_SPECIFIED')
			return res
				.status(400)
				.json({ data: { errorMessage: 'Email no especificado en la URL' }, status: 1 });
		if (newComment === 'USER_NOT_FOUND')
			return res.status(404).json({ data: { errorMessage: 'Usuario no encontrado' }, status: 1 });

		return res.status(201).json({ data: { newComment }, status: 0 });
	} catch (error) {
		return res.status(500).json({ data: { errorMessage: error.message }, status: 1 });
	}
};

export const getComments = async (req, res) => {
	try {
		const allComments = await managerComments.getAllComments();

		if (allComments === 'NO_COMMENTS')
			return res
				.status(404)
				.json({ data: { errorMessage: 'No se encontraron comentarios' }, status: 1 });

		return res.json({ data: { allComments }, status: 0 });
	} catch (error) {
		return res.status(500).json({ data: { errorMessage: error.message }, status: 1 });
	}
};

export const deleteComment = async (req, res) => {
	const email = req.params.email;
	const id = req.params.id;

	try {
		const deletedComment = await managerComments.deleteComment(email, id);

		if (deletedComment === 'EMAIL_NOT_SPECIFIED')
			return res
				.status(400)
				.json({ data: { errorMessage: 'Email no especificado en la URL' }, status: 1 });
		if (deletedComment === 'USER_NOT_FOUND')
			return res.status(404).json({ data: { errorMessage: 'Usuario no encontrado' }, status: 1 });
		if (deletedComment === 'COMMENT_NOT_FOUND')
			return res
				.status(404)
				.json({ data: { errorMessage: 'Comentario no encontrado' }, status: 1 });

		return res.json({
			data: { message: 'Comentario eliminado correctamente', deletedComment },
			status: 0,
		});
	} catch (error) {
		return res.status(500).json({ error: { message: error.message }, status: 1 });
	}
};

export const updateComment = async (req, res) => {
	const email = req.params.email;
	const id = req.params.id;

	try {
		const updatedComment = await managerComments.updateComment(id, email, req.body);

		if (updatedComment === 'EMAIL_NOT_SPECIFIED')
			return res
				.status(400)
				.json({ data: { errorMessage: 'Email no especificado en la URL' }, status: 1 });
		if (updatedComment === 'USER_NOT_FOUND')
			return res.status(404).json({ data: { errorMessage: 'Usuario no encontrado' }, status: 1 });

		if (updatedComment === 'COMMENT_NOT_FOUND')
			return res
				.status(404)
				.json({ data: { errorMessage: 'Comentario no encontrado' }, status: 1 });

		return res.json({
			data: { message: 'Comentario actualizado correctamente', updatedComment },
			status: 0,
		});
	} catch (error) {
		return res.status(500).json({ data: { errorMessage: error.message }, status: 1 });
	}
};
