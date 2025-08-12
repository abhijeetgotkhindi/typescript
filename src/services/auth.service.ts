import pool from '../db/mysql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/user.model';

dotenv.config();

export const login = async (email: string, password: string) => {
  const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  const user: User = rows[0];

  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  return { token, user: { id: user.id, name: user.name, email: user.email } };
};
