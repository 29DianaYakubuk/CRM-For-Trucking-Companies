import { Router } from 'express';
import { protect } from '../middleware/auth';
import { listItems, getItem, createItem, updateItem, deleteItem } from '../controllers/items.controller';

const router = Router();
router.use(protect);
router.get('/', listItems);
router.get('/:id', getItem);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);
export default router;