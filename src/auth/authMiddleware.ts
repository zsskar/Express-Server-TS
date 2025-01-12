import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../db';

interface AuthRequest extends Request {
  user?: string | object;
}
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;
  console.log(userId);

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401).json({ message: 'Token not found' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const isUserExists = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    console.log('User exists', isUserExists);

    if (!isUserExists) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(401)
        .json({ message: 'Unauthorized access', error: error.message });
    } else {
      // Handle unexpected errors
      res.status(500).json({
        message: 'Internal server error',
        error: 'Unknown error occurred',
      });
    }
  }
};
