// routes/mentors.js

const express = require('express');
const router = express.Router();
const db = require('../db');
const { body, query, validationResult } = require('express-validator');

// Create a new mentor
router.post(
  '/',
  [
    body('name').isString().withMessage('Name must be a string'),
    body('availability').isString().withMessage('Availability must be a string'),
    body('areas_of_expertise').isString().withMessage('Areas of expertise must be a string'),
    body('is_premium').isBoolean().withMessage('Is_premium must be a boolean'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, availability, areas_of_expertise, is_premium } = req.body;

    db.run(
      `INSERT INTO mentors (name, availability, areas_of_expertise, is_premium) VALUES (?, ?, ?, ?)`,
      [name, availability, areas_of_expertise, is_premium ? 1 : 0],
      function (err) {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.status(201).json({ mentor_id: this.lastID });
      }
    );
  }
);

// Get mentors with optional filters
router.get(
  '/',
  [
    query('area_of_expertise').optional().isString(),
    query('availability').optional().isString(),
  ],
  (req, res) => {
    const { area_of_expertise, availability } = req.query;
    let queryStr = `SELECT * FROM mentors`;
    const queryParams = [];

    if (area_of_expertise || availability) {
      queryStr += ' WHERE';
      const conditions = [];
      if (area_of_expertise) {
        conditions.push(' areas_of_expertise LIKE ?');
        queryParams.push(`%${area_of_expertise}%`);
      }
      if (availability) {
        conditions.push(' availability LIKE ?');
        queryParams.push(`%${availability}%`);
      }
      queryStr += conditions.join(' AND');
    }

    db.all(queryStr, queryParams, (err, rows) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.json(rows);
    });
  }
);

module.exports = router;
