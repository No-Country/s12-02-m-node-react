import Database from '../config/mongodb.js';
import {
	createDocument,
	getAllDocuments,
	getOneDocument,
	deleteDocument,
	updateDocument,
} from '../config/factory.js';

import EventModel from '../models/eventModel.js';
import { ObjectId } from 'mongodb';
import { deleteImage } from '../utils/cloudinary.js';

class EventManager {
	constructor() {
		this.db = new Database();
		this.createDocument = createDocument;
		this.getAllDocuments = getAllDocuments;
		this.getOneDocument = getOneDocument;
		this.deleteDocument = deleteDocument;
		this.updateDocument = updateDocument;
		this.collection = 'eventsCollection';
	}

	async findEmail(email) {
		const getEmail = await getOneDocument('usersCollection', { email });
		return getEmail;
	}

	async createEvent(data) {
		const { email } = data;
		if (!email) return 'Email no especificado';

		const getUser = await this.findEmail(email);
		if (!getUser) return 'Email no econtrado';

		const newEvent = EventModel(data);
		await this.createDocument(this.collection, newEvent);
		return newEvent;
	}

	async getOneEvent(_id) {
		const event = await this.getOneDocument(this.collection, new ObjectId(_id));
		return event;
	}

	async getAllEvents(query) {
		const allEvents = await this.getAllDocuments(this.collection, query);
		return allEvents;
	}

	async deleteEvent(_id) {
		const deletedEvent = await this.getOneDocument(this.collection, new ObjectId(_id));
		for (let i = 0; i < deletedEvent.pictures.length; i++) {
			const url = deletedEvent.pictures[i];
			url.includes('cloudinary.com') && (await deleteImage(url));
		}
		await this.deleteDocument(this.collection, deletedEvent);
		return deletedEvent;
	}

	async updateEvent(_id, body) {
		const event = await this.getOneDocument(this.collection, new ObjectId(_id));
		await this.updateDocument(this.collection, event, body);
		return 'Evento actualizado con éxito';
	}
}

export default EventManager;
