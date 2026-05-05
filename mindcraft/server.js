require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mindcraft';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✓ MongoDB connected successfully'))
.catch(err => {
  console.error('✗ MongoDB connection error:', err.message);
  // Continue running even if MongoDB is not connected
});

// Define Event Registration Schema
const eventSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  collegeName: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: String,
    required: true,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year']
  },
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

// Create Event model
const Event = mongoose.model('Event', eventSchema);

// Routes

// GET - Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST - Register for event
app.post('/register', async (req, res) => {
  try {
    const { fullName, email, phoneNumber, collegeName, department, year, eventName } = req.body;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !collegeName || !department || !year || !eventName) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Create a new event registration
    const newRegistration = new Event({
      fullName,
      email,
      phoneNumber,
      collegeName,
      department,
      year,
      eventName
    });

    // Save to database
    await newRegistration.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful! Thank you for registering.',
      data: newRegistration
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during registration. Please try again.',
      error: error.message
    });
  }
});

// GET - Fetch all registrations (for admin purposes)
app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await Event.find().sort({ registeredAt: -1 });
    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Mindcraft Event Registration Server running on port ${PORT}`);
  console.log(`📍 Visit: http://localhost:${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}/register\n`);
});

module.exports = app;
