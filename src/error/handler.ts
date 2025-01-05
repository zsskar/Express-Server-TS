import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) : void => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message,
    }));
     res.status(400).json({ error: 'Validation error', details: formattedErrors });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
       res.status(400).json({ error: 'A user with this email already exists.' });
    }
  }

  if (err instanceof Error) {
     res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal Server Error' });
};