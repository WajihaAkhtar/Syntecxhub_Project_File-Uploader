# 📁 File Uploader

A full-stack **File Management Application** built with **Node.js, Express.js, and MongoDB GridFS**.

The application provides a secure and efficient way to **upload, store, retrieve, stream, preview, and delete files**. Files are stored directly in MongoDB using **GridFS**, eliminating the need for local filesystem storage.

---

## ✨ Features

* 📤 **File Uploads** — Upload files using multipart/form-data with Multer.
* 🗄️ **MongoDB GridFS Storage** — Store binary files directly in MongoDB as chunks.
* 🔒 **File Validation** — Restrict uploads to supported file types.
* 📦 **15 MB File Size Limit** — Prevent excessively large uploads and memory exhaustion.
* ▶️ **Streaming Retrieval** — Stream stored files directly to the browser using MongoDB download streams.
* 🗑️ **Complete File Deletion** — Delete both file metadata and associated binary chunks.
* 🖥️ **Modern Web Dashboard** — Interactive interface with drag-and-drop file uploading, previewing, and deletion.
* ⚠️ **Centralized Error Handling** — Handles upload errors, validation failures, and database exceptions gracefully.

---

## 🛠️ Technologies Used

| Technology       | Purpose                                    |
| ---------------- | ------------------------------------------ |
| **Node.js**      | JavaScript runtime                         |
| **Express.js**   | REST API and server                        |
| **MongoDB**      | Database and file storage                  |
| **Mongoose**     | MongoDB connection and database operations |
| **GridFSBucket** | Storage and streaming of large files       |
| **Multer**       | Multipart/form-data processing             |
| **JavaScript**   | Application logic                          |
| **HTML5**        | Frontend structure                         |
| **CSS3**         | Frontend styling                           |

---

## ⚙️ Core Technologies

### Express.js

Used to build the RESTful API endpoints and serve the frontend application.

### Multer

Used as middleware to process `multipart/form-data` requests and extract uploaded file buffers using memory storage.

### MongoDB & Mongoose

MongoDB is used as the primary database, while Mongoose handles database connectivity and operations.

### MongoDB GridFS

`GridFSBucket` stores uploaded files as smaller binary chunks in MongoDB. This allows files to be stored and retrieved efficiently without relying on the local filesystem.

### Node.js Streams

Node.js streams are used to transfer file buffers directly into MongoDB GridFS upload streams and stream stored files back to clients.

---

## 📂 Supported File Types

The application validates uploaded files and supports:

* 🖼️ Images
* 📄 PDF documents
* 📝 Microsoft Word documents
* 📃 Text files

Maximum file size:

**15 MB per file**

---

## 🏗️ Project Structure

```text
file-uploader/
│
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
```

### Directory Overview

**`config/`**
Contains database configuration and MongoDB connection logic.

**`controllers/`**
Contains the application logic for uploading, retrieving, streaming, and deleting files.

**`middleware/`**
Contains Multer configuration and file validation rules.

**`public/`**
Contains the frontend interface.

**`routes/`**
Defines the application's file-related API endpoints.

**`server.js`**
Initializes the Express server, middleware, routes, and database connection.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/file-uploader.git
cd file-uploader
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB connection string.

### 4. Start the Application

For development:

```bash
npm run dev
```

Or start the server directly:

```bash
node server.js
```

The application will be available at:

```text
http://localhost:5000
```

---

## 🔄 How It Works

```text
User
  │
  ▼
Web Dashboard
  │
  │ Multipart/Form-Data
  ▼
Multer
  │
  │ File Buffer
  ▼
Express API
  │
  ▼
GridFSBucket
  │
  ├── uploads.files
  └── uploads.chunks
```

### Upload Flow

1. User selects or drops a file into the dashboard.
2. The frontend sends the file using `multipart/form-data`.
3. Multer processes the uploaded file.
4. File type and size are validated.
5. The file buffer is converted into a readable stream.
6. `GridFSBucket` stores the file in MongoDB.
7. File metadata is stored alongside the binary chunks.

### Retrieval Flow

1. The client requests a stored file.
2. The server locates the file in GridFS.
3. MongoDB creates a download stream.
4. The file is streamed directly to the client.
5. The browser can display or download the file.

### Deletion Flow

1. The client requests file deletion.
2. The server identifies the GridFS file.
3. File metadata is removed.
4. All associated binary chunks are removed.

---

## 🔌 API Operations

The application provides endpoints for managing stored files, including:

| Operation    | Description                            |
| ------------ | -------------------------------------- |
| **Upload**   | Upload and store a file in GridFS      |
| **Retrieve** | Retrieve file information              |
| **Stream**   | Stream a stored file to the browser    |
| **Delete**   | Remove file metadata and binary chunks |

---

## 🛡️ Error Handling

The application includes centralized error handling for:

* Invalid file types
* Files exceeding the 15 MB limit
* Multer upload errors
* Missing files
* MongoDB/GridFS errors
* Invalid requests
* Unexpected server errors

This ensures that errors are returned in a controlled and user-friendly manner.

---

## 📌 Key Highlights

* RESTful backend architecture
* MongoDB-based file storage
* GridFS chunk-based storage
* Memory-based Multer processing
* File type and size validation
* Stream-based file handling
* Drag-and-drop frontend
* File preview functionality
* Complete file deletion
* Centralized error handling

---

## 📄 License

This project is available for educational and development purposes.
