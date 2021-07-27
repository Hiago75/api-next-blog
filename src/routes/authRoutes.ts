import { Router } from 'express';
import { AuthenticateUserFactory } from '../factories';

const router = Router();

const authenticateUserController = AuthenticateUserFactory();

router.post('/', authenticateUserController.handle.bind(authenticateUserController));

export default router;
