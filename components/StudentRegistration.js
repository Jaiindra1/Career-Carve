// components/StudentRegistration.js

import React, { useState } from 'react';
import { createStudent } from '../api/api';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    availability: '',
    area_of_interest: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createStudent(formData)
      .then((response) => {
        setMessage(`Student created with ID: ${response.data.student_id}`);
        setFormData({
          name: '',
          availability: '',
          area_of_interest: '',
        });
      })
      .catch((error) => {
        setMessage('Error creating student.');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Availability:
          <input name="availability" value={formData.availability} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Area of Interest:
          <input name="area_of_interest" value={formData.area_of_interest} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Register Student</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StudentRegistration;
