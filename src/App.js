// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import MentorList from './components/MentorList';
import StudentRegistration from './components/StudentRegistration';
import MentorRegistration from './components/MentorRegistration';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/students/register">Student Registration</Link></li>
            <li><Link to="/mentors/register">Mentor Registration</Link></li>
            <li><Link to="/mentors">View Mentors</Link></li>
            <li><Link to="/bookings/new">Book Session</Link></li>
            <li><Link to="/bookings">View Bookings</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students/register" element={<StudentRegistration />} />
          <Route path="/mentors/register" element={<MentorRegistration />} />
          <Route path="/mentors" element={<MentorList />} />
          <Route path="/bookings/new" element={<BookingForm />} />
          <Route path="/bookings" element={<BookingList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
