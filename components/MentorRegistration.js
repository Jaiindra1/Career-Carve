// components/MentorRegistration.js

import React, { useState } from 'react';
import { createMentor } from '../api/api';

const MentorRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    availability: '',
    areas_of_expertise: '',
    is_premium: false,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMentor(formData)
      .then((response) => {
        setMessage(`Mentor created with ID: ${response.data.mentor_id}`);
        setFormData({
          name: '',
          availability: '',
          areas_of_expertise: '',
          is_premium: false,
        });
      })
      .catch((error) => {
        setMessage('Error creating mentor.');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Mentor Registration</h2>
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
          Areas of Expertise:
          <input name="areas_of_expertise" value={formData.areas_of_expertise} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Premium Mentor:
          <input
            name="is_premium"
            type="checkbox"
            checked={formData.is_premium}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Register Mentor</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MentorRegistration;
