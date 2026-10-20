import { Request, Response } from 'express';
import { AppError } from '../middlewares/error.middleware';

interface Item {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

// In-memory data store for demonstration
let items: Item[] = [
  {
    id: '1',
    name: 'First Item',
    description: 'This is sample item number 1',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Second Item',
    description: 'This is sample item number 2',
    createdAt: new Date().toISOString(),
  },
];

export function getItems(_req: Request, res: Response) {
  res.status(200).json({
    success: true,
    data: items,
    total: items.length,
  });
}

export function getItemById(req: Request, res: Response) {
  const { id } = req.params;
  const item = items.find((i) => i.id === id);

  if (!item) {
    throw new AppError(`Item with id '${id}' not found`, 404);
  }

  res.status(200).json({
    success: true,
    data: item,
  });
}

export function createItem(req: Request, res: Response) {
  const { name, description } = req.body;

  if (!name || typeof name !== 'string') {
    throw new AppError('Name is required and must be a string', 400);
  }

  const newItem: Item = {
    id: String(Date.now()),
    name,
    description: description || '',
    createdAt: new Date().toISOString(),
  };

  items.push(newItem);

  res.status(201).json({
    success: true,
    message: 'Item created successfully',
    data: newItem,
  });
}

export function deleteItem(req: Request, res: Response) {
  const { id } = req.params;
  const index = items.findIndex((i) => i.id === id);

  if (index === -1) {
    throw new AppError(`Item with id '${id}' not found`, 404);
  }

  const deleted = items.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: 'Item deleted successfully',
    data: deleted,
  });
}
