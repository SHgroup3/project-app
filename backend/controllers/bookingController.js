const Booking = require('../models/bookingModel');

exports.createBooking = async (req, res) => {
  try {
    const { user, service, schedule } = req.body;
    if (!user || !service || !schedule) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = new Booking({
      user,
      service,
      schedule
    });

    await newBooking.save();
    
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

exports.getUserBooking = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ user: userId }).sort({ bookingDate: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: 'cancelled' },
      { new: true }
    );
    
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking cancelled successfully", booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};