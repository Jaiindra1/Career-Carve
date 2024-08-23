// components/BookingForm.js

import React, { useState, useEffect } from 'react';
import { getStudents, getMentors, createBooking } from '../api/api';

const BookingForm = () => {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [formData, setFormData] = useState({
    student_id: '',
    mentor_id: '',
    booking_time: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    getStudents()
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error fetching students:', error));

    getMentors()
      .then((response) => setMentors(response.data))
      .catch((error) => console.error('Error fetching mentors:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBooking(formData)
      .then((response) => {
        setMessage(`Booking created with ID: ${response.data.booking_id}`);
        setFormData({
          student_id: '',
          mentor_id: '',
          booking_time: '',
        });
      })
      .catch((error) => {
        setMessage('Error creating booking.');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Book a Session</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student:
          <select name="student_id" value={formData.student_id} onChange={handleChange} required>
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Mentor:
          <select name="mentor_id" value={formData.mentor_id} onChange={handleChange} required>
            <option value="">Select Mentor</option>
            {mentors.map((mentor) => (
              <option key={mentor.id} value={mentor.id}>
                {mentor.name} ({mentor.areas_of_expertise})
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Booking Time:
          <input
            type="datetime-local"
            name="booking_time"
            value={formData.booking_time}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Create Booking</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingForm;
