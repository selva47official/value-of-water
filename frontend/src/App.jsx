import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import socket from './services/socket';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Complaints from './pages/Complaints';
import Analytics from './pages/Analytics';
import ComplaintDetail from './pages/ComplaintDetail';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
      
      // Connect socket
      socket.connect();
      socket.emit('user-online', { userId: JSON.parse(userData).id });
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      {isAuthenticated && <Navbar user={user} setIsAuthenticated={setIsAuthenticated} />}
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/" 
          element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/complaints" 
          element={isAuthenticated ? <Complaints user={user} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/complaints/:id" 
          element={isAuthenticated ? <ComplaintDetail user={user} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/analytics" 
          element={isAuthenticated ? <Analytics user={user} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
