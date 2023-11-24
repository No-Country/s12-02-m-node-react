import managerComments from '../dao/managerComments.js';

export const newComment = async (req, res) => {
	const email = req.params.email;
	const text = req.body;

	try {
		const newComment = await managerComments.createNewComment(email, text);

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
	}
};
