const mongoose = require('mongoose');
const { Readable } = require('stream');
const { getGridFSBucket } = require('../config/db');

// @desc   Upload file to MongoDB GridFS
// @route  POST /api/files/upload
exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select a file to upload.' });
    }

    const gridfsBucket = getGridFSBucket();

    // Generate safe unique filename
    const safeName = req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${safeName}`;

    // Create writable stream to GridFS
    const uploadStream = gridfsBucket.openUploadStream(filename, {
      contentType: req.file.mimetype,
      metadata: {
        originalName: req.file.originalname,
        uploadedAt: new Date()
      }
    });

    // Convert file buffer into readable stream and pipe to GridFS
    const readableStream = Readable.from(req.file.buffer);

    readableStream.pipe(uploadStream)
      .on('error', (err) => next(err))
      .on('finish', () => {
        res.status(201).json({
          success: true,
          message: 'File successfully stored in MongoDB GridFS.',
          file: {
            id: uploadStream.id,
            filename: uploadStream.filename,
            contentType: req.file.mimetype,
            size: req.file.size
          }
        });
      });
  } catch (err) {
    next(err);
  }
};

// @desc   Get list of all uploaded files metadata
// @route  GET /api/files
exports.getAllFiles = async (req, res, next) => {
  try {
    const gridfsBucket = getGridFSBucket();
    const files = await gridfsBucket.find({}).sort({ uploadDate: -1 }).toArray();

    res.status(200).json({
      success: true,
      count: files.length,
      files
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Stream / Download file by ID
// @route  GET /api/files/:id
exports.getFileById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid file ID format.' });
    }

    const gridfsBucket = getGridFSBucket();
    const objectId = new mongoose.Types.ObjectId(id);

    const files = await gridfsBucket.find({ _id: objectId }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ success: false, message: 'File not found.' });
    }

    const file = files[0];

    // Set appropriate headers
    res.set({
      'Content-Type': file.contentType || 'application/octet-stream',
      'Content-Disposition': `inline; filename="${file.filename}"`
    });

    // Stream file directly to the client response
    const downloadStream = gridfsBucket.openDownloadStream(objectId);
    downloadStream.on('error', (err) => next(err));
    downloadStream.pipe(res);
  } catch (err) {
    next(err);
  }
};

// @desc   Delete file and its chunks by ID
// @route  DELETE /api/files/:id
exports.deleteFileById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid file ID format.' });
    }

    const gridfsBucket = getGridFSBucket();
    const objectId = new mongoose.Types.ObjectId(id);

    // Verify existence before deleting
    const files = await gridfsBucket.find({ _id: objectId }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ success: false, message: 'File not found.' });
    }

    await gridfsBucket.delete(objectId);

    res.status(200).json({
      success: true,
      message: 'File and associated chunks deleted successfully.'
    });
  } catch (err) {
    next(err);
  }
};