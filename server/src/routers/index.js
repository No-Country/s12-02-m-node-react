import { Router } from 'express';
import { userRouter } from './userRouter.js';
import { eventRouter } from './eventRouter.js';
import commentsRouter from './commentsRouter.js';
import { publicationsRouter } from './publicationsRouter.js';
import { loginRouter } from './loginRouter.js';
import { bookingsRouter } from './bookingsRouter.js'

const indexRouter = Router();

indexRouter.use('/user', userRouter);
indexRouter.use('/event', eventRouter);
indexRouter.use('/comments', commentsRouter);
indexRouter.use('/publications', publicationsRouter);
indexRouter.use('/login', loginRouter);
indexRouter.use('/booking', bookingsRouter);

export default indexRouter;
