import express from 'express';
export const authRouter = express.Router();
import {
  register,
  login
} from '../controllers/auth_controller';
// ALL DONE
authRouter.post('/register', register);
authRouter.post('/login', login);
