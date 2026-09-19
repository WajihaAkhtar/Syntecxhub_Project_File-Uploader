const express = require('express');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const { connectDB } = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB();

// API Endpoints
app.use('/api/files', fileRoutes);

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File exceeds maximum 15MB limit.' });
    }
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error'
    });
  }

  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});