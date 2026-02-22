const Booking = require('../models/bookingModel');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email phoneNumber');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    res.status(200).json({ message: `Booking ${status}`, updatedBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};