import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MapPin, DollarSign, Shield, Clock, Star, Home as HomeIcon, Sparkles, X } from 'lucide-react';
import './Home.css';
import './WelcomeBanner.css';

function Home({ user }) {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    specialRequests: ''
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms');
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setShowBookingModal(true);
    setShowCustomerForm(false);
    setDateRange([new Date(), new Date()]);
  };

  const handleProceedToCustomerDetails = () => {
    setShowCustomerForm(true);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone || !customerDetails.address) {
      alert('Please fill in all required customer details');
      return;
    }

    setLoading(true);
    try {
      const days = Math.ceil((dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24));
      const totalPrice = selectedRoom.price * days;

      const token = localStorage.getItem('token');
      await axios.post('/api/bookings', {
        room: selectedRoom._id,
        checkIn: dateRange[0],
        checkOut: dateRange[1],
        totalPrice,
        customerDetails
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Booking confirmed! Check your email for confirmation details.');
      setShowBookingModal(false);
      setSelectedRoom(null);
      setCustomerDetails({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        specialRequests: ''
      });
    } catch (error) {
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowBookingModal(false);
    setSelectedRoom(null);
    setShowCustomerForm(false);
  };

  const days = selectedRoom ? Math.ceil((dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24)) : 0;
  const totalPrice = selectedRoom ? selectedRoom.price * days : 0;

  return (
    <div className="home">
      <div className="welcome-banner">
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="container">
          <div className="welcome-content">
            <div className="welcome-text">
              <div className="greeting-container">
                <span className="greeting-icon">👋</span>
                <h1>
                  <span className="greeting-time">Welcome Back!</span>
                  <span className="user-name">{user?.name || 'Guest'}</span>
                </h1>
              </div>
              <p className="welcome-subtitle">
                🏠 Ready to find your perfect room? Explore our verified listings and book your ideal space today!
              </p>
            </div>
            <div className="welcome-stats">
              <div className="stat-card">
                <span className="stat-icon">🏘️</span>
                <div className="stat-number">{rooms.length}</div>
                <div className="stat-label">Available</div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">⚡</span>
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
              <div className="stat-card">
                <span className="stat-icon">✓</span>
                <div className="stat-number">100%</div>
                <div className="stat-label">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2>Why Choose RoomRental? 🌟</h2>
          <p>Experience hassle-free room booking with our premium features</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3>Secure Booking</h3>
              <p>Safe and encrypted payment process for your peace of mind</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={32} />
              </div>
              <h3>Instant Confirmation</h3>
              <p>Get immediate booking confirmation and room details</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Star size={32} />
              </div>
              <h3>Quality Rooms</h3>
              <p>Verified rooms with all essential amenities included</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <HomeIcon size={32} />
              </div>
              <h3>Best Locations</h3>
              <p>Rooms in prime locations near business districts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container rooms-section">
        <h2>🏠 Explore Available Rooms</h2>
        <p className="section-subtitle">Handpicked rooms perfect for your work stay</p>
        <div className="rooms-grid">
          {rooms.map(room => (
            <div key={room._id} className="room-card">
              <Link to={`/room/${room._id}`} className="room-card-link">
                <div className="room-image">
                  {room.images?.[0] ? (
                    <img src={room.images[0]} alt={room.title} />
                  ) : (
                    <div className="placeholder-image">No Image</div>
                  )}
                  <div className="room-type-badge">{room.roomType}</div>
                </div>
                <div className="room-info">
                  <h3>{room.title}</h3>
                  <p className="room-location">
                    <MapPin size={16} />
                    {room.location.city}
                  </p>
                  <p className="room-price">
                    <DollarSign size={16} />
                    ${room.price}/month
                  </p>
                  <div className="room-amenities">
                    {room.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="amenity-tag">{amenity}</span>
                    ))}
                  </div>
                </div>
              </Link>
              <div className="room-actions">
                <button 
                  onClick={() => handleBookNow(room)} 
                  className="btn-book-now"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showBookingModal && selectedRoom && (
        <div className="booking-modal-overlay" onClick={closeModal}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>
            
            <div className="modal-header">
              <h2>Book {selectedRoom.title}</h2>
              <span className="modal-room-type">{selectedRoom.roomType}</span>
            </div>

            {!showCustomerForm ? (
              <div className="modal-content">
                <div className="modal-room-info">
                  <p><MapPin size={16} /> {selectedRoom.location.city}</p>
                  <p><DollarSign size={16} /> ${selectedRoom.price}/month</p>
                </div>

                <div className="calendar-section">
                  <h3>Select Dates</h3>
                  <Calendar
                    selectRange
                    onChange={setDateRange}
                    value={dateRange}
                    minDate={new Date()}
                  />
                </div>

                <div className="booking-summary">
                  <p>Duration: {days} day(s)</p>
                  <p className="total">Total: ${totalPrice}</p>
                </div>

                <button 
                  onClick={handleProceedToCustomerDetails}
                  className="btn-proceed"
                >
                  Proceed to Customer Details
                </button>
              </div>
            ) : (
              <div className="modal-content">
                <button 
                  onClick={() => setShowCustomerForm(false)} 
                  className="btn-back-modal"
                >
                  ← Back to Calendar
                </button>

                <h3>Customer Details</h3>
                <form onSubmit={handleBooking} className="customer-form">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                      required
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Current Address *</label>
                    <textarea
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                      required
                      placeholder="Enter your complete address"
                      rows="3"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Special Requests (Optional)</label>
                    <textarea
                      value={customerDetails.specialRequests}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, specialRequests: e.target.value })}
                      placeholder="Any special requirements or requests"
                      rows="2"
                    />
                  </div>

                  <div className="booking-summary">
                    <p><strong>Check-in:</strong> {dateRange[0].toLocaleDateString()}</p>
                    <p><strong>Check-out:</strong> {dateRange[1].toLocaleDateString()}</p>
                    <p><strong>Duration:</strong> {days} day(s)</p>
                    <p className="total">Total Amount: ${totalPrice}</p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-confirm-booking"
                  >
                    {loading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
