import { Router } from 'express';
import { createUser } from '../controllers/userController';
const userRouter = Router();

userRouter.post('/', createUser);

export default userRouter;
