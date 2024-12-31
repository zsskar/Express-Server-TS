import { Request, Response } from 'express';

export const getAllProducts = (req: Request, res: Response) => {
  res.send('Get all products');
};

export const getProductById = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`Get product with ID: ${id}`);
};