import { RequestHandler } from 'express';
import { productSchema } from '../schemas';
import prisma from '../db';

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const requestBody = productSchema.parse(req.body);
    const newProduct = await prisma.product.create({ data: requestBody });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!existingProduct) {
      res.status(404).json({ error: `Product not found with ID ${id}` });
      return;
    }
    const updatedProduct = prisma.product.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({});
    if (!products) {
      res.status(404).json({ error: 'No products found' });
      return;
    }
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) {
      res.status(404).json({ error: `Product not found with ID ${id}` });
      return;
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProductById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!existingProduct) {
      res.status(404).json({ error: `Product not found with ID ${id}` });
      return;
    }
    await prisma.product.delete({ where: { id: Number(id) } });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteAllProducts: RequestHandler = async (req, res, next) => {
  try {
    await prisma.product.deleteMany({});
    res.json({ message: 'All products deleted successfully' });
  } catch (error) {
    next(error);
  }
};
