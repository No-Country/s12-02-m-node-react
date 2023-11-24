import { Router } from 'express';
import { userRouter } from './userRouter.js';
import commentsRouter from './commentsRouter.js';

const indexRouter = Router();

indexRouter.use('/user', userRouter);
indexRouter.use('/comments', commentsRouter);

export default indexRouter;
