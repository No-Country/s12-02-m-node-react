import { Router } from 'express';
import { createUser, getUser, getUsers, updateUser } from '../controllers/userController.js';
import authenticateToken from '../middleware/firebase.js';
const userRouter = Router();

// userRouter.get('/', authenticateToken, getUsers);

userRouter.get('/', getUsers);

userRouter.get('/:email', getUser);

userRouter.post('/', createUser);

userRouter.put('/:email', updateUser);

export { userRouter };
