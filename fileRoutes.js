const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  uploadFile,
  getAllFiles,
  getFileById,
  deleteFileById
} = require('../controllers/fileController');

router.post('/upload', upload.single('file'), uploadFile);
router.get('/', getAllFiles);
router.get('/:id', getFileById);
router.delete('/:id', deleteFileById);

module.exports = router;