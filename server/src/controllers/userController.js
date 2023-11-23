import UserManager from '../dao/managerUser.js';
import UserModel from '../models/userModel.js';
const usermanager = new UserManager();

async function createUser(req, res) {
	try {
		const data = req.body;
		const validateError = UserModel(data).validateSync();
		if (validateError) {
			throw validateError;
		}
		const newUser = await usermanager.createUser(data);
		return res.status(200).send(newUser);
	} catch (error) {
		return res.status(400).send(error);
	}
}

export { createUser };
