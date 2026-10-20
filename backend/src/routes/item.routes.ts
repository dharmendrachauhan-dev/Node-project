import { Router } from 'express';
import {
  getItems,
  getItemById,
  createItem,
  deleteItem,
} from '../controllers/item.controller';

const router = Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', createItem);
router.delete('/:id', deleteItem);

export default router;
