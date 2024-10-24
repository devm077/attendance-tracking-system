const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');
const timetableController = require('../controllers/timetableController');

const path = require('path');

// Default route for the root ('/')
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'static', 'signin.html')); // Send the sign-in page
});

// Sign-up route
router.post('/signup', authController.signup);

// Sign-in route
router.post('/signin', authController.signin);

// Logout route
router.get('/logout', authController.logout);

// Route to show the form for adding working days and subjects
router.get('/timetable/add', requireAuth, timetableController.showAddSubjects);

// Handle the submission of working days and subjects
router.post('/timetable/createDaysAndSubjects', requireAuth, timetableController.addSubjects);

// Route to show the form for filling the timetable
router.get('/timetable/fill', requireAuth, timetableController.showFillTimetable);

// Create timetable
router.post('/timetable/create', requireAuth, timetableController.createTimetable);

// Show homepage with timetable or add button
router.get('/dashboard', requireAuth, timetableController.showTimetable);

module.exports = router;
