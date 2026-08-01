import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ComplaintCard from '../components/ComplaintCard';
import api from '../services/api';
import toast from 'react-hot-toast';

const Complaints = ({ user }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    severity: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    complaintType: '',
    severity: 'Medium',
    description: '',
    latitude: '',
    longitude: '',
    photo: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, [filters]);

  const fetchComplaints = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.severity) params.append('severity', filters.severity);
      
      const response = await api.get(`/complaints?${params}`);
      setComplaints(response.data.complaints);
    } catch (error) {
      toast.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('complaintType', formData.complaintType);
      data.append('severity', formData.severity);
      data.append('description', formData.description);
      data.append('latitude', formData.latitude);
      data.append('longitude', formData.longitude);
      if (formData.photo) data.append('photo', formData.photo);

      await api.post('/complaints', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      toast.success('Complaint filed successfully!');
      setShowForm(false);
      fetchComplaints();
      setFormData({
        complaintType: '',
        severity: 'Medium',
        description: '',
        latitude: '',
        longitude: '',
        photo: null
      });
    } catch (error) {
      toast.error('Failed to file complaint');
    }
  };

  if (loading) {
    return <div className="p-8">Loading complaints...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Water Quality Complaints</h1>
          {user?.role === 'citizen' && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              {showForm ? 'Cancel' : 'File New Complaint'}
            </button>
          )}
        </div>

        {showForm && user?.role === 'citizen' && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-bold mb-4">File Water Quality Complaint</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Complaint Type"
                  value={formData.complaintType}
                  onChange={(e) => setFormData({...formData, complaintType: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Low">Low Severity</option>
                  <option value="Medium">Medium Severity</option>
                  <option value="High">High Severity</option>
                  <option value="Critical">Critical Severity</option>
                </select>
              </div>

              <textarea
                placeholder="Complaint Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="0.0001"
                  placeholder="Latitude"
                  value={formData.latitude}
                  onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="number"
                  step="0.0001"
                  placeholder="Longitude"
                  value={formData.longitude}
                  onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Upload Photo (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
              >
                Submit Complaint
              </button>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-8 flex gap-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={filters.severity}
            onChange={(e) => setFilters({...filters, severity: e.target.value})}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Severity</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Complaints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              onClick={() => navigate(`/complaints/${complaint.id}`)}
            />
          ))}
        </div>

        {complaints.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg">No complaints found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;
