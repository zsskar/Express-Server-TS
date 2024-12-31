import { Request, Response } from 'express';

export const getAllUsers = (req: Request, res: Response) => {
  res.send('Get all users');
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`Get user with ID: ${id}`);
};