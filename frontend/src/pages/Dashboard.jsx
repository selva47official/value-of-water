import React, { useState, useEffect } from 'react';
import MapComponent from '../components/Map';
import api from '../services/api';
import socket from '../services/socket';

const Dashboard = ({ user }) => {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
    
    socket.on('new-complaint', (complaint) => {
      setComplaints(prev => [complaint, ...prev]);
    });

    return () => {
      socket.off('new-complaint');
    };
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await api.get('/complaints?limit=5');
      setComplaints(response.data.complaints);
      
      const newStats = {
        total: response.data.complaints.length,
        open: response.data.complaints.filter(c => c.status === 'Open').length,
        inProgress: response.data.complaints.filter(c => c.status === 'In Progress').length,
        resolved: response.data.complaints.filter(c => c.status === 'Resolved').length
      };
      setStats(newStats);
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome, {user?.name}!</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-gray-600 text-sm">Total Complaints</div>
            <div className="text-4xl font-bold mt-2 text-blue-600">{stats.total}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-gray-600 text-sm">Open</div>
            <div className="text-4xl font-bold mt-2 text-yellow-600">{stats.open}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-gray-600 text-sm">In Progress</div>
            <div className="text-4xl font-bold mt-2 text-purple-600">{stats.inProgress}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="text-gray-600 text-sm">Resolved</div>
            <div className="text-4xl font-bold mt-2 text-green-600">{stats.resolved}</div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Water Quality Issues Map</h2>
          <MapComponent complaints={complaints} />
        </div>

        {/* Recent Complaints */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Recent Complaints</h2>
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="p-4 border-l-4 border-blue-500 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{complaint.complaint_type}</h3>
                    <p className="text-gray-600 text-sm mt-1">{complaint.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                    complaint.status === 'In Progress' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {complaint.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
