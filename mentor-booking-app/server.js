// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const studentsRouter = require('./routes/students');
const mentorsRouter = require('./routes/mentors');
const bookingsRouter = require('./routes/bookings');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/students', studentsRouter);
app.use('/mentors', mentorsRouter);
app.use('/bookings', bookingsRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
