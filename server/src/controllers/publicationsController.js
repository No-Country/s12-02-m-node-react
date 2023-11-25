import PublicationsManager from '../dao/managerPublications.js';
import PublicationsModel from '../models/publicationsModel.js';
const publicationsmanager = new PublicationsManager();

async function createPublicationController(req, res) {
	try {
		const data = req.body;
		const validateError = PublicationsModel(data).validateSync();
		if (validateError) {
			throw validateError;
		}
		await publicationsmanager.createPublication(data);
		return res.status(200).send('Publication created successfully');
	} catch (error) {
		return res.status(400).send(error);
	}
}

export { createPublicationController };
