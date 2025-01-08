import { RequestHandler } from 'express';
import { userSchema } from '../schemas';
import prisma from '../db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const requestBody = userSchema.parse(req.body);
    const salt = await bcrypt.genSalt(10);
    requestBody.password = await bcrypt.hash(requestBody.password, salt);
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
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { purchases: true, cart: true },
    });
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
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { purchases: true, cart: true },
    });
    if (!user) {
      res.status(404).json({ error: `User not found with ID ${id}` });
      return;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers: RequestHandler = async (_, res, next) => {
  try {
    const allUser = await prisma.user.findMany({
      include: { purchases: true, cart: true },
    });
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

export const deleteAllUsers: RequestHandler = async (_, res, next) => {
  try {
    prisma.user.deleteMany({});
    res.json({ message: 'All users deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '30m',
    });

    res.json({ message: 'Signin successfull', user: user, token: token });
  } catch (error) {
    next(error);
  }
};
