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
	},

	country: {
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
