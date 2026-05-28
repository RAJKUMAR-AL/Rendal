import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MapPin, DollarSign, Users } from 'lucide-react';
import './RoomDetails.css';

function RoomDetails({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    try {
      const { data } = await axios.get(`/api/rooms/${id}`);
      setRoom(data);
    } catch (error) {
      console.error('Error fetching room:', error);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const days = Math.ceil((dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24));
      const totalPrice = room.price * days;

      const token = localStorage.getItem('token');
      await axios.post('/api/bookings', {
        room: room._id,
        checkIn: dateRange[0],
        checkOut: dateRange[1],
        totalPrice
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Booking confirmed!');
      navigate('/my-bookings');
    } catch (error) {
      alert('Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!room) return <div className="container">Loading...</div>;

  const days = Math.ceil((dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24));
  const totalPrice = room.price * days;

  return (
    <div className="room-details">
      <div className="container">
        <div className="room-images">
          {room.images?.length > 0 ? (
            <img src={room.images[0]} alt={room.title} />
          ) : (
            <div className="placeholder-large">No Image Available</div>
          )}
        </div>

        <div className="room-content">
          <div className="room-main">
            <div className="room-header">
              <h1>{room.title}</h1>
              <span className="room-type-tag">{room.roomType}</span>
            </div>
            <p className="location">
              <MapPin size={20} />
              {room.location.address}, {room.location.city}
            </p>
            <p className="price">
              <span>₹</span>
              {room.price.toLocaleString('en-IN')}/month
            </p>
            <p className="capacity">
              <Users size={20} />
              Capacity: {room.capacity} person(s)
            </p>

            <div className="description">
              <h3>Description</h3>
              <p>{room.description}</p>
            </div>

            <div className="amenities-section">
              <h3>Amenities</h3>
              <div className="amenities-list">
                {room.amenities.map((amenity, i) => (
                  <span key={i} className="amenity-badge">{amenity}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="booking-card">
            <h3>Book This Room</h3>
            <Calendar
              selectRange
              onChange={setDateRange}
              value={dateRange}
              minDate={new Date()}
            />
            <div className="booking-summary">
              <p>Duration: {days} day(s)</p>
              <p className="total">Total: ₹{totalPrice.toLocaleString('en-IN')}</p>
            </div>
            <button
              onClick={handleBooking}
              disabled={loading}
              className="btn-book"
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
