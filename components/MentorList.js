// components/MentorList.js

import React, { useState, useEffect } from 'react';
import { getMentors } from '../api/api';

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [filters, setFilters] = useState({
    area_of_expertise: '',
    availability: '',
  });

  const fetchMentors = () => {
    getMentors(filters)
      .then((response) => {
        setMentors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching mentors:', error);
      });
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchMentors();
  };

  return (
    <div>
      <h2>Mentors</h2>
      <form onSubmit={handleFilter}>
        <label>
          Area of Expertise:
          <input name="area_of_expertise" value={filters.area_of_expertise} onChange={handleChange} />
        </label>
        <br />
        <label>
          Availability:
          <input name="availability" value={filters.availability} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Filter</button>
      </form>
      <ul>
        {mentors.map((mentor) => (
          <li key={mentor.id}>
            <strong>{mentor.name}</strong> <br />
            Expertise: {mentor.areas_of_expertise} <br />
            Availability: {mentor.availability} <br />
            {mentor.is_premium ? 'Premium Mentor' : 'Standard Mentor'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorList;
