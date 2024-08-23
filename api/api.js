// api/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const getMentors = (filters) => {
  return axios.get(`${API_BASE_URL}/mentors`, { params: filters });
};

export const createMentor = (mentorData) => {
  return axios.post(`${API_BASE_URL}/mentors`, mentorData);
};

export const getStudents = () => {
  return axios.get(`${API_BASE_URL}/students`);
};

export const createStudent = (studentData) => {
  return axios.post(`${API_BASE_URL}/students`, studentData);
};

export const createBooking = (bookingData) => {
  return axios.post(`${API_BASE_URL}/bookings`, bookingData);
};

export const getBookings = () => {
  return axios.get(`${API_BASE_URL}/bookings`);
};
