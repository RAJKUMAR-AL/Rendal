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
        email: 'user@example.com',
        password: hashedPassword,
        phone: '1234567890',
        role: 'user'
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
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
        price: 450,
        roomType: 'Single Room',
        location: {
          city: 'New York',
          address: '123 Main Street, Manhattan',
          coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        amenities: ['WiFi', 'Air Conditioning', 'Attached Bathroom', 'Bed', 'Wardrobe', 'Study Table'],
        images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'],
        capacity: 1,
        availability: true
      },
      {
        title: 'Double Room for Two People',
        description: 'Spacious double room with two beds. Ideal for friends or colleagues working in the same city. Shared facilities.',
        price: 650,
        roomType: 'Double Room',
        location: {
          city: 'San Francisco',
          address: '456 Tech Avenue, SOMA',
          coordinates: { lat: 37.7749, lng: -122.4194 }
        },
        amenities: ['WiFi', 'Air Conditioning', 'Two Beds', 'Wardrobe', 'Balcony', 'Shared Kitchen'],
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],
        capacity: 2,
        availability: true
      },
      {
        title: '1BHK Independent Room',
        description: 'Private 1BHK with bedroom, hall, and kitchen. Fully furnished with all modern amenities. Perfect for professionals seeking privacy.',
        price: 800,
        roomType: '1BHK',
        location: {
          city: 'Chicago',
          address: '789 Business Blvd, Loop',
          coordinates: { lat: 41.8781, lng: -87.6298 }
        },
        amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Washing Machine', 'TV', 'Parking'],
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
        capacity: 1,
        availability: true
      },
      {
        title: '2BHK Furnished Room',
        description: 'Spacious 2BHK with two bedrooms, hall, and kitchen. Ideal for small families or two professionals. Fully furnished.',
        price: 1200,
        roomType: '2BHK',
        location: {
          city: 'Los Angeles',
          address: '321 Sunset Boulevard, Hollywood',
          coordinates: { lat: 34.0522, lng: -118.2437 }
        },
        amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Washing Machine', 'TV', 'Parking', 'Balcony'],
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
        capacity: 2,
        availability: true
      },
      {
        title: 'Budget Single Room Near Metro',
        description: 'Affordable single room with basic amenities. Clean and well-maintained. Shared bathroom and kitchen facilities.',
        price: 350,
        roomType: 'Single Room',
        location: {
          city: 'Boston',
          address: '555 Metro Street, Cambridge',
          coordinates: { lat: 42.3601, lng: -71.0589 }
        },
        amenities: ['WiFi', 'Bed', 'Wardrobe', 'Shared Kitchen', 'Shared Bathroom'],
        images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800'],
        capacity: 1,
        availability: true
      },
      {
        title: 'Premium Double Room with Attached Bath',
        description: 'Well-furnished double room with attached bathroom. AC and modern amenities. Shared kitchen with other tenants.',
        price: 750,
        roomType: 'Double Room',
        location: {
          city: 'Austin',
          address: '888 Arts Lane, Downtown',
          coordinates: { lat: 30.2672, lng: -97.7431 }
        },
        amenities: ['WiFi', 'Air Conditioning', 'Attached Bathroom', 'Two Beds', 'Wardrobe', 'Shared Kitchen'],
        images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
        capacity: 2,
        availability: true
      },
      {
        title: 'Cozy 1BHK Near Business District',
        description: 'Compact 1BHK with all essential amenities. Perfect for working professionals. Independent entrance and kitchen.',
        price: 700,
        roomType: '1BHK',
        location: {
          city: 'Seattle',
          address: '234 Pike Street, Downtown',
          coordinates: { lat: 47.6062, lng: -122.3321 }
        },
        amenities: ['WiFi', 'Kitchen', 'Bed', 'Wardrobe', 'Study Table', 'Geyser'],
        images: ['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800'],
        capacity: 1,
        availability: true
      },
      {
        title: 'Spacious 2BHK for Families',
        description: 'Large 2BHK with separate bedrooms, living room, and modular kitchen. Suitable for small families or two professionals.',
        price: 1400,
        roomType: '2BHK',
        location: {
          city: 'Denver',
          address: '567 Mountain View, Capitol Hill',
          coordinates: { lat: 39.7392, lng: -104.9903 }
        },
        amenities: ['WiFi', 'Air Conditioning', 'Modular Kitchen', 'Washing Machine', 'TV', 'Parking', 'Gym Access'],
        images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'],
        capacity: 3,
        availability: true
      },
      {
        title: 'Single Room with Work Desk',
        description: 'Perfect for remote workers. Single room with dedicated workspace, high-speed WiFi, and comfortable bed.',
        price: 500,
        roomType: 'Single Room',
        location: {
          city: 'Portland',
          address: '890 Pearl District, Northwest',
          coordinates: { lat: 45.5152, lng: -122.6784 }
        },
        amenities: ['WiFi', 'Work Desk', 'Ergonomic Chair', 'Bed', 'Wardrobe', 'Shared Kitchen'],
        images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'],
        capacity: 1,
        availability: true
      },
      {
        title: 'Modern 1BHK with Balcony',
        description: 'Newly renovated 1BHK with private balcony. Fully furnished with modern appliances and fixtures.',
        price: 900,
        roomType: '1BHK',
        location: {
          city: 'Miami',
          address: '123 Ocean Drive, South Beach',
          coordinates: { lat: 25.7617, lng: -80.1918 }
        },
        amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Balcony', 'Washing Machine', 'Parking'],
        images: ['https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800'],
        capacity: 1,
        availability: true
      }
    ]);
    console.log('Created sample rooms');

    console.log('\n=== Sample Login Credentials ===');
    console.log('\nRegular User:');
    console.log('Email: user@example.com');
    console.log('Password: password123');
    console.log('\nAdmin User:');
    console.log('Email: admin@example.com');
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
