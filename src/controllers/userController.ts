import { RequestHandler } from 'express';
import { userSchema } from '../schemas';
import  prisma  from '../db';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const requestBody = userSchema.parse(req.body);
    const newUser = await prisma.user.create({ data: requestBody });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const requestBody = userSchema.parse(req.body);
    const existingUser = await prisma.user.findUnique({ where: { id: Number(id)}, include: { purchases : true, cart : true} });
    if (!existingUser) {
       res.status(404).json({ error: `User not found with ID ${id}` });
       return;
    }
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: requestBody,
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: Number(id) }, include: { purchases : true, cart : true} });
    if (!user) {
       res.status(404).json({ error: `User not found with ID ${id}` });
       return;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
    try {
      const allUser = await prisma.user.findMany({include: { purchases : true, cart : true}});
      if (!allUser) {
        res.status(404).json({ error: 'No user found' });
      }
      res.json(allUser);
    } catch (error) {
      next(error);
  }
};

export const deleteUserById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } }); 
      if (!user) {
        res.status(404).json({ error: `User not found with ID ${id}` });
        return;
      }
      await prisma.user.delete({ where: { id: Number(id) } });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
  }
};

export const deleteAllUsers : RequestHandler = async (req, res, next) => {
      try {
        prisma.user.deleteMany({});
        res.json({ message: 'All users deleted successfully' });
      } catch (error) {
        next(error);
    }
};