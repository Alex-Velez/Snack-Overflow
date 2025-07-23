import  { Router } from 'express'
import { DiscountController } from '../controllers/DiscountController.js'

const router = Router();

router.post('/add', DiscountController.add);
router.get('/:code', DiscountController.get);
router.delete('/remove/:code', DiscountController.remove);

export default router