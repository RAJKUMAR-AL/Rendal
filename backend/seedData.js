import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Room from './models/Room.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await User.deleteMany({});
    await Room.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'user@gmail.com',
        password: hashedPassword,
        phone: '1234567890',
        role: 'user'
      },
      {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: hashedPassword,
        phone: '0987654321',
        role: 'admin'
      }
    ]);
    console.log('Created sample users');

    // Create sample rooms (only individual rooms, not full houses)
    const rooms = await Room.insertMany([
      {
        title: 'Single Room in Shared Apartment',
        description: 'Comfortable single room with attached bathroom. Perfect for solo professionals. Shared kitchen and living area with other tenants.',
        price: 7000,
        roomType: 'Single Room',
        location: { city: 'Chennai', address: 'Anna Nagar, Chennai', coordinates: { lat: 13.0850, lng: 80.2101 } },
        amenities: ['WiFi', 'Air Conditioning', 'Attached Bathroom', 'Bed', 'Wardrobe', 'Study Table'],
        images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'],
        capacity: 1, availability: true
      },
      {
        title: 'Double Room for Two People',
        description: 'Spacious double room with two beds. Ideal for friends or colleagues working in the same city. Shared facilities.',
        price: 11000,
        roomType: 'Double Room',
        location: { city: 'Coimbatore', address: 'RS Puram, Coimbatore', coordinates: { lat: 11.0168, lng: 76.9558 } },
        amenities: ['WiFi', 'Air Conditioning', 'Two Beds', 'Wardrobe', 'Balcony', 'Shared Kitchen'],
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],
        capacity: 2, availability: true
      },
      {
        title: '1BHK Independent Room',
        description: 'Private 1BHK with bedroom, hall, and kitchen. Fully furnished with all modern amenities. Perfect for professionals seeking privacy.',
        price: 16000,
        roomType: '1BHK',
        location: { city: 'Madurai', address: 'Anna Nagar, Madurai', coordinates: { lat: 9.9252, lng: 78.1198 } },
        amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Washing Machine', 'TV', 'Parking'],
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
        capacity: 1, availability: true
      },
      {
        title: '2BHK Furnished Room',
        description: 'Spacious 2BHK with two bedrooms, hall, and kitchen. Ideal for small families or two professionals. Fully furnished.',
        price: 25000,
        roomType: '2BHK',
        location: { city: 'Trichy', address: 'Thillai Nagar, Trichy', coordinates: { lat: 10.7905, lng: 78.7047 } },
        amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Washing Machine', 'TV', 'Parking', 'Balcony'],
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
        capacity: 2, availability: true
      },
      {
        title: 'Budget Single Room Near Bus Stand',
        description: 'Affordable single room with basic amenities. Clean and well-maintained. Shared bathroom and kitchen facilities.',
        price: 5500,
        roomType: 'Single Room',
        location: { city: 'Salem', address: 'Fairlands, Salem', coordinates: { lat: 11.6643, lng: 78.1460 } },
        amenities: ['WiFi', 'Bed', 'Wardrobe', 'Shared Kitchen', 'Shared Bathroom'],
        images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800'],
        capacity: 1, availability: true
      },
      {
        title: 'Premium Double Room with Attached Bath',
        description: 'Well-furnished double room with attached bathroom. AC and modern amenities. Shared kitchen with other tenants.',
        price: 13000,
        roomType: 'Double Room',
        location: { city: 'Tirunelveli', address: 'Palayamkottai, Tirunelveli', coordinates: { lat: 8.7139, lng: 77.7567 } },
        amenities: ['WiFi', 'Air Conditioning', 'Attached Bathroom', 'Two Beds', 'Wardrobe', 'Shared Kitchen'],
        images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
        capacity: 2, availability: true
      },
      {
        title: 'Cozy 1BHK Near IT Park',
        description: 'Compact 1BHK with all essential amenities. Perfect for working professionals. Independent entrance and kitchen.',
        price: 14000,
        roomType: '1BHK',
        location: { city: 'Chennai', address: 'OMR Road, Chennai', coordinates: { lat: 12.9010, lng: 80.2279 } },
        amenities: ['WiFi', 'Kitchen', 'Bed', 'Wardrobe', 'Study Table', 'Geyser'],
        images: ['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800'],
        capacity: 1, availability: true
      },
      {
        title: 'Spacious 2BHK for Families',
        description: 'Large 2BHK with separate bedrooms, living room, and modular kitchen. Suitable for small families or two professionals.',
        price: 28000,
        roomType: '2BHK',
        location: { city: 'Coimbatore', address: 'Peelamedu, Coimbatore', coordinates: { lat: 11.0300, lng: 77.0200 } },
        amenities: ['WiFi', 'Air Conditioning', 'Modular Kitchen', 'Washing Machine', 'TV', 'Parking', 'Gym Access'],
        images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'],
        capacity: 3, availability: true
      },
      {
        title: 'Single Room with Work Desk',
        description: 'Perfect for remote workers. Single room with dedicated workspace, high-speed WiFi, and comfortable bed.',
        price: 8000,
        roomType: 'Single Room',
        location: { city: 'Vellore', address: 'Katpadi, Vellore', coordinates: { lat: 12.9165, lng: 79.1325 } },
        amenities: ['WiFi', 'Work Desk', 'Ergonomic Chair', 'Bed', 'Wardrobe', 'Shared Kitchen'],
        images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'],
        capacity: 1, availability: true
      },
      {
        title: 'Budget Double Room - Erode',
        description: 'Affordable double room near bus stand. Clean and well maintained with basic amenities for two.',
        price: 9500,
        roomType: 'Double Room',
        location: { city: 'Erode', address: 'Perundurai Road, Erode', coordinates: { lat: 11.3410, lng: 77.7172 } },
        amenities: ['WiFi', 'Two Beds', 'Wardrobe', 'Shared Kitchen', 'Shared Bathroom'],
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],
        capacity: 2, availability: true
      },
      {
        title: '2BHK Premium - Thanjavur',
        description: 'Spacious 2BHK near temple town. Fully furnished with modern kitchen and living room.',
        price: 22000,
        roomType: '2BHK',
        location: { city: 'Thanjavur', address: 'Medical College Road, Thanjavur', coordinates: { lat: 10.7870, lng: 79.1378 } },
        amenities: ['WiFi', 'AC', 'Kitchen', 'Washing Machine', 'TV', 'Parking', 'Balcony'],
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
        capacity: 2, availability: true
      },
      {
        title: 'Single Room - Nagercoil',
        description: 'Clean and cozy single room near city center. Ideal for solo working professionals.',
        price: 6000,
        roomType: 'Single Room',
        location: { city: 'Nagercoil', address: 'Krishnankovil Road, Nagercoil', coordinates: { lat: 8.1833, lng: 77.4119 } },
        amenities: ['WiFi', 'Bed', 'Wardrobe', 'Attached Bathroom', 'Geyser'],
        images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'],
        capacity: 1, availability: true
      },
      {
        title: '1BHK Near Railway Station - Tiruppur',
        description: 'Well-maintained 1BHK close to railway station and textile market. Fully furnished for professionals.',
        price: 12000,
        roomType: '1BHK',
        location: { city: 'Tiruppur', address: 'Avinashi Road, Tiruppur', coordinates: { lat: 11.1085, lng: 77.3411 } },
        amenities: ['WiFi', 'AC', 'Kitchen', 'Bed', 'Wardrobe', 'Geyser'],
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
        capacity: 1, availability: true
      },
      {
        title: 'Double Room - Kumbakonam',
        description: 'Spacious double room in temple city. Shared kitchen and attached bathroom. Ideal for two people.',
        price: 10000,
        roomType: 'Double Room',
        location: { city: 'Kumbakonam', address: 'TSR Big Street, Kumbakonam', coordinates: { lat: 10.9602, lng: 79.3845 } },
        amenities: ['WiFi', 'Two Beds', 'AC', 'Attached Bathroom', 'Wardrobe', 'Shared Kitchen'],
        images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
        capacity: 2, availability: true
      }
    ]);
    console.log('Created sample rooms');

    console.log('\n=== Sample Login Credentials ===');
    console.log('\nRegular User:');
    console.log('Email: user@gmail.com');
    console.log('Password: password123');
    console.log('\nAdmin User:');
    console.log('Email: admin@gmail.com');
    console.log('Password: password123');
    console.log('\n================================\n');

    mongoose.connection.close();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
