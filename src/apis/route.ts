import express from 'express';
export const router = express.Router();
import { authRouter } from '../apis/auth_router';

const appRouter = router.use('/', router);

appRouter.use('/auth', authRouter);
