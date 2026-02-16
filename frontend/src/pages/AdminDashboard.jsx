import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('rooms');
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', roomType: 'Single Room', city: '', address: '',
    amenities: '', capacity: 1, images: ''
  });

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms');
      setRooms(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const roomData = {
        ...formData,
        roomType: formData.roomType,
        location: { city: formData.city, address: formData.address },
        amenities: formData.amenities.split(',').map(a => a.trim()),
        images: formData.images.split(',').map(i => i.trim())
      };
      await axios.post('/api/rooms', roomData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Room added successfully');
      fetchRooms();
      setFormData({ title: '', description: '', price: '', roomType: 'Single Room', city: '', address: '', amenities: '', capacity: 1, images: '' });
    } catch (error) {
      alert('Failed to add room');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this room?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchRooms();
    } catch (error) {
      alert('Failed to delete room');
    }
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    const confirmMessage = status === 'confirmed' 
      ? 'Approve this booking?' 
      : 'Reject this booking?';
    
    if (!confirm(confirmMessage)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/bookings/${bookingId}`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Booking ${status === 'confirmed' ? 'approved' : 'rejected'} successfully!`);
      fetchBookings();
    } catch (error) {
      alert('Failed to update booking status');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>
        <div className="tabs">
          <button
            className={activeTab === 'rooms' ? 'active' : ''}
            onClick={() => setActiveTab('rooms')}
          >
            Rooms
          </button>
          <button
            className={activeTab === 'bookings' ? 'active' : ''}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
        </div>

        {activeTab === 'rooms' && (
          <div className="admin-content">
            <div className="add-room-form">
              <h2>Add New Room</h2>
              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
                <select
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  required
                >
                  <option value="Single Room">Single Room</option>
                  <option value="Double Room">Double Room</option>
                  <option value="1BHK">1BHK</option>
                  <option value="2BHK">2BHK</option>
                </select>
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
                <input
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
                <input
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
                <input
                  placeholder="Amenities (comma-separated)"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
                <input
                  placeholder="Image URLs (comma-separated)"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                />
                <button type="submit" className="btn-submit">Add Room</button>
              </form>
            </div>

            <div className="rooms-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Room Type</th>
                    <th>City</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map(room => (
                    <tr key={room._id}>
                      <td>{room.title}</td>
                      <td>{room.roomType}</td>
                      <td>{room.location.city}</td>
                      <td>${room.price}</td>
                      <td>
                        <button onClick={() => handleDelete(room._id)} className="btn-delete">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bookings-table">
            <h2>All Bookings</h2>
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Room</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id}>
                    <td>{booking.user?.name}</td>
                    <td>{booking.room?.title}</td>
                    <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                    <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                    <td>${booking.totalPrice}</td>
                    <td>
                      <span className={`status-badge-admin status-${booking.status}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      {booking.status === 'pending' && (
                        <div className="action-buttons">
                          <button 
                            onClick={() => handleUpdateBookingStatus(booking._id, 'confirmed')}
                            className="btn-approve"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleUpdateBookingStatus(booking._id, 'cancelled')}
                            className="btn-reject"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {booking.status !== 'pending' && (
                        <span className="status-text">{booking.status === 'confirmed' ? 'Approved' : 'Rejected'}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
