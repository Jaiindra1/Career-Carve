// routes/bookings.js

const express = require('express');
const router = express.Router();
const db = require('../db');
const { body, validationResult } = require('express-validator');

// Create a booking
router.post(
  '/',
  [
    body('student_id').isInt().withMessage('Student ID must be an integer'),
    body('mentor_id').isInt().withMessage('Mentor ID must be an integer'),
    body('booking_time').isISO8601().withMessage('Booking time must be a valid date'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { student_id, mentor_id, booking_time } = req.body;

    db.run(
      `INSERT INTO bookings (student_id, mentor_id, booking_time) VALUES (?, ?, ?)`,
      [student_id, mentor_id, booking_time],
      function (err) {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.status(201).json({ booking_id: this.lastID });
      }
    );
  }
);

// Get all bookings
router.get('/', (req, res) => {
  db.all(
    `SELECT bookings.id, students.name AS student_name, mentors.name AS mentor_name, booking_time
     FROM bookings
     JOIN students ON bookings.student_id = students.id
     JOIN mentors ON bookings.mentor_id = mentors.id`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.json(rows);
    }
  );
});

module.exports = router;
