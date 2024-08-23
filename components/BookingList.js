// components/BookingList.js

import React, { useState, useEffect } from 'react';
import { getBookings } from '../api/api';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings()
      .then((response) => setBookings(response.data))
      .catch((error) => console.error('Error fetching bookings:', error));
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <strong>Student:</strong> {booking.student_name} <br />
            <strong>Mentor:</strong> {booking.mentor_name} <br />
            <strong>Time:</strong> {new Date(booking.booking_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
