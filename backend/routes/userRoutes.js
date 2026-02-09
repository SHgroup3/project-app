const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/userController');
const {services} = require('../controllers/serviceController');
const {createBooking, getBooking} = require('../controllers/bookingController');

router.post('/register', register);
router.post('/login', login);
router.get('/service', services);
router.post('/booking', createBooking);
router.get('/bookings', getBooking)

module.exports = router;
