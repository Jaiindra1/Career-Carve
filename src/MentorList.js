// MentorList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MentorList() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/mentors')
      .then(response => {
        setMentors(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the mentors!', error);
      });
  }, []);

  return (
    <div>
      <h2>Mentors</h2>
      <ul>
        {mentors.map(mentor => (
          <li key={mentor.id}>
            {mentor.name} - Expertise: {mentor.areas_of_expertise} - Availability: {mentor.availability}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MentorList;
