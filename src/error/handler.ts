import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    const formattedErrors = err.errors.reduce((acc, e) => {
      const key = Array.isArray(e.path) ? e.path.join('.') : e.path; // Convert array to string
      acc[key] = e.message; // Assign the message to the corresponding key
      return acc;
    }, {} as Record<string, string>); // Explicitly type the accumulator

    res.status(400).json({ error: formattedErrors });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res
        .status(400)
        .json({ error: { email: 'A user with this email already exists.' } });
    }
  }

  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal Server Error' });
};
