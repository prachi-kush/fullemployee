const express = require('express');
const multer = require('multer');
const path = require('path');
const Employee = require('../database/schema');
const fs = require('fs').promises;

const app = express();

const uploadsPath = path.join(__dirname, 'uploads');
console.log('uploadsPath: ', uploadsPath);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/uploadsImage/:email', upload.single('image'), async (req, res) => {
  if (!req.file) {
    console.log('No file uploaded');
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const email = req.params.email;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // employee.name = req.body.name;
    employee.file = {
      filename: req.file.filename,
      originalname: req.file.originalname,
      destination: req.file.destination,
    };

    // Edit this delete file images
    // if (employee.imageUrl) {
    //   const imagePath = path.join(uploadsPath, employee.imageUrl.split('/uploads/')[1]);
    //   await fs.unlink(imagePath);
    // }

    const imageUrl = `http://localhost:6700/uploads/${req.file.filename}`;
    console.log('imageUrl: ', imageUrl);
    employee.imageUrl = imageUrl;
    await employee.save();

    // Return the new imageUrl in the response
    res.status(200).json({ imageUrl });
    console.log('Image Uploaded Successfully');
  } catch (error) {
    console.error('Error saving image in employee:', error);
    res.status(500).json({ error: 'Error saving employee' });
  }
});

app.use('/uploads', express.static(uploadsPath));

module.exports = app;
