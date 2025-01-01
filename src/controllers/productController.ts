import { RequestHandler } from 'express';

export const getAllProducts : RequestHandler = (req, res) => {
  res.send('Get all products');
};

export const getProductById : RequestHandler = (req, res) => {
  const { id } = req.params;
  res.send(`Get product with ID: ${id}`);
};