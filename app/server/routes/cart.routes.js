import { Router } from 'express';
import { CartController } from '../controllers/CartController.js';

const router = Router();

router.post('/update', CartController.update);
router.delete('/remove/:sku', CartController.remove);
router.delete('/clear', CartController.clear)
router.get('/:userId', CartController.getAll);
router.get('/:userId/:sku', CartController.getItem);
router.post('/order', CartController.createOrder);

export default router;