import mongoose from 'mongoose';

const publicationsScheme = new mongoose.Schema({
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

	category: {
		type: String,
		enum: ['Música', 'Cultura', 'Deportes', 'Aprendizaje', 'Otros'],
		default: 'Otros',
	},

	photos: {
		type: [String],
		require: true,
		trim: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	comment_ID: {
		type: String,
		require: true,
		trim: true,
	},
});

const PublicationsModel = mongoose.model('publications', publicationsScheme);

export default PublicationsModel;
