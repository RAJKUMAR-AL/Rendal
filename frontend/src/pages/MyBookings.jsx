import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import './MyBookings.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/bookings/my-bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="my-bookings">
      <div className="container">
        <h1>My Bookings</h1>
        {bookings.length === 0 ? (
          <p className="no-bookings">No bookings yet</p>
        ) : (
          <div className="bookings-list">
            {bookings.map(booking => (
              <div key={booking._id} className="booking-card">
                <div className="booking-image">
                  {booking.room?.images?.[0] ? (
                    <img src={booking.room.images[0]} alt={booking.room.title} />
                  ) : (
                    <div className="placeholder">No Image</div>
                  )}
                </div>
                <div className="booking-info">
                  <h3>{booking.room?.title}</h3>
                  <p className="booking-location">
                    <MapPin size={16} />
                    {booking.room?.location.city}
                  </p>
                  <p className="booking-dates">
                    <Calendar size={16} />
                    {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                  </p>
                  <p className="booking-price">
                    <DollarSign size={16} />
                    ${booking.totalPrice}
                  </p>
                  {booking.customerDetails && (
                    <div className="customer-info">
                      <p><strong>Name:</strong> {booking.customerDetails.name}</p>
                      <p><strong>Phone:</strong> {booking.customerDetails.phone}</p>
                    </div>
                  )}
                  <span className={`status-badge status-${booking.status}`}>
                    {booking.status}
                  </span>
                  
                  {booking.status === 'pending' && (
                    <div className="booking-status-message pending">
                      ⏳ Waiting for admin approval
                    </div>
                  )}
                  {booking.status === 'confirmed' && (
                    <div className="booking-status-message confirmed">
                      ✅ Booking Approved! Your room is confirmed.
                    </div>
                  )}
                  {booking.status === 'cancelled' && (
                    <div className="booking-status-message cancelled">
                      ❌ Booking Rejected. Please contact support.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
