const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/userController');
const {services} = require('../controllers/serviceController');
const {createBooking} = require('../controllers/bookingController');

router.post('/register', register);
router.post('/login', login);
router.get('/service', services);
router.post('/booking', createBooking);

module.exports = router;
