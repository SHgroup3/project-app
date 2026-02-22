import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth';

export const register = async (data) => {
    const response = await axios.post(`${BASE_URL}/register`, data);
    return response.data;
}

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

export const createBooking = async (bookingData) => {
    const response = await axios.post(`${BASE_URL}/create-booking`, bookingData);
    return response.data;
};

export const getUserBooking = async (userId) => {
    const response = await axios.get(`${BASE_URL}/bookings/${userId}`);
    return response.data;
};

export const cancelBooking = async (bookingId) => {
    const response = await axios.put(`${BASE_URL}/cancel-booking/${bookingId}`);
    return response.data;
};



export const getAllBookings = async () => {
  try {

    const response = await axios.get(`${BASE_URL}/admin/all-bookings`); 
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateBookingStatus = async (id, status) => {
  try {

    const response = await axios.put(`${BASE_URL}/admin/update-status/${id}`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};