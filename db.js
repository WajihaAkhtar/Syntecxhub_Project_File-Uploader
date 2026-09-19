const mongoose = require('mongoose');

let gridfsBucket;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/file_uploader_db');
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Initialize GridFS bucket inside MongoDB
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.connection.db, {
      bucketName: 'uploads' // Creates uploads.files and uploads.chunks
    });
  } catch (err) {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1);
  }
};

const getGridFSBucket = () => {
  if (!gridfsBucket) {
    throw new Error('GridFSBucket is not initialized. Ensure connectDB has completed.');
  }
  return gridfsBucket;
};

module.exports = { connectDB, getGridFSBucket };