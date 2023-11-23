import 'dotenv/config';
// import MongoClient from 'mongodb';
import mongoose from 'mongoose';

const DB = process.env.MONGO_DB_NAME;
const URI = process.env.MONGO_DB_URI;

class Database {
	constructor() {
		this.uri = URI;
		this.client = mongoose.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true });
		this.db = null;
	}

	async connectToDatabase() {
		try {
			await this.client.connect();

			this.usersCollectin = this.client.db(DB).collection('user');

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
