const bcrypt = require('bcryptjs');
const User = require('../models/studentsModel');

// Sign-up handler
exports.signup = async (req, res) => {
    const { firstname, lastname, mobileno, mailid, username, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).send('Username already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new User({
            firstname,
            lastname,
            mobileno,
            mailid,
            username,
            password: hashedPassword
        });

        await user.save();
        req.session.userId = user._id;  // Save user session
        res.redirect('/dashboard');  // Redirect to the dashboard or main app
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Sign-in handler
exports.signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid username or password');
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid username or password');
        }

        req.session.userId = user._id;  // Save user session
        res.redirect('/dashboard');  // Redirect to the dashboard or main app
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Logout handler
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/signin.html');  // Redirect to the sign-in page
    });
};
