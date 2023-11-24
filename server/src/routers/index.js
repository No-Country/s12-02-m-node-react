import { Router } from 'express';
import { userRouter } from './userRouter.js';
import { eventRouter } from './eventRouter.js';

const indexRouter = Router();

indexRouter.use('/user', userRouter);
indexRouter.use('/event', eventRouter);

export default indexRouter;
