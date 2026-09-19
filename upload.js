const multer = require('multer');

// Store in memory buffer so we can stream into GridFS
const storage = multer.memoryStorage();

// File type validation: allows images, pdfs, text, and docs
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Unsupported file type. Allowed: JPG, PNG, WEBP, PDF, TXT, DOC/DOCX.'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024 // 15 MB max file size
  },
  fileFilter
});

module.exports = upload;