// routes/transactions.js
import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController.js';

const router = Router();

router.post('/', TransactionController.start);

router.post('/:tid/items', TransactionController.addItem);


router.delete('/:tid/items/:sku', TransactionController.removeItem);


router.get('/:tid', TransactionController.getById);


router.get('/user/:uid', TransactionController.listByUser);

export default router;