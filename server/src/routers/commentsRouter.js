import { Router } from 'express';
import {
	deleteCommentController,
	getAllCommentsController,
	getOneCommentController,
	createCommentController,
	updateCommentController,
} from '../controllers/commentsController.js';

const router = Router();

router.get('/all', getAllCommentsController);

router.get('/:id', getOneCommentController);

router.post('/', createCommentController);

router.delete('/:mode/:id', deleteCommentController);

router.put('/:id', updateCommentController);

export default router;
