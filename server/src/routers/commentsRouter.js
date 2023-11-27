import { Router } from 'express';
import {
	deleteComment,
	getComments,
	newComment,
	updateComment,
} from '../controllers/commentsController.js';

const router = Router();

router.get('/all-comments', getComments);

router.post('/:email/new-comment', newComment);

router.delete('/:email/delete-comment/:id', deleteComment);

router.put('/:email/update-comment/:id', updateComment);

export default router;
