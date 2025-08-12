import pool from '../db/mysql';
import { User } from '../models/user.model';

export const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await pool.query('SELECT * FROM user_profile');
  return rows as User[];
};

export const getUserById = async (oid: string[]): Promise<User[] | null> => {
  const [rows] = await pool.query('SELECT * FROM user_profile WHERE oid IN (?)', [oid]);
  const result = rows as User[];
  return result || null;
};
//
