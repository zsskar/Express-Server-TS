import { RequestHandler } from 'express';
import { purchaseSchema } from '../schemas';
import prisma from '../db';

export const createPurchase: RequestHandler = async (req, res) => {
  try {
    const requestBody = purchaseSchema.parse(req.body);
    const newProduct = await prisma.purchase.create({ data: requestBody });
    res.status(201).json(newProduct);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
};

export const getAllPurchasesByUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit, offset } = req.query;
    const limitValue = limit ? Number(limit) : undefined;
    const offsetValue = offset ? Number(offset) : undefined;

    const purchases = await prisma.purchase.findMany({
      where: { userId: Number(userId) },
      take: limitValue,
      skip: offsetValue,
    });
    if (!purchases || purchases.length === 0) {
      res.status(404).json({ error: 'No purchases found' });
    }
    res.json({
      success: true,
      data: purchases,
      paginationInfo: {
        limit: limitValue || null,
        offset: offsetValue || null,
      },
    });
  } catch (error) {
    if (!res.headersSent) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Unknown error' });
      }
    }
  }
};

export const getPurchaseByIdAndUser: RequestHandler = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const userPurchase = await prisma.purchase.findUnique({
      where: { id: Number(id), userId: Number(userId) },
    });
    if (!userPurchase) {
      res.status(404).json({ error: 'No purchases found' });
    }
    res.json(userPurchase);
  } catch (error) {
    if (!res.headersSent) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Unknown error' });
      }
    }
  }
};
