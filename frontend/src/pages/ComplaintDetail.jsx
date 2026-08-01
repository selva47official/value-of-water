import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const ComplaintDetail = ({ user }) => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const response = await api.get(`/complaints/${id}`);
      setComplaint(response.data);
      setStatus(response.data.status);
      setResolutionNotes(response.data.resolution_notes || '');
    } catch (error) {
      toast.error('Failed to fetch complaint');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      await api.patch(`/complaints/${id}`, {
        status,
        resolutionNotes
      });
      toast.success('Complaint updated successfully');
      fetchComplaint();
    } catch (error) {
      toast.error('Failed to update complaint');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading complaint...</div>;
  }

  if (!complaint) {
    return <div className="p-8">Complaint not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">{complaint.complaint_type}</h1>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-gray-600 text-sm">Status</label>
              <p className="text-lg font-semibold">{complaint.status}</p>
            </div>
            <div>
              <label className="text-gray-600 text-sm">Severity</label>
              <p className="text-lg font-semibold">{complaint.severity}</p>
            </div>
            <div>
              <label className="text-gray-600 text-sm">Location</label>
              <p className="text-lg font-semibold">{complaint.latitude}, {complaint.longitude}</p>
            </div>
            <div>
              <label className="text-gray-600 text-sm">Date Filed</label>
              <p className="text-lg font-semibold">{new Date(complaint.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-gray-600 text-sm">Description</label>
            <p className="text-lg mt-2">{complaint.description}</p>
          </div>

          {(user?.role === 'admin' || user?.role === 'official') && (
            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold mb-4">Update Complaint</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Resolution Notes</label>
                  <textarea
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24"
                    placeholder="Enter resolution notes..."
                  />
                </div>
                <button
                  onClick={handleUpdate}
                  disabled={updating}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg disabled:opacity-50"
                >
                  {updating ? 'Updating...' : 'Update Complaint'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
