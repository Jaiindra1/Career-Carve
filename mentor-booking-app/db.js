// db.js

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  // Create tables
  db.run(`CREATE TABLE mentors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    availability TEXT NOT NULL,
    areas_of_expertise TEXT NOT NULL,
    is_premium INTEGER NOT NULL
  )`);

  db.run(`CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    availability TEXT NOT NULL,
    area_of_interest TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    mentor_id INTEGER,
    booking_time TEXT,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (mentor_id) REFERENCES mentors(id)
  )`);

  // Insert sample mentors
  const mentors = [
    ['Alice Johnson', 'Monday, Wednesday', 'Mathematics, Physics', 1],
    ['Bob Smith', 'Tuesday, Thursday', 'Chemistry, Biology', 0],
    ['Carol Williams', 'Monday, Friday', 'Computer Science, Mathematics', 1],
  ];

  const mentorStmt = db.prepare(`INSERT INTO mentors (name, availability, areas_of_expertise, is_premium) VALUES (?, ?, ?, ?)`);
  mentors.forEach(mentor => mentorStmt.run(mentor));
  mentorStmt.finalize();

  // Insert sample students
  const students = [
    ['Dave Brown', 'Monday', 'Mathematics'],
    ['Eva Green', 'Tuesday', 'Biology'],
  ];

  const studentStmt = db.prepare(`INSERT INTO students (name, availability, area_of_interest) VALUES (?, ?, ?)`);
  students.forEach(student => studentStmt.run(student));
  studentStmt.finalize();
});

module.exports = db;
