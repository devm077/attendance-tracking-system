// models/subjectModel.js
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to the User model
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ['Lecture', 'Lab', 'Both'],
        required: true,
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

// Create a Subject model based on the schema
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
