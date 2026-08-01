const express = require('express');
const pool = require('../config/database');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { validateComplaint, validate } = require('../middleware/validation');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: './uploads' });

// Get all complaints (with filters)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, severity, region, page = 1, limit = 10 } = req.query;
    let query = 'SELECT * FROM complaints WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (status) {
      query += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (severity) {
      query += ` AND severity = $${paramIndex}`;
      params.push(severity);
      paramIndex++;
    }

    if (region && req.user.role !== 'citizen') {
      query += ` AND region = $${paramIndex}`;
      params.push(region);
      paramIndex++;
    } else if (req.user.role === 'citizen') {
      query += ` AND user_id = $${paramIndex}`;
      params.push(req.user.id);
      paramIndex++;
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, (page - 1) * limit);

    const result = await pool.query(query, params);
    res.json({
      complaints: result.rows,
      page,
      limit,
      total: result.rows.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// Create complaint
router.post('/', authenticateToken, validateComplaint, validate, upload.single('photo'), async (req, res) => {
  try {
    const { complaintType, severity, description, latitude, longitude } = req.body;
    const userId = req.user.id;
    const photoPath = req.file ? req.file.path : null;

    const result = await pool.query(
      `INSERT INTO complaints 
       (user_id, complaint_type, severity, description, latitude, longitude, photo_url, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [userId, complaintType, severity, description, latitude, longitude, photoPath, 'Open']
    );

    // Emit real-time update
    if (req.io) {
      req.io.emit('new-complaint', result.rows[0]);
    }

    res.status(201).json({
      message: 'Complaint filed successfully',
      complaint: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create complaint' });
  }
});

// Update complaint status (for officials)
router.patch('/:id', authenticateToken, authorizeRole('official', 'admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo, resolutionNotes } = req.body;

    const result = await pool.query(
      `UPDATE complaints 
       SET status = COALESCE($1, status), 
           assigned_to = COALESCE($2, assigned_to),
           resolution_notes = COALESCE($3, resolution_notes),
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [status, assignedTo, resolutionNotes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    // Emit update
    if (req.io) {
      req.io.emit('complaint-updated', result.rows[0]);
    }

    res.json({
      message: 'Complaint updated successfully',
      complaint: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update complaint' });
  }
});

// Get complaint details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM complaints WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch complaint' });
  }
});

module.exports = router;
