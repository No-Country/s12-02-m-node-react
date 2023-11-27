import managerComments from '../dao/managerComments.js';

export const newComment = async (req, res) => {
	const email = req.params.email;
	const text = req.body;

	try {
		const newComment = await managerComments.createNewComment(email, text);

		if (newComment === 'FIELDS_EMPTY')
			return res
				.status(400)
				.json({ error: { message: 'El campo no puede ir vacío', status: res.statusCode } });

		if (newComment === 'EMAIL_NOT_SPECIFIED')
			return res
				.status(400)
				.json({ error: { message: 'Email no especificado en la URL', status: res.statusCode } });
		if (newComment === 'USER_NOT_FOUND')
			return res
				.status(404)
				.json({ error: { message: 'Usuario no encontrado', status: res.statusCode } });

		return res.status(201).json({ newComment, status: res.statusCode });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: { message: error.message, status: res.statusCode } });
	}
};

export const getComments = async (req, res) => {
	try {
		const allComments = await managerComments.getAllComments();

		if (allComments === 'NO_COMMENTS')
			return res
				.status(404)
				.json({ error: { message: 'No se encontraron comentarios', status: res.statusCode } });

		return res.json({ allComments, status: res.statusCode });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: { message: error.message, status: res.statusCode } });
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
				.json({ error: { message: 'Email no especificado en la URL', status: res.statusCode } });
		if (deletedComment === 'USER_NOT_FOUND')
			return res
				.status(404)
				.json({ error: { message: 'Usuario no encontrado', status: res.statusCode } });
		if (deletedComment === 'COMMENT_NOT_FOUND')
			return res
				.status(404)
				.json({ error: { message: 'Comentario no encontrado', status: res.statusCode } });

		return res.json({ message: 'Comentario eliminado correctamente', deletedComment, status: res.statusCode });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: { message: error.message, status: res.statusCode } });
	}
};

export const updateComment = async (req, res) => {
	const email = req.params.email;
	const id = req.params.id;

	try {
		const commentUpdated = await managerComments.updateComment(id, email, req.body);

		if (commentUpdated === 'EMAIL_NOT_SPECIFIED')
			return res
				.status(400)
				.json({ error: { message: 'Email no especificado en la URL', status: res.statusCode } });
		if (commentUpdated === 'USER_NOT_FOUND')
			return res
				.status(404)
				.json({ error: { message: 'Usuario no encontrado', status: res.statusCode } });

		if (commentUpdated === 'COMMENT_NOT_FOUND')
			return res
				.status(404)
				.json({ error: { message: 'Comentario no encontrado', status: res.statusCode } });

		return res.json({ message: 'Comentario actualizado correctamente', commentUpdated, status: res.statusCode });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: { message: error.message, status: res.statusCode } });
	}
}