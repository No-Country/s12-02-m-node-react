import PublicationsManager from '../dao/managerPublications.js';
import PublicationsModel from '../models/publicationsModel.js';
import { ObjectId } from 'mongodb';
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
		return res.status(200).json({
			data: {},
			status: 0,
			message: 'Se han guardado con éxito la publicación.',
		});
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
	}
}

// This controller return all publications, the query is optional for data subsets
async function getAllPublicationsController(req, res) {
	try {
		const query = req.query;
		const allPublications = await publicationsmanager.getAllPublications(query);
		if (allPublications.length === 0) throw new Error('No hay publicaciones para mostrar');
		return res.status(200).json({
			data: allPublications,
			status: 0,
			message: 'Se han encontrado las siguientes publicaciones.',
		});
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
	}
}

// This controller return one publication that match the query (por id o title)
async function getOnePublicationController(req, res) {
	try {
		const queryParams = req.query;
		let query;
		if (queryParams.id) {
			const publicationId = new ObjectId(queryParams.id);
			query = { _id: publicationId };
		} else if (queryParams.title) {
			query = { title: queryParams.title };
		} else {
			throw new Error('No hay publicaciones.');
		}
		const onePublication = await publicationsmanager.getOnePublication(query);
		if (!onePublication)
			throw new Error(
				'No hay publicaciones para mostrar que coincidan con sus criterios de búsqueda.'
			);
		return res.status(200).json({
			data: onePublication,
			status: 0,
			message: 'Se han encontrado las siguientes publicaciones.',
		});
	} catch (error) {
		return res.status(400).json({
			data: {},
			status: 1,
			message: error.message,
		});
	}
}

// This controoler update one publication that match the filter
async function updatePublicationController(req, res) {
	try {
		const { dataUpdate, filter } = req.body;
		let query;
		if (filter._id) {
			const publicationId = new ObjectId(filter._id);
			query = { _id: publicationId };
		}
		const result = await publicationsmanager.updatePublication(query, dataUpdate);
		if (result.matchedCount > 0) {
			const publicationUpdated = await publicationsmanager.getOnePublication(filter);
			return res.status(200).send(publicationUpdated);
		} else {
			return res
				.status(404)
				.send('No se encontró ninguna publicación para actualizar con ese filtro.');
		}
	} catch (error) {
		return res.status(400).send(error);
	}
}

// This controller delete one publication physically (mode = 0) or logically (mode = 1)
async function deletePublicationController(req, res) {
	try {
		const { mode, id } = req.params;
		let result;
		let filter = {};
		const publicationId = new ObjectId(id);
		filter = { _id: publicationId };
		if (mode === 0) {
			result = await publicationsmanager.deletePublication(filter);
		} else {
			result = await publicationsmanager.updatePublication(filter, { active: false });
		}
		if (result.deletedCount > 0 || result.matchedCount > 0) {
			const action = mode === 0 ? 'físicamente' : 'lógicamente';
			const publicationDeleted = await publicationsmanager.getOnePublication(filter);
			const successMessage = `La publicación ha sido eliminada exitosamente. ${action}.`;

			return res.status(200).json({
				data: publicationDeleted,
				status: 0,
				message: successMessage,
			});
		} else {
			const errorMessage = 'No se encontró ninguna publicación para eliminar con ese filtro.';
			return res.status(404).json({
				data: {},
				status: 1,
				message: errorMessage,
			});
		}
	} catch (error) {
		const errorMessage = 'Se produjo un error al procesar la solicitud.';
		return res.status(400).json({
			data: {},
			status: 1,
			message: errorMessage,
		});
	}
}

export {
	createPublicationController,
	getAllPublicationsController,
	getOnePublicationController,
	updatePublicationController,
	deletePublicationController,
};
