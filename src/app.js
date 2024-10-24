require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const { setAuthVariable } = require('./middleware/authMiddleware');
const timetableRoutes = require('./routes/timetable');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // Use true if using HTTPS
}));
app.use(setAuthVariable);  // Set auth variable for views

// Serve static files (HTML, CSS)
app.use(express.static(path.join(__dirname, '..', 'static')));
app.set('view engine', 'ejs');  // If you're using EJS
app.set('views', path.join(__dirname, '..', 'views'));

// Import routes
const authRoutes = require('./routes/index');

// Use the routes
app.use(authRoutes);
app.use('/timetable', timetableRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} as http://localhost:${PORT}`));
