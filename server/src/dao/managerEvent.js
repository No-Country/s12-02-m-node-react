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
		if (!email) return 'EMAIL_NOT_SPECIFIED';

		const getUser = await this.findEmail(email);
		if (!getUser) return 'USER_NOT_FOUND';

		const newEvent = EventModel(data);
		await this.createDocument(this.collection, newEvent);
		return 'Evento creado con éxito';
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
