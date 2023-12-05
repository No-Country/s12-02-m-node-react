/* eslint-disable camelcase */
import Database from '../config/mongodb.js';
import {
	createDocument,
	getAllDocuments,
	getOneDocument,
	updateDocument,
	deleteDocument,
} from '../config/factory.js';

import BookingsModel from '../models/bookingsModel.js';

class BookingsManager {
	constructor() {
		this.db = new Database();
		this.createDocument = createDocument;
		this.getAllDocuments = getAllDocuments;
		this.getOneDocument = getOneDocument;
		this.updateDocument = updateDocument;
		this.deleteDocument = deleteDocument;
	}

	// Create one booking in the DB
	async createBooking(data) {
		const { email, event_ID } = data;
		const booking = BookingsModel({
			email,
			event_ID,
		});
		await this.createDocument('bookingsCollection', booking);
	}

	// Get all bookings or those bookings that match the query
	async getAllBookings(query) {
		try {
			const bookings = await this.getAllDocuments('bookingsCollection', query);
			if (!bookings) throw new Error('No hay reservas disponibles.');
			return bookings;
		} catch (error) {
			throw new Error(`Error al intentar conseguir las reservas: ${error.message}`);
		}
	}

	// Get only one booking that match the query
	async getOneBooking(query) {
		try {
			const booking = await this.getOneDocument('bookingsCollection', query);
			return booking;
		} catch (error) {
			throw new Error(`Error al intentar conseguir reservas: ${error.message}`);
		}
	}

	// Update one booking that match the filter
	async updateBooking(filter, dataUpdate) {
		try {
			const bookingUpdate = await this.updateDocument('bookingsCollection', filter, dataUpdate);
			return bookingUpdate;
		} catch (error) {
			throw new Error(`Error al intentar actualizar la reserva: ${error.message}`);
		}
	}

	// Delete one booking that match the filter
	async deleteBooking(filter) {
		try {
			const bookingDelete = await this.deleteDocument('bookingsCollection', filter);
			return bookingDelete;
		} catch (error) {
			throw new Error(`Error al intentar eliminar la reserva: ${error.message}`);
		}
	}
}

export default BookingsManager;
