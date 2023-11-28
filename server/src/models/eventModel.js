import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
		trim: true,
	},
	title: {
		type: String,
		require: true,
		trim: true,
	},
	description: {
		type: String,
		require: true,
		trim: true,
	},
	capacity: {
		type: Number,
		require: true,
		trim: true,
	},
	datein: {
		type: Date,
		require: true,
		trim: true,
	},
	dateout: {
		type: Date,
		require: true,
		trim: true,
	},
	modality: {
		type: String,
		enum: ['online', 'in-person'],
		require: true,
		trim: true,
	},
	ubication: {
		type: String,
		require: true,
		trim: true,
	},
	category: {
		type: String,
		require: true,
		trim: true,
	},
	price: {
		type: Number,
		default: 0,
		trim: true,
	},
	pictures: {
		type: [String],
		trim: true,
	},
	ageRange: {
		type: Number,
		require: true,
		trim: true,
	},
});

const EventModel = mongoose.model('Event', eventSchema);

export default EventModel;
