import mongoose from 'mongoose';

const userScheme = new mongoose.Schema({
	names: {
		type: String,
		require: true,
		trim: true,
	},

	lastname: {
		type: String,
		require: true,
		trim: true,
	},

	birthDate: {
		type: Date,
		require: true,
		trim: true,
	},
	email: {
		type: String,
		require: true,
		trim: true,
		validate: {
			validator: function (value) {
				// Utiliza una expresión regular para validar el formato del correo electrónico
				return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
			},
			message: 'El campo email no es una dirección de correo electrónico válida.',
		},
	},

	country: {
		type: String,
		require: true,
		trim: true,
	},
	picture: {
		type: String,
		require: true,
		trim: true,
	},
	rol: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
		trim: true,
	},
});

const UserModel = mongoose.model('User', userScheme);

export default UserModel;
