import mongoose from 'mongoose';

const publicationsScheme = new mongoose.Schema({
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
	title: {
		type: String,
		require: true,
		trim: true,
		minlength: [5, 'El título no puede ser inferior a 5 carcateres.'],
		maxlength: [60, 'El título no puede exceder los 60 caracteres.'],

	},
	description: {
		type: String,
		require: true,
		trim: true,
		minlength: [50, 'La descripción no puede ser menor a 50 caracteres.'],
		maxlength: [1000, 'La descripción no puede exceder los 1000 caracteres.'],
	},

	category: {
		type: String,
		enum: ['Música', 'Cultura', 'Deportes', 'Aprendizaje', 'Otros'],
		default: 'Otros',
	},

	photos: {
		type: [String],
		require: true,
		trim: true,
		validate: {
			validator: function (value) {
			  return value.every(url => /^(http|https):\/\//.test(url));
			},
			message: 'Todas las URLs de las fotos deben comenzar con "http://" o "https://".',
		  },
	},
	date: {
		type: Date,
		default: Date.now,
		validate: {
		  validator: function (value) {
			// Verificar si la fecha proporcionada es válida (puede ser nula)
			return value === null || !isNaN(value);
		  },
		  message: 'La fecha proporcionada no es válida.',
		},
	},
	comment_ID: {
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
	active: {
		type: Boolean,
		default: true,
	},
});

const PublicationsModel = mongoose.model('publications', publicationsScheme);

export default PublicationsModel;
