import { Router } from 'express';
import login from '../controllers/loginController.js';
const loginRouter = Router();

loginRouter.get('/', login);

export { loginRouter };
