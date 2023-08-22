const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config=require('../admin/build/index.html')
require('./src/database/config');
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'../admin/build')))
app.get("*",path.join(__dirname,'../admin/build/index.html'))
// Import user and admin routes
const userRoutes = require('./src/userRoutes');
const adminRoutes = require('./src/adminRoutes');
const uploadsImage=require('./src/userRoutes/uploadImage')
// Use user and admin routes
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use(uploadsImage)

app.listen(6700, () => {
  console.log('Server is running on port 6700');
});
