const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdminKey: {
    type: String,
    required: true,
  },
  token:{
    type:String,
  },
  refreshToken:{
    type:String,
  }
});

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;
