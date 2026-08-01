import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span>💧</span>
          <span>Value of Water</span>
        </div>
        <div className="navbar-menu">
          <a href="/">Dashboard</a>
          <a href="/complaints">Complaints</a>
          {(user?.role === 'admin' || user?.role === 'official') && (
            <a href="/analytics">Analytics</a>
          )}
          <span>{user?.name}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
