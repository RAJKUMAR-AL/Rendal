import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, LogOut, Calendar, Settings } from 'lucide-react';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <Home size={24} />
          <span>RoomRental</span>
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/my-bookings" className="nav-link">
                <Calendar size={18} />
                My Bookings
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link">
                  <Settings size={18} />
                  Admin
                </Link>
              )}
              <span className="user-name">{user.name}</span>
              <button onClick={onLogout} className="btn-logout">
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-primary">Login</Link>
              <Link to="/signup" className="btn-secondary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
