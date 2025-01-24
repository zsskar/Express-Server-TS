import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const multerUpload = (
  filePath: String,
  allowedTypes: RegExp,
  errorMsg: String,
) => {
  const uploadDir = path.join(__dirname, `../uploads/${filePath}`);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(
        null,
        `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`,
      );
    },
  });

  // Configure Multer
  const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
    fileFilter: (req, file, cb) => {
      // Validate file type
      const isValid = allowedTypes.test(
        path.extname(file.originalname).toLowerCase(),
      );
      if (isValid) cb(null, true);
      else cb(new Error(`Invalid file type.${errorMsg}`));
    },
  });

  return upload;
};
