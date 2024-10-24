const Timetable = require('../models/timetableModel');

// Show the form for adding working days and subjects
exports.showAddSubjects = (req, res) => {
    res.render('addSubjects', { subjects: req.session.subjects || [] });
};

// Handle form submission for adding working days and subjects
exports.addSubjects = async (req, res) => {
    const { workingDays, subjects } = req.body;
    req.session.workingDays = workingDays;

    // Store subjects in session
    if (subjects && Array.isArray(subjects)) {
        req.session.subjects = subjects.map(subject => ({
            name: subject.name,
            type: subject.type
        }));
    }

    res.redirect('/timetable/fill');
};

// Show the form for filling the timetable
exports.showFillTimetable = (req, res) => {
    const workingDays = req.session.workingDays || [];
    const subjects = req.session.subjects || [];
    res.render('fillTimetable', { workingDays, subjects });
};

// Create or update the timetable
exports.createTimetable = async (req, res) => {
    const userId = req.session.userId;
    const timetableEntries = req.body.timetable || []; // Ensure this is from your form submission

    try {
        const newTimetable = new Timetable({
            userId,
            workingDays: req.session.workingDays,
            subjects: req.session.subjects,
            timetable: timetableEntries
        });

        await newTimetable.save();
        res.send("Timetable added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Show timetable for the user
exports.showTimetable = async (req, res) => {
    const userId = req.session.userId;

    try {
        const timetable = await Timetable.findOne({ userId });

        if (!timetable) {
            return res.render('dashboard', { timetable: [], message: 'No timetable found. Please create one.' });
        }

        res.render('dashboard', { timetable: timetable.timetable || [], workingDays: timetable.workingDays, subjects: timetable.subjects });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
