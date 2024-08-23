// routes/students.js

const express = require('express');
const router = express.Router();
const db = require('../db');
const { body, validationResult } = require('express-validator');

// Create a new student
router.post(
  '/',
  [
    body('name').isString().withMessage('Name must be a string'),
    body('availability').isString().withMessage('Availability must be a string'),
    body('area_of_interest').isString().withMessage('Area of interest must be a string'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, availability, area_of_interest } = req.body;

    db.run(
      `INSERT INTO students (name, availability, area_of_interest) VALUES (?, ?, ?)`,
      [name, availability, area_of_interest],
      function (err) {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.status(201).json({ student_id: this.lastID });
      }
    );
  }
);

// Get all students
router.get('/', (req, res) => {
  db.all(`SELECT * FROM students`, [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

module.exports = router;
