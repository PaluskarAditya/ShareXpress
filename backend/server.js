const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;
let gfsBucket;

conn.once('open', () => {
  gfsBucket = new GridFSBucket(conn.db, {
    bucketName: 'uploads',
  });
  console.log('MongoDB GridFS connected');
});

// Multer storage (store file temporarily on server before streaming to MongoDB)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @GET - Test Route
app.get('/foo', (req, res) => res.send('bar'));

// @POST - Upload Route
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');

  const filename = req.file.originalname;

  const uploadStream = gfsBucket.openUploadStream(filename, {
    contentType: req.file.mimetype,
    metadata: {
      uuid: req.header('id'),
    }
  });

  uploadStream.end(req.file.buffer);

  uploadStream.on('finish', () => {
    res.json({
      success: true,
      fileId: uploadStream.id,
      filename: uploadStream.filename,
    });
  });

  uploadStream.on('error', (err) => {
    console.error('Upload error:', err);
    res.status(500).json({ success: false, error: err.message });
  });
});

// @GET - File Metadata Route
app.get('/api/download/:id', async (req, res) => {
  const { id } = req.headers;

  try {
    const file = await conn.db.collection('uploads.files').findOne({ 'metadata.uuid': id });
    console.log(file);

    if (!file) return res.status(404).json({ success: false, message: 'File not found' });

    res.json({ success: true, file });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

const PORT = process.env.NODE_PORT || 5000;
app.listen(PORT, () => console.log('Server running on', PORT));
