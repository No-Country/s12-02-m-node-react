import mongoose from 'mongoose';

const likeSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	publication_ID: {
		type: String,
		ref: 'Publication',
	},
});

const Likes = mongoose.model('Likes', likeSchema);
export default Likes;
