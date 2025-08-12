import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { LoginDto } from '../models/auth.model';

export const login = async (req: Request, res: Response) => {
  const { email, password }: LoginDto = req.body;

  try {
    const result = await authService.login(email, password);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
