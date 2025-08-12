import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const oids = (req.params.oid).split(",");
  const user = await userService.getUserById(oids);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};
