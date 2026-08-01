const express = require('express');
const pool = require('../config/database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Get analytics dashboard
router.get('/dashboard', authenticateToken, authorizeRole('admin', 'official'), async (req, res) => {
  try {
    // Total complaints
    const totalComplaints = await pool.query('SELECT COUNT(*) FROM complaints');

    // Complaints by status
    const byStatus = await pool.query(
      'SELECT status, COUNT(*) as count FROM complaints GROUP BY status'
    );

    // Complaints by severity
    const bySeverity = await pool.query(
      'SELECT severity, COUNT(*) as count FROM complaints GROUP BY severity'
    );

    // Average resolution time
    const avgResolution = await pool.query(
      'SELECT AVG(EXTRACT(DAY FROM (updated_at - created_at))) as avg_days FROM complaints WHERE status = \'Resolved\''
    );

    // Complaints by region
    const byRegion = await pool.query(
      'SELECT region, COUNT(*) as count FROM complaints GROUP BY region ORDER BY count DESC LIMIT 10'
    );

    res.json({
      totalComplaints: totalComplaints.rows[0].count,
      byStatus: byStatus.rows,
      bySeverity: bySeverity.rows,
      avgResolutionDays: avgResolution.rows[0].avg_days || 0,
      topRegions: byRegion.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
