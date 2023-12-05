import 'dotenv/config';
import { MongoClient } from 'mongodb';
// import mongoose from 'mongoose';

const DB = process.env.MONGO_DB_NAME;
const URI = process.env.MONGO_DB_URI;

class Database {
	constructor() {
		this.uri = URI;
		this.client = new MongoClient(this.uri);
		this.db = null;
	}

	async connectToDatabase() {
		try {
			await this.client.connect();

			this.usersCollection = this.client.db(DB).collection('user');
			this.eventsCollection = this.client.db(DB).collection('event');
			this.commentsCollection = this.client.db(DB).collection('comments');
			this.publicationsCollection = this.client.db(DB).collection('publications');
			this.bookingsCollection = this.client.db(DB).collection('bookings');
			this.likesCollection = this.client.db(DB).collection('likes');
			console.log('Conectado a la base de datos');
		} catch (error) {
			console.error(error);
		}
	}

	async disconnect() {
		await this.client.close();
		console.log('Desconectado de la base de datos');
	}
}

export default Database;
