import Database from './mongodb.js';

this.db = new Database();

async function createDocument(collection, data) {
	// eslint-disable-next-line no-useless-catch
	try {
		if (!this.db[collection]) {
			await this.db.connectToDatabase();
		}
		return this.db[collection].insertOne(data);
	} catch (error) {
		throw error;
	}
}

export { createDocument };
