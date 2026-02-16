import express from 'express';
import Booking from '../models/Booking.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { room, checkIn, checkOut, totalPrice } = req.body;
    const booking = new Booking({
      user: req.user.id,
      room,
      checkIn,
      checkOut,
      totalPrice
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('room');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user room');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
