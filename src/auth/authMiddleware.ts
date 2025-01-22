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
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401).json({ message: 'Token not found' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = user;

    // If `userId` exists in the route params, validate it
    const { userId } = req.params;
    if (userId) {
      const isUserExists = await prisma.user.findUnique({
        where: { id: Number(userId) },
      });

      if (!isUserExists) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(401)
        .json({ message: 'Unauthorized access', error: error.message });
    } else {
      res.status(500).json({
        message: 'Internal server error',
        error: 'Unknown error occurred',
      });
    }
  }
};
