import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		date: {
			type: Date,
			required: true,
			trim: true,
			default: new Date(),
		},
	},
	{
		timestamps: false,
		versionKey: false,
	}
);

const CommentsModel = mongoose.model('comments', schema);
export default CommentsModel;