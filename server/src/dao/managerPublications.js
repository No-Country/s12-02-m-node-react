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

	// Create one publication in the DB
	async createPublication(data) {
		const { email, title, description, category, photos, date, comment_ID, active } = data;
		const publication = PublicationsModel({
			email,
			title,
			description,
			category,
			photos,
			date,
			comment_ID,
			active,
		});
		await this.createDocument('publicationsCollection', publication);
	}

	// Get all publications or those publications that match the query
	async getAllPublications(query) {
		try {
			const publications = await this.getAllDocuments('publicationsCollection', query);
			if (!publications) throw new Error('Not publications avalaibles');
			return publications;
		} catch (error) {
			throw new Error(`Error trying to get posts: ${error.message}`);
		}
	}

	// Get only one publication that match the query
	async getOnePublication(query) {
		try {
			const publication = await this.getOneDocument('publicationsCollection', query);
			return publication;
		} catch (error) {
			throw new Error(`Error trying to get post: ${error.message}`);
		}
	}

	// Update one publication that match the filter
	async updatePublication(filter, dataUpdate) {
		try {
			const publicationUpdate = await this.updateDocument(
				'publicationsCollection',
				filter,
				dataUpdate
			);
			return publicationUpdate;
		} catch (error) {
			throw new Error(`Error trying to update post ${error.message}`);
		}
	}

	// Delete one publication that match the filter
	async deletePublication(filter) {
		try {
			const publicationDelete = await this.deleteDocument('publicationsCollection', filter);
			return publicationDelete;
		} catch (error) {
			throw new Error(`Error trying to update post ${error.message}`);
		}
	}
}

export default PublicationsManager;
