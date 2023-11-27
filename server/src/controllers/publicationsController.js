import PublicationsManager from '../dao/managerPublications.js';
import PublicationsModel from '../models/publicationsModel.js';
const publicationsmanager = new PublicationsManager();

// This controller is for creating a publication
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

// This controller return all publications, the query is optional for data subsets
async function getAllPublicationsController(req, res) {
	try {
		const query = req.query;
		const allPublications = await PublicationsManager.getAllPublications(query);
		return res.status(200).send(allPublications);
	} catch (error) {
		return res.status(400).send(error);
	}
}

// This controller return one publication that match the query
async function getOnePublicationController(req, res) {
	try {
		const query = req.query;
		const onePublication = await PublicationsManager.getOnePublication(query);
		return res.status(200).send(onePublication);
	} catch (error) {
		return res.status(400).send(error);
	}
}

// This controoler update one publication that match the filter
async function updatePublicationController(req, res) {
	try {
		const { dataUpdate, filter } = req.body;
		const result = await PublicationsManager.updatePublication(filter, dataUpdate);
		if (result.matchedCount > 0) {
			const publicationUpdated = await PublicationsManager.getOnePublication(filter);
			return res.status(200).send(publicationUpdated);
		} else {
			return res.status(404).send('No post found to update with that filter');
		}
	} catch (error) {
		return res.status(400).send(error);
	}
}

// This controller delete one publication physically or logically
async function deletePublicationController(req, res) {
	try {
		const { mode, filter } = req.query;
		if (mode === 'physically') {
			// delete phisically
			const result = await PublicationsManager.deletePublication(filter);
			if (result.deletedCoint > 0) {
				return res.status(200).send('The post has been deleted.');
			} else {
				return res.status(404).send('The post not found.');
			}
		} else {
			// Delete logical
			const result = await PublicationsManager.updatePublication(filter, { active: false });
			if (result.matchedCount > 0) {
				const publicationDeleted = await PublicationsManager.getOnePublication(filter);
				return res.status(200).send(publicationDeleted);
			} else {
				return res.status(404).send('No post found to delete with that filter');
			}
		}
	} catch (error) {
		return res.status(400).send(error);
	}
}

export {
	createPublicationController,
	getAllPublicationsController,
	getOnePublicationController,
	updatePublicationController,
	deletePublicationController,
};
