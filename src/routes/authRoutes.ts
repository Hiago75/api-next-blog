import { Router } from 'express';

import { AuthenticateUserFactory, RefreshUserTokenFactory, RetrieveUserDataFactory } from '../factories';
const router = Router();

const authenticateUserController = AuthenticateUserFactory();
const retrieveUserDataController = RetrieveUserDataFactory();
const refreshUserTokenController = RefreshUserTokenFactory();

router.post('/login', authenticateUserController.handle.bind(authenticateUserController));
router.post('/retrieve', retrieveUserDataController.handle.bind(retrieveUserDataController));
router.get('/refresh', refreshUserTokenController.handle.bind(refreshUserTokenController));

export default router;
