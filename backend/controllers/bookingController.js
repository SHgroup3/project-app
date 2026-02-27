const Booking = require('../models/bookingModel');

exports.createBooking = async (req, res) => {
  const { user, service, schedule } = req.body;
  const duplicateServiceByMe = await Booking.findOne({ user, service, schedule, status: { $ne: 'cancelled' } });
  if (duplicateServiceByMe) {
    return res.status(400).json({ message: "you already booked this service!" });
  }

  const serviceTakenByOther = await Booking.findOne({ service, schedule, status: { $ne: 'cancelled' } });
  if (serviceTakenByOther) {
    return res.status(400).json({ message: "this slot is not avaliable for this time slot!" });
  }

  const totalBookings = await Booking.countDocuments({ schedule, status: { $ne: 'cancelled' } });
  if (totalBookings >= 4) {
    return res.status(400).json({ message: "slot are full!" });
  }

  const newBooking = new Booking(req.body);
  await newBooking.save();
  res.status(201).json(newBooking);
};
exports.getUserBooking = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const cutOffTime = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const bookings = await Booking.find({ 
      user: userId,
      $or: [
        { status: { $ne: 'cancelled' } },
        { 
          status: 'cancelled', 
          updatedAt: { $gt: cutOffTime }
        }
      ]
    }).sort({ bookingDate: -1 });

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

exports.checkAvailability = async (req, res) => {
  try {
    const { date } = req.query;
    const bookings = await Booking.find({ 
      schedule: { $regex: date },
      status: { $ne: 'cancelled' } 
    });
    const slotDetails = {};

    bookings.forEach(b => {
      const time = b.schedule.split(' at ')[1];
      if (time) {
        if (!slotDetails[time]) {
          slotDetails[time] = [];
        }
        slotDetails[time].push(b.service);
      }
    });

    res.status(200).json(slotDetails); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};