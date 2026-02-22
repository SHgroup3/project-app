const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/userController');
const {services} = require('../controllers/serviceController');
const {createBooking, getUserBooking, cancelBooking} = require('../controllers/bookingController');
const {getAllBookings, updateBookingStatus} = require('../controllers/adminController')

router.post('/register', register);
router.post('/login', login);
router.get('/service', services);
router.post('/create-booking', createBooking);
router.get('/bookings/:userId', getUserBooking);
router.put('/cancel-booking/:bookingId', cancelBooking);
router.get('/admin/all-bookings', getAllBookings); 
router.put('/admin/update-status/:bookingId', updateBookingStatus); 
module.exports = router;
