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

async function getUser(req, res) {
	const email = req.params;
	try {
		const User = await usermanager.getOneUser(email);
		if (!User) {
			throw new Error('El usuario no existe');
		}
		return res.status(200).json({
			data: User,
			status: 0,
			message: 'Usuario encontrado',
		});
	} catch (error) {
		console.error('Error al obtener el usuario', error);
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
	}
}

async function getUsers(req, res) {
	try {
		const Users = await usermanager.getAllUser();
		return res.status(200).send(Users);
	} catch (error) {
		console.error('Error al obtener el usuario', error);
	}
}

async function updateUser(req, res) {
	const email = req.params;
	const data = req.body;
	try {
		const Users = await usermanager.updateUser(email, data);
		if (Users.matchedCount > 0) {
			const userUp = await usermanager.getOneUser(email);
			return res.status(200).send(userUp);
		}
	} catch (error) {
		console.error('Error al actualizar el usuario', error);
		return res.status(400).send(error);
	}
}

export { createUser, getUser, getUsers, updateUser };
