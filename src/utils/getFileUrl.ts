import { Request } from 'express';

export const getFileUrl = (req: Request, filePath: string): string => {
  return `${req.protocol}://${req.get('host')}/${filePath}`;
};
