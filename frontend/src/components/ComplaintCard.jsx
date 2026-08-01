import React from 'react';

const ComplaintCard = ({ complaint, onClick }) => {
  const getSeverityClass = (severity) => {
    const classes = {
      'Critical': 'bg-red-100 text-red-800',
      'High': 'bg-orange-100 text-orange-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800'
    };
    return classes[severity] || 'bg-gray-100 text-gray-800';
  };

  const getStatusClass = (status) => {
    const classes = {
      'Open': 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-purple-100 text-purple-800',
      'Resolved': 'bg-green-100 text-green-800',
      'Closed': 'bg-gray-100 text-gray-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border-l-4 border-blue-500"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg">{complaint.complaint_type}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${getSeverityClass(complaint.severity)}`}>
          {complaint.severity}
        </span>
      </div>
      <p className="text-gray-600 mb-3 line-clamp-2">{complaint.description}</p>
      <div className="flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusClass(complaint.status)}`}>
          {complaint.status}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(complaint.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default ComplaintCard;
