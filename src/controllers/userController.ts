import { RequestHandler } from 'express';
import { createUserSchema } from '../schemas';
import  prisma  from '../db';
import { Prisma } from '@prisma/client';

export const createUser: RequestHandler = async (req, res) => {
  try {
    const requestBody = createUserSchema.parse(req.body);
    const newUser = await prisma.user.create({ data: requestBody });
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(400).json({ error: 'A user with this email already exists.' });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const requestBody = createUserSchema.parse(req.body);
    const existingUser = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!existingUser) {
       res.status(404).json({ error: 'User not found' });
       return;
    }
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: requestBody,
    });
    res.json(updatedUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(400).json({ error: 'A user with this email already exists.' });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
};

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
       res.status(404).json({ error: 'User not found' });
       return;
    }
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Unknown error' });
    }
  }
};

export const getAllUsers: RequestHandler = async (req, res) => {
    try {
      const allUser = await prisma.user.findMany({});
      if (!allUser) {
        res.status(404).json({ error: 'User not found' });
      }
      res.json(allUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Unknown error' });
      }
    }
};