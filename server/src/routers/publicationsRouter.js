import { Router } from 'express';
import { createPublicationController } from '../controllers/publicationsController.js';
const publicationsRouter = Router();

publicationsRouter.post('/', createPublicationController);

export { publicationsRouter };
