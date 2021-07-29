import { Router } from 'express';

import { AuthenticateUserFactory } from '../factories';
import { RetrieveUserDataFactory } from '../factories/Auth/RetrieveUserDataFactory';

const router = Router();

const authenticateUserController = AuthenticateUserFactory();
const retrieveUserDataFactory = RetrieveUserDataFactory();

router.post('/login', authenticateUserController.handle.bind(authenticateUserController));
router.post('/retrieve', retrieveUserDataFactory.handle.bind(retrieveUserDataFactory));

export default router;
