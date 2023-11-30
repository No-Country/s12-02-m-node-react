import config from '../config/firebase.js';

export default async function login(req, res) {
	try {
		return res.status(200).json(config);
	} catch (error) {
		return res.status(400).send(error);
	}
}
