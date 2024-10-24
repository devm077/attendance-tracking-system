// routes/timetable.js
const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');

// Show the form for adding working days and subjects
router.get('/add', timetableController.showAddSubjects);

// Handle form submission for adding working days and subjects
router.post('/add', timetableController.addSubjects);

// Show the form for filling the timetable
router.get('/fill', timetableController.showFillTimetable);

// Create or update the timetable
router.post('/create', timetableController.createTimetable);

module.exports = router;
