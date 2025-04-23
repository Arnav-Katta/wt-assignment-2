
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollNumber: String,
  department: String,
  dob: {
    type: String,
    match: [/^\d{2}-\d{2}-\d{4}$/, 'Date of birth must be in dd-mm-yyyy format']
  }
});

module.exports = mongoose.model('Student', studentSchema);
