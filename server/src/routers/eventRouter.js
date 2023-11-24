import { Router } from 'express';
import { createEvent } from '../controllers/enventController.js';

const eventRouter = Router();

eventRouter.post('/', createEvent);

export { eventRouter };
