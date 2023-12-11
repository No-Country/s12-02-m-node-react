/* eslint-disable eqeqeq */
import CommentsManager from '../dao/managerComments.js';
import CommentsModel from '../models/commentsModel.js';
import { ObjectId } from 'mongodb';
const commentsmanager = new CommentsManager();

// This controller is for creating a comment
async function createCommentController(req, res) {
	try {
		const data = req.body;
		const validateError = CommentsModel(data).validateSync();
		if (validateError) {
			throw validateError;
		}
		await commentsmanager.createComment(data);
		return res.status(200).json({
			data,
			status: 0,
			message: 'Se han guardado con éxito el comentario.',
		});
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
	}
}

// This controller return all comments of the one publication
async function getAllCommentsController(req, res) {
	try {
		const queryParams = req.query;
		let query = {};
		if (queryParams.email) {
			query = { email: queryParams.email };
		} else if (queryParams.event_ID) {
			query = { event_ID: queryParams.event_ID };
		}
		const allComments = await commentsmanager.getAllComments(query);
		if (allComments.length === 0) throw new Error('No hay comentarios para mostrar');
		return res.status(200).json({
			data: allComments,
			status: 0,
			message: 'Se han encontrado los siguientes comentarios.',
		});
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
	}
}

// This controller return one comentario that match by id)
async function getOneCommentController(req, res) {
	try {
		const id = req.params;
		const commentId = new ObjectId(id);
		const query = { _id: commentId };
		const oneComment = await commentsmanager.getOneComment(query);
		if (!oneComment) throw new Error('No hay comentario con ese id.');
		return res.status(200).json({
			data: oneComment,
			status: 0,
			message: 'Se han encontrado el siguiente comentario.',
		});
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
	}
}

// This controller update one comentario that match with id
async function updateCommentController(req, res) {
	try {
		const dataUpdate = req.body;
		const id = req.params;
		const commentId = new ObjectId(id);
		const query = { _id: commentId };
		const result = await commentsmanager.updateComment(query, dataUpdate);
		if (result.matchedCount > 0) {
			const commentUpdated = await commentsmanager.getOneComment(query);
			return res.status(200).json({
				data: commentUpdated,
				status: 0,
				message: 'Comentario actualizado con éxito',
			});
		} else {
			return res.status(400).json({
				data: {},
				status: 1,
				message: 'No se pudo realizar la actualización.',
			});
		}
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
	}
}

// This controller delete one comment physically (mode = 0) or logically (mode = 1)
async function deleteCommentController(req, res) {
	try {
		const { mode, id } = req.params;
		let result;
		let filter = {};
		const commentId = new ObjectId(id);
		filter = { _id: commentId };
		if (mode == 0) {
			result = await commentsmanager.deleteComment(filter);
		} else {
			result = await commentsmanager.updateComment(filter, { active: false });
		}
		if (result.deletedCount > 0 || result.matchedCount > 0) {
			const action = mode == 0 ? 'físicamente' : 'lógicamente';
			return res.status(200).json({
				data: result,
				status: 0,
				message: `El comentario ha sido eliminado ${action}.`,
			});
		} else {
			return res.status(404).json({
				data: {},
				status: 1,
				message: 'No se encontró ningun comentario para eliminar con ese id.',
			});
		}
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: 'Se produjo un error al procesar la solicitud.',
		});
	}
}

export {
	createCommentController,
	getAllCommentsController,
	getOneCommentController,
	updateCommentController,
	deleteCommentController,
};
