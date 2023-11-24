import { Router } from "express";
import { newComment } from "../controllers/commentsController.js";

const router = Router()

router.post('/:email/newComment', newComment);

export default router;