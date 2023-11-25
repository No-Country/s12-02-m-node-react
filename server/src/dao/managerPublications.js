/* eslint-disable camelcase */
import Database from '../config/mongodb.js';
import {
	createDocument,
	getAllDocuments,
	getOneDocument,
	updateDocument,
	deleteDocument,
} from '../config/factory.js';

import PublicationsModel from '../models/publicationsModel.js';

class PublicationsManager {
	constructor() {
		this.db = new Database();
		this.createDocument = createDocument;
		this.getAllDocuments = getAllDocuments;
		this.getOneDocument = getOneDocument;
		this.updateDocument = updateDocument;
		this.deleteDocument = deleteDocument;
	}

	async createPublication(data) {
		const { email, title, description, category, photos, date, comment_ID } = data;
		const publication = PublicationsModel({
			email,
			title,
			description,
			category,
			photos,
			date,
			comment_ID,
		});
		await this.createDocument('publicationsCollection', publication);
	}
}

export default PublicationsManager;
