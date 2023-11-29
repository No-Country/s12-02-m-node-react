import { Router } from 'express';
import {
	createPublicationController,
	getAllPublicationsController,
	getOnePublicationController,
	updatePublicationController,
	deletePublicationController,
} from '../controllers/publicationsController.js';
const publicationsRouter = Router();

publicationsRouter.post('/', createPublicationController);
publicationsRouter.get('/all', getAllPublicationsController);
publicationsRouter.get('/one', getOnePublicationController);
publicationsRouter.put('/update', updatePublicationController);
// publicationsRouter.delete('/delete/:id', deletePublicationController);
publicationsRouter.delete('/delete/:mode/:id', deletePublicationController);

export { publicationsRouter };
