const Booking = require('../models/bookingModel');

exports.createBooking = async (req, res) => {
  try {
    const { user, service, bookingDate, status } = req.body;

    if (!user || !service || !bookingDate || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const createBooking = new Booking({
      user,
      service,
      bookingDate,
      status
    });

    await createBooking.save();

    res.status(201).json({
      message: "Booking done successfully",
      createBooking
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
