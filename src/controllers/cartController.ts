import { RequestHandler } from 'express';
import { cartSchema } from '../schemas';
import prisma from '../db';

export const addProductToCart: RequestHandler = async (req, res, next) => {
  try {
    const requestBody = cartSchema.parse(req.body);
    const cartProduct = await prisma.cart.create({ data: requestBody });
    res.status(201).json(cartProduct);
  } catch (error) {
    next(error);
  }
};

export const getCartProductByIdAndUser: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { id, userId } = req.params;
    const existingCartProduct = await prisma.cart.findUnique({
      where: { id: Number(id), userId: Number(userId) },
    });
    if (!existingCartProduct) {
      res.status(404).json({
        message: `Cart product not found with ID ${id} for user ${userId}`,
      });
    }
    res.json(existingCartProduct);
  } catch (error) {
    next(error);
  }
};

export const getCartProductsByUser: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { limit, offset } = req.query;
    const limitValue = limit ? Number(limit) : undefined;
    const offsetValue = offset ? Number(offset) : undefined;

    const existingCartProducts = await prisma.cart.findMany({
      where: { userId: Number(userId) },
      take: limitValue,
      skip: offsetValue,
    });
    if (!existingCartProducts || existingCartProducts.length === 0) {
      res
        .status(404)
        .json({ message: `Cart products not found for user ${userId}` });
    }
    res.json({
      success: true,
      data: existingCartProducts,
      paginationInfo: {
        limit: limitValue || null,
        offset: offsetValue || null,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCartProductByIdAndUser: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { id, userId } = req.params;
    const existingCartProduct = await prisma.cart.deleteMany({
      where: { id: Number(id), userId: Number(userId) },
    });
    if (!existingCartProduct) {
      res.status(404).json({
        message: `No cart products found with ID ${id} for User ${userId}`,
      });
    }
    await prisma.cart.deleteMany({
      where: { id: Number(id), userId: Number(userId) },
    });
    res.json({
      message: `Cart products with ID ${id} for User ${userId} deleted`,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAllCartProductsByUser: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { userId } = req.params;
    const existingCartProduct = await prisma.cart.deleteMany({
      where: { userId: Number(userId) },
    });
    if (!existingCartProduct) {
      res
        .status(404)
        .json({ message: `No cart products found for User ${userId}` });
    }
    await prisma.cart.deleteMany({ where: { userId: Number(userId) } });
    res.json({ message: `Cart products for User ${userId} deleted` });
  } catch (error) {
    next(error);
  }
};
