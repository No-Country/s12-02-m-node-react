import { v2 as cloudinaryV2 } from 'cloudinary';
import 'dotenv/config';

const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

cloudinaryV2.config({
	cloud_name: cloudName,
	api_key: apiKey,
	api_secret: apiSecret,
});

async function uploadImage(fileBuffer) {
	const result = await new Promise((resolve, reject) => {
		const uploadStream = cloudinaryV2.uploader.upload_stream(
			{
				resource_type: 'auto',
				allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
			},
			(error, result) => {
				if (error) {
					reject(new Error(error.message));
				} else {
					resolve(result);
				}
			}
		);
		uploadStream.end(fileBuffer);
	});
	return result.secure_url;
}

async function deleteImage(url) {
	const publicId = getPublicIdFromImageUrl(url);
	await cloudinaryV2.uploader.destroy(publicId);
}

function getPublicIdFromImageUrl(imageUrl) {
	const regex = /\/([^/]+)\.[^.]+$/;
	const match = imageUrl.match(regex);

	if (match && match[1]) {
		const publicId = match[1];
		return publicId;
	}

	return null;
}

export { uploadImage, deleteImage, getPublicIdFromImageUrl };
