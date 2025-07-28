import express from 'express';
import { UserController } from '../controllers/UserController.js';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.patch('/:uid', UserController.update);
router.get('/:uid', UserController.getById);
router.get('/', UserController.list);

export default router;
