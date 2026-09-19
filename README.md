**File Uploader**
A full-stack File Management application built using Node.js, Express, and MongoDB. This project allows users to securely upload, retrieve, stream, and delete files using MongoDB GridFS and Multer.

**Features**
• Multipart Form-Data Handling: Processes file uploads seamlessly using Multer.
• MongoDB GridFS Storage: Stores binary files as chunks directly inside the database instead of the local filesystem.
• File Validation: Restricts allowed file types to images, PDFs, Word documents, and text files.
• File Size Limits: Enforces a strict 15 MB file size limit to prevent memory exhaustion.
• Streaming Retrieval: Streams files directly to the client browser via MongoDB download streams.
• Binary & Metadata Deletion: Removes both file metadata and all associated binary chunks upon deletion.
• Modern Web Dashboard: Features an interactive drag-and-drop user interface for uploading, previewing, and deleting files.
• Centralized Error Handling: Captures Multer upload errors, validation failures, and database exceptions gracefully.

⚙️**Core Technologies & Modules Used**
➡️ Express.js
Used to construct the RESTful API endpoints and serve static frontend assets.
➡️ Multer
Used as middleware with memory storage to parse incoming multipart/form-data and extract file buffers.
➡️ MongoDB & Mongoose
Used for database connectivity and handling database operations.
➡️ GridFSBucket
Used to split incoming file streams into 255 KB chunks across uploads.files and uploads.chunks.
➡️ Stream (Node.js Native)
Used via Readable.from() and .pipe() to stream binary buffers directly into MongoDB upload streams.

👩‍💻**Technologies Used**
1) Node.js
2) Express.js
3) MongoDB
4) Mongoose
5) Multer
6) JavaScript
7) HTML5
8) CSS3

Project Structure
Plaintext
file-uploader/
├── config/
│   └── db.js
│
├── controllers/
│   └── fileController.js
│
├── middleware/
│   └── upload.js
│
├── public/
│   └── index.html
│
├── routes/
│   └── fileRoutes.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
