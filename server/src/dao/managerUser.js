import Database from '../config/mongodb';
import { createDocument } from '../config/factory.js';

import UserModel from '../models/userModel.js';

class UserManager {
	constructor() {
		this.db = new Database();
		this.createDocument = createDocument;
	}

	async createUser(data) {
		const { name, country, lastname, birthDate, email, role } = data;

		const user = UserModel({
			name,
			country,
			lastname,
			birthDate,
			email,
			role,
		});
		await this.createDocument('usersCollection', user);
	}
}

export default UserManager;
