const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timetableSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workingDays: [String], // e.g., ['Monday', 'Tuesday']
    subjects: [
        {
            name: String,
            type: {
                type: String,
                enum: ['Lab', 'Lecture', 'Both'],
                required: true
            }
        }
    ],
    timetable: [
        {
            day: {
                type: String,
                required: true // Ensure the day is required
            },
            subject: {
                type: String,
                required: true // Ensure the subject is required
            },
            type: {
                type: String,
                enum: ['Lab', 'Lecture'], // Changed to avoid both being selected together
                required: true
            },
            start_time: String, // e.g., "09:00 AM"
            end_time: String // e.g., "10:00 AM"
        }
    ]
});

module.exports = mongoose.model('Timetable', timetableSchema);
