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
	datein: {
		type: Date,
		required: true,
		validate: {
			validator: value => value > Date.now(),
			message: 'La fecha de inicio debe ser en el futuro.',
		},
	},
	dateout: {
		type: Date,
		required: true,
		validate: {
			validator: function (value) {
				return value > this.datein;
			},
			message: 'La fecha de finalización debe ser después de la fecha de inicio.',
		},
	},
	modality: {
		type: String,
		enum: ['en-linea', 'presencial'],
		required: true,
		trim: true,
	},
	ubication: {
		type: String,
		required: true,
		trim: true,
	},
	category: {
		type: String,
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
