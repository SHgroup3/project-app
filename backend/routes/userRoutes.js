const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/userController');
const {services} = require('../controllers/serviceController');
const {createBooking, getUserBooking, cancelBooking} = require('../controllers/bookingController');

router.post('/register', register);
router.post('/login', login);
router.get('/service', services);
router.post('/create-booking', createBooking);
router.get('/bookings/:userId', getUserBooking);
router.put('/cancel-booking/:bookingId', cancelBooking);
module.exports = router;
