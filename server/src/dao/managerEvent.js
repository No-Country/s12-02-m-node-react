import Database from '../config/mongodb.js';
import { createDocument, getOneDocument } from '../config/factory.js';

import EventModel from '../models/eventModel.js';

class EventManager {
	constructor() {
		this.db = new Database();
		this.createDocument = createDocument;
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
		await this.createDocument('eventsCollection', newEvent);
		return newEvent;
	}
}

export default EventManager;
