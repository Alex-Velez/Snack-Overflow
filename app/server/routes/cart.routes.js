import {Router} from 'express';
import { CartController } from '../controllers/CartController.js';

const router = Router();

router.post('/update', CartController.update);
router.delete('/remove/:sku', CartController.remove);
router.delete('/clear', CartController.clear)
router.get('/', CartController.getAll);
router.get('/:sku', CartController.getItem);

export default router;