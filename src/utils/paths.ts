import { Request } from 'express';
import path from 'path';

export const getFileUrl = (req: Request, filePath: string): string => {
  return `${req.protocol}://${req.get('host')}/${filePath}`;
};

export const getProfilePicPath = (req: Request) => {
  if (!req.file || !req.file.filename) {
    throw new Error('File not found in the request.');
  }
  return path.posix.join('uploads/profile-pictures', req.file.filename);
};
