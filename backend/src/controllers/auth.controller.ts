import { Request, Response } from 'express';
import User from '../models/User';
import Item from '../models/Item';
import { setAuthCookie } from '../utils/generateToken';

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already in use' });
  const user = await User.create({ email, password, name });
  setAuthCookie(res, user.id);

  // demo-данные
  await Item.insertMany([
    { title: 'Заявка: Miami → Orlando', description: 'Палеты 1.2т', owner: user._id, status: 'todo' },
    { title: 'Рейс: Tampa → Jacksonville', description: 'Стройматериалы', owner: user._id, status: 'in_progress' },
    { title: 'Доставка: Palm Beach', description: 'Мебель', owner: user._id, status: 'done' },
  ]);

  res.json({ id: user.id, email: user.email, name: user.name });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: any = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
  setAuthCookie(res, user.id);
  res.json({ id: user.id, email: user.email, name: user.name });
};

export const me = async (req: any, res: Response) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie(process.env.COOKIE_NAME!, { httpOnly: true, sameSite: 'lax', secure: false });
  res.json({ message: 'Logged out' });
};