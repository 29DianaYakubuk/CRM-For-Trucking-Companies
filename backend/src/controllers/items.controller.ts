import { Response } from 'express';
import Item from '../models/Item';
import { AuthedRequest } from '../middleware/auth';

export const listItems = async (req: AuthedRequest, res: Response) => {
  const items = await Item.find({ owner: req.userId }).sort({ createdAt: -1 });
  res.json(items);
};

export const getItem = async (req: AuthedRequest, res: Response) => {
  const item = await Item.findOne({ _id: req.params.id, owner: req.userId });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

export const createItem = async (req: AuthedRequest, res: Response) => {
  const item = await Item.create({ ...req.body, owner: req.userId });
  res.status(201).json(item);
};

export const updateItem = async (req: AuthedRequest, res: Response) => {
  const item = await Item.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId },
    req.body,
    { new: true }
  );
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

export const deleteItem = async (req: AuthedRequest, res: Response) => {
  const item = await Item.findOneAndDelete({ _id: req.params.id, owner: req.userId });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
};