import UserManager from '../dao/managerUser.js';
// import UserModel from '../models/userModel.js';
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
		return res.status(200).json({
			data: newUser,
			status: 0,
			message: 'Usuario creado correctamente',
		});
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
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
			message: 'Usuario encontrado exitosamente.',
		});
	} catch (error) {
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
		if (!Users) {
			throw new Error('No hay usuarios para mostrar.');
		}
		return res.status(200).json({
			data: Users,
			status: 0,
			message: 'Se han encontrado los siguientes usuarios',
		});
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
	}
}

async function updateUser(req, res) {
	const email = req.params;
	const data = req.body;
	try {
		const Users = await usermanager.updateUser(email, data);
		if (Users.matchedCount > 0) {
			const userUp = await usermanager.getOneUser(email);
			return res.status(200).json({
				data: userUp,
				status: 0,
				message: 'La actualización de datos fue exitosa.',
			});
		} else {
			throw new Error('No se pudo realizar la actualización.');
		}
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
	}
}

export { createUser, getUser, getUsers, updateUser };
