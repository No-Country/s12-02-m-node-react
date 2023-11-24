import Database from '../config/mongodb.js';
import { createDocument, getOneDocument } from '../config/factory.js';
import CommentsModel from '../models/commentsModel.js';

class ManagerComments {
	constructor() {
		this.db = new Database();
		this.createDocument = createDocument;
		this.getOneDocument = getOneDocument;
	}

	// Metodo reutilizable para encontrar al usuario
	findEmail = async email => {
		const getEmail = await getOneDocument('usersCollection', { email });
		return getEmail;
	};

	createNewComment = async (email, body) => {
		if (!email) return 'EMAIL_NOT_SPECIFIED';

		const getUser = await this.findEmail(email);
		if (!getUser) return 'USER_NOT_FOUND';

		const newComment = CommentsModel({ text: body.text, email });
		await this.createDocument('commentsCollection', newComment);

		return newComment;
	};
}

const managerComments = new ManagerComments();
export default managerComments;
