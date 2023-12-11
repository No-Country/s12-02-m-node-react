/* eslint-disable camelcase */
import Database from '../config/mongodb.js';
import {
	createDocument,
	getAllDocuments,
	getOneDocument,
	updateDocument,
	deleteDocument,
} from '../config/factory.js';

import CommentsModel from '../models/commentsModel.js';

class CommentsManager {
	constructor() {
		this.db = new Database();
		this.createDocument = createDocument;
		this.getAllDocuments = getAllDocuments;
		this.getOneDocument = getOneDocument;
		this.updateDocument = updateDocument;
		this.deleteDocument = deleteDocument;
	}

	// Create one comment in the DB
	async createComment(data) {
		const { text, email, date, event_ID } = data;
		const comments = CommentsModel({
			text,
			email,
			date,
			event_ID,
		});
		await this.createDocument('commentsCollection', comments);
	}

	// Get all comments that match the query
	async getAllComments(query) {
		try {
			const comments = await this.getAllDocuments('commentsCollection', query);
			if (!comments) throw new Error('No hay comentarios disponibles.');
			return comments;
		} catch (error) {
			throw new Error(`Error al intentar conseguir los comentarios: ${error.message}`);
		}
	}

	// Get only one comment that match the query
	async getOneComment(query) {
		try {
			const comment = await this.getOneDocument('commentsCollection', query);
			return comment;
		} catch (error) {
			throw new Error(`Error al intentar conseguir el comentario: ${error.message}`);
		}
	}

	// Update one comment that match the filter
	async updateComment(filter, dataUpdate) {
		try {
			const commentUpdate = await this.updateDocument('commentsCollection', filter, dataUpdate);
			return commentUpdate;
		} catch (error) {
			throw new Error(`Error al intentar actualizar el comentario: ${error.message}`);
		}
	}

	// Delete one comment that match the filter
	async deleteComment(filter) {
		try {
			const commentDelete = await this.deleteDocument('commentsCollection', filter);
			return commentDelete;
		} catch (error) {
			throw new Error(`Error al intentar eliminar el comentario: ${error.message}`);
		}
	}
}

export default CommentsManager;
