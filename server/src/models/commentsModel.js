import mongoose from 'mongoose';

const commentsScheme = new mongoose.Schema({
	text: {
		type: String,
		required: true,
		trim: true,
		minlength: [5, 'El título no puede ser inferior a 5 carcateres.'],
		maxlength: [60, 'El título no puede exceder los 60 caracteres.'],
	},
	email: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: function (value) {
				// Utiliza una expresión regular para validar el formato del correo electrónico
				return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
			},
			message: 'El campo email no es valido.',
		},
	},
	date: {
		type: Date,
		required: true,
		trim: true,
		default: Date.now,
	},
	active: {
		type: Boolean,
		default: true,
	},
	event_ID: {
		type: String,
		required: true,
		trim: true,
		validate: {
			validator: function (value) {
				return mongoose.Types.ObjectId.isValid(value);
			},
			message: 'El campo comment_ID no es un ObjectId válido.',
		},
	},
});

const CommentsModel = mongoose.model('comments', commentsScheme);
export default CommentsModel;
