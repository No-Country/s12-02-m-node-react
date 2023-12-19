import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
	},
	title: {
		type: String,
		required: true,
		trim: true,
		maxlength: [100, 'El título no puede tener más de 100 caracteres.'],
	},
	description: {
		type: String,
		required: true,
		trim: true,
		maxlength: [500, 'La descripción no puede tener más de 500 caracteres.'],
	},
	capacity: {
		type: Number,
		required: true,
		min: [1, 'La capacidad debe ser al menos 1.'],
	},
	dates: {
		type: {
			start: {
				type: String,
				validate: {
					validator: function (value) {
						return /^\d{4}-\d{2}-\d{2}$/.test(value);
					},
					message: props => `${props.value} no es un formato de fecha válido (aaaa-mm-dd)`,
				},
			},
			end: {
				type: String,
				validate: {
					validator: function (value) {
						return /^\d{4}-\d{2}-\d{2}$/.test(value);
					},
					message: props => `${props.value} no es un formato de fecha válido (aaaa-mm-dd)`,
				},
			},
		},
		required: true,
	},
	startHour: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				// Expresión regular para validar el formato hh:mm
				return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
			},
			message: props => `${props.value} no es un formato de hora válido (hh:mm)`,
		},
	},
	endHour: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				// Expresión regular para validar el formato hh:mm
				return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
			},
			message: props => `${props.value} no es un formato de hora válido (hh:mm)`,
		},
	},
	modality: {
		type: String,
		enum: ['en-linea', 'presencial'],
		required: true,
		trim: true,
	},
	location: {
		type: String,
		required: true,
		trim: true,
	},
	category: {
		type: String,
		enum: [
			'música',
			'vida nocturna',
			'gastronomia',
			'arte',
			'feriados',
			'salud',
			'pasatiempos',
			'negocios',
		],
		required: true,
		trim: true,
	},
	price: {
		type: Number,
		default: 0,
		required: true,
		min: [0, 'El precio no puede ser negativo.'],
	},
	pictures: {
		type: [String],
		trim: true,
	},
	minimumAge: {
		type: Number,
		required: true,
		min: [0, 'La edad mínima no puede ser negativa.'],
	},
});

const EventModel = mongoose.model('Event', eventSchema);

export default EventModel;
