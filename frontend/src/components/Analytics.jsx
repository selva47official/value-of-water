import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import api from '../services/api';

const Analytics = ({ user }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/analytics/dashboard');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading analytics...</div>;
  }

  if (!analytics) {
    return <div className="p-8">No analytics data available</div>;
  }

  const statusChartData = {
    labels: analytics.byStatus.map(item => item.status),
    datasets: [{
      label: 'Complaints by Status',
      data: analytics.byStatus.map(item => item.count),
      backgroundColor: ['#3B82F6', '#F59E0B', '#10B981', '#EF4444']
    }]
  };

  const severityChartData = {
    labels: analytics.bySeverity.map(item => item.severity),
    datasets: [{
      label: 'Complaints by Severity',
      data: analytics.bySeverity.map(item => item.count),
      backgroundColor: ['#FF6B6B', '#FFA500', '#FFD93D', '#6BCB77']
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Total Complaints</div>
          <div className="text-3xl font-bold mt-2">{analytics.totalComplaints}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Avg Resolution Time</div>
          <div className="text-3xl font-bold mt-2">{analytics.avgResolutionDays.toFixed(1)} days</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Critical Issues</div>
          <div className="text-3xl font-bold mt-2 text-red-600">
            {analytics.bySeverity.find(item => item.severity === 'Critical')?.count || 0}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Resolved</div>
          <div className="text-3xl font-bold mt-2 text-green-600">
            {analytics.byStatus.find(item => item.status === 'Resolved')?.count || 0}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Complaints by Status</h2>
          <Pie data={statusChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Complaints by Severity</h2>
          <Bar data={severityChartData} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Top Regions by Complaints</h2>
        <div className="space-y-2">
          {analytics.topRegions.map((region, index) => (
            <div key={index} className="flex justify-between items-center p-4 border-b">
              <span className="font-medium">{region.region}</span>
              <span className="text-lg font-bold">{region.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
