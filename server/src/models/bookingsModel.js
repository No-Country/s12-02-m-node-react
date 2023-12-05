import mongoose from 'mongoose';

const bookingsScheme = new mongoose.Schema({
	email: {
		type: String,
		require: true,
		trim: true,
		validate: {
			validator: function (value) {
				// Utiliza una expresión regular para validar el formato del correo electrónico
				return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
			},
			message: 'El campo email no es valido.',
		},
	},
	event_ID: {
		type: String,
		require: true,
		trim: true,
		validate: {
			validator: function (value) {
			  return mongoose.Types.ObjectId.isValid(value);
			},
			message: 'El campo comment_ID no es un ObjectId válido.',
		},
	},
});

const BookingsModel = mongoose.model('bookings', bookingsScheme);

export default BookingsModel;
