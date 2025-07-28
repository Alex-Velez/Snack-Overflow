import express from 'express';
import { ItemController } from '../controllers/ItemController.js';

const router = express.Router();

router.post('/', ItemController.create);

router.get('/', ItemController.list);
router.get('/sku/:sku', ItemController.getBySku);
router.get('/upc/:upc', ItemController.getByUpc);
router.get('/category/:category', ItemController.getByCategory);
router.get('/search/:name', ItemController.getByName);

router.put('/:sku', ItemController.update);

router.delete('/:sku', ItemController.remove);

export default router;
