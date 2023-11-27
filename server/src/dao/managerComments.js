import Database from '../config/mongodb.js';
import {
	createDocument,
	getOneDocument,
	deleteDocument,
	getAllDocuments,
	updateDocument,
} from '../config/factory.js';
import CommentsModel from '../models/commentsModel.js';
import parseDateToJSON from '../utils/parseDate.js';
import { ObjectId } from 'mongodb';

class ManagerComments {
	constructor() {
		this.db = new Database();
		this.createDocument = createDocument;
		this.getOneDocument = getOneDocument;
		this.getAllDocuments = getAllDocuments;
		this.deleteDocument = deleteDocument;
		this.updateDocument = updateDocument;
	}

	// Metodo reutilizable para encontrar al usuario
	findEmail = async email => {
		const getEmail = await getOneDocument('usersCollection', { email });
		return getEmail;
	};

	// Obtener todos los comentarios
	getAllComments = async () => {
		const comments = await this.getAllDocuments('commentsCollection');

		if (comments.length === 0) return 'NO_COMMENTS';

		const commentsResponse = comments.map(items => {
			const { date } = items;
			return { ...items, date: parseDateToJSON(date) };
		});

		return commentsResponse;
	};

	// Crear un nuevo comentario
	createNewComment = async (email, body) => {
		if (!email) return 'EMAIL_NOT_SPECIFIED';
		if (body.text === '') return 'FIELDS_EMPTY';

		const getUser = await this.findEmail(email);
		if (!getUser) return 'USER_NOT_FOUND';

		const newComment = CommentsModel({ text: body.text, email });
		const result = await this.createDocument('commentsCollection', newComment);

		const { date } = newComment;
		console.log(result);
		return { ...newComment._doc, date: parseDateToJSON(date) };
	};

	// Borrar un comentario
	deleteComment = async (email, _id) => {
		if (!email) return 'EMAIL_NOT_SPECIFIED';

		const getUser = await this.findEmail(email);
		if (!getUser) return 'USER_NOT_FOUND';

		const commentToDelete = await this.getOneDocument('commentsCollection', new ObjectId(_id));
		if (!commentToDelete) return 'COMMENT_NOT_FOUND';

		await this.deleteDocument('commentsCollection', commentToDelete);

		const { date } = commentToDelete;
		return { ...commentToDelete, date: parseDateToJSON(date) };
	};

	// Actualizar un comentario
	updateComment = async (_id, email, body) => {
		if (!email) return 'EMAIL_NOT_SPECIFIED';

		const getUser = await this.findEmail(email);
		if (!getUser) return 'USER_NOT_FOUND';

		const commentToUpdate = await this.getOneDocument('commentsCollection', new ObjectId(_id));
		if (!commentToUpdate) return 'COMMENT_NOT_FOUND';

		await this.updateDocument('commentsCollection', commentToUpdate, { text: body.text });

		const { date } = commentToUpdate;
		return { ...commentToUpdate, date: parseDateToJSON(date) };
	};
}

// Patron singleton para instanciar la clase
const managerComments = new ManagerComments();
export default managerComments;
