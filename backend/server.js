import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import authRoutes from './routes/auth.js';
import roomRoutes from './routes/rooms.js';
import bookingRoutes from './routes/bookings.js';
import User from './models/User.js';
import Room from './models/Room.js';

dotenv.config();

const app = express();

// CORS - allow all origins for deployment
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'RoomRental API is running ✅' });
});

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// One-time seed route for live deployment
app.get('/api/seed', async (req, res) => {
  try {
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      return res.json({ message: 'Database already seeded!' });
    }

    const hashedPassword = await bcrypt.hash('password123', 10);
    await User.insertMany([
      { name: 'John Doe', email: 'user@gmail.com', password: hashedPassword, phone: '1234567890', role: 'user' },
      { name: 'Admin User', email: 'admin@gmail.com', password: hashedPassword, phone: '0987654321', role: 'admin' }
    ]);

    await Room.insertMany([
      { title: 'Single Room - Anna Nagar', description: 'Comfortable single room with attached bathroom.', price: 7000, roomType: 'Single Room', location: { city: 'Chennai', address: 'Anna Nagar, Chennai' }, amenities: ['WiFi', 'AC', 'Attached Bathroom', 'Wardrobe'], images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'], capacity: 1, availability: true },
      { title: 'Double Room - RS Puram', description: 'Spacious double room with two beds.', price: 11000, roomType: 'Double Room', location: { city: 'Coimbatore', address: 'RS Puram, Coimbatore' }, amenities: ['WiFi', 'AC', 'Two Beds', 'Balcony'], images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'], capacity: 2, availability: true },
      { title: '1BHK - Anna Nagar Madurai', description: 'Private 1BHK with bedroom, hall, and kitchen.', price: 16000, roomType: '1BHK', location: { city: 'Madurai', address: 'Anna Nagar, Madurai' }, amenities: ['WiFi', 'AC', 'Kitchen', 'Washing Machine', 'TV'], images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'], capacity: 1, availability: true },
      { title: '2BHK - Thillai Nagar', description: 'Spacious 2BHK fully furnished.', price: 25000, roomType: '2BHK', location: { city: 'Trichy', address: 'Thillai Nagar, Trichy' }, amenities: ['WiFi', 'AC', 'Kitchen', 'Washing Machine', 'Parking'], images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'], capacity: 2, availability: true },
      { title: 'Budget Single Room - Salem', description: 'Affordable clean room near bus stand.', price: 5500, roomType: 'Single Room', location: { city: 'Salem', address: 'Fairlands, Salem' }, amenities: ['WiFi', 'Bed', 'Wardrobe', 'Shared Kitchen'], images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800'], capacity: 1, availability: true },
      { title: 'Double Room - Tirunelveli', description: 'Well-furnished double room with attached bathroom.', price: 13000, roomType: 'Double Room', location: { city: 'Tirunelveli', address: 'Palayamkottai, Tirunelveli' }, amenities: ['WiFi', 'AC', 'Attached Bathroom', 'Two Beds'], images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], capacity: 2, availability: true },
      { title: '1BHK - OMR Road Chennai', description: 'Compact 1BHK near IT Park.', price: 14000, roomType: '1BHK', location: { city: 'Chennai', address: 'OMR Road, Chennai' }, amenities: ['WiFi', 'Kitchen', 'Bed', 'Study Table', 'Geyser'], images: ['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800'], capacity: 1, availability: true },
      { title: '2BHK - Peelamedu Coimbatore', description: 'Large 2BHK with modular kitchen.', price: 28000, roomType: '2BHK', location: { city: 'Coimbatore', address: 'Peelamedu, Coimbatore' }, amenities: ['WiFi', 'AC', 'Modular Kitchen', 'Washing Machine', 'Gym'], images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'], capacity: 3, availability: true },
      { title: 'Single Room - Vellore', description: 'Perfect for remote workers with work desk.', price: 8000, roomType: 'Single Room', location: { city: 'Vellore', address: 'Katpadi, Vellore' }, amenities: ['WiFi', 'Work Desk', 'Bed', 'Wardrobe'], images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'], capacity: 1, availability: true },
      { title: '1BHK with Balcony - Madurai', description: 'Newly renovated 1BHK with private balcony.', price: 18000, roomType: '1BHK', location: { city: 'Madurai', address: 'KK Nagar, Madurai' }, amenities: ['WiFi', 'AC', 'Kitchen', 'Balcony', 'Parking'], images: ['https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800'], capacity: 1, availability: true },
      { title: 'Budget Double Room - Erode', description: 'Affordable double room near bus stand. Clean and well maintained with basic amenities for two.', price: 9500, roomType: 'Double Room', location: { city: 'Erode', address: 'Perundurai Road, Erode' }, amenities: ['WiFi', 'Two Beds', 'Wardrobe', 'Shared Kitchen', 'Shared Bathroom'], images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'], capacity: 2, availability: true },
      { title: '2BHK Premium - Thanjavur', description: 'Spacious 2BHK near temple town. Fully furnished with modern kitchen and living room.', price: 22000, roomType: '2BHK', location: { city: 'Thanjavur', address: 'Medical College Road, Thanjavur' }, amenities: ['WiFi', 'AC', 'Kitchen', 'Washing Machine', 'TV', 'Parking', 'Balcony'], images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'], capacity: 2, availability: true },
      { title: 'Single Room - Nagercoil', description: 'Clean and cozy single room near city center. Ideal for solo working professionals.', price: 6000, roomType: 'Single Room', location: { city: 'Nagercoil', address: 'Krishnankovil Road, Nagercoil' }, amenities: ['WiFi', 'Bed', 'Wardrobe', 'Attached Bathroom', 'Geyser'], images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'], capacity: 1, availability: true },
      { title: '1BHK Near Railway Station - Tiruppur', description: 'Well-maintained 1BHK close to railway station and textile market. Fully furnished for professionals.', price: 12000, roomType: '1BHK', location: { city: 'Tiruppur', address: 'Avinashi Road, Tiruppur' }, amenities: ['WiFi', 'AC', 'Kitchen', 'Bed', 'Wardrobe', 'Geyser'], images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'], capacity: 1, availability: true },
      { title: 'Double Room - Kumbakonam', description: 'Spacious double room in temple city. Shared kitchen and attached bathroom. Ideal for two people.', price: 10000, roomType: 'Double Room', location: { city: 'Kumbakonam', address: 'TSR Big Street, Kumbakonam' }, amenities: ['WiFi', 'Two Beds', 'AC', 'Attached Bathroom', 'Wardrobe', 'Shared Kitchen'], images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], capacity: 2, availability: true }
    ]);

    res.json({ message: '✅ Database seeded successfully! Users and rooms created.' });
  } catch (error) {
    res.status(500).json({ message: 'Seed failed', error: error.message });
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
