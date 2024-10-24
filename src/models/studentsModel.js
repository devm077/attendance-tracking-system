const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    mobileno: { type: String, required: true },
    mailid: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
