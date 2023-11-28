import { Router } from 'express';
import {
	createEvent,
	getAllEvents,
	getOneEvent,
	deleteEvent,
	updateEvent,
} from '../controllers/enventController.js';

const eventRouter = Router();

eventRouter.post('/', createEvent);
eventRouter.get('/', getAllEvents);
eventRouter.get('/:_id', getOneEvent);
eventRouter.delete('/:_id', deleteEvent);
eventRouter.put('/:_id', updateEvent);

export { eventRouter };
