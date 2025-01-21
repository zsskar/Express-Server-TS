import multer from 'multer';
import path from 'path';

export const multerUpload = (
  filePath: String,
  allowedTypes: RegExp,
  errorMsg: String,
) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, `uploads/${filePath}`);
      cb(null, uploadDir); // Upload directory
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // Unique filename
    },
  });

  // Configure Multer
  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
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
