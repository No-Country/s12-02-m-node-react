import { Router } from 'express';
import { userRouter } from './userRouter.js';
import { eventRouter } from './eventRouter.js';
import commentsRouter from './commentsRouter.js';

const indexRouter = Router();

indexRouter.use('/user', userRouter);
indexRouter.use('/event', eventRouter);
indexRouter.use('/comments', commentsRouter);

export default indexRouter;
