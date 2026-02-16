import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  roomType: { type: String, enum: ['Single Room', 'Double Room', '1BHK', '2BHK'], required: true },
  location: {
    city: { type: String, required: true },
    address: { type: String, required: true },
    coordinates: { lat: Number, lng: Number }
  },
  amenities: [String],
  images: [String],
  capacity: { type: Number, default: 1 },
  availability: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Room', roomSchema);
