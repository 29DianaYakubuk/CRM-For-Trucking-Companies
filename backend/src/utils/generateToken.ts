import jwt from 'jsonwebtoken';
import { Response } from 'express';

export const setAuthCookie = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  res.cookie(process.env.COOKIE_NAME!, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // в продакшене true + HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};