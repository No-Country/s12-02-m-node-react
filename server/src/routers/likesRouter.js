import { Router } from 'express';
import {
	createLikeController,
	deleteLikes,
	getLikesController,
} from '../controllers/likesControllers.js';
// import authenticateToken from '../middleware/firebase.js';
const likesRouter = Router();

likesRouter.get('/', getLikesController);

likesRouter.post('/', createLikeController);

likesRouter.delete('/', deleteLikes);

export { likesRouter };
