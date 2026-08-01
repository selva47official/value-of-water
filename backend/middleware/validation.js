const { body, validationResult } = require('express-validator');

const validateComplaint = [
  body('complaintType').notEmpty().withMessage('Complaint type is required'),
  body('severity').isIn(['Critical', 'High', 'Medium', 'Low']).withMessage('Invalid severity level'),
  body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
  body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
  body('description').notEmpty().withMessage('Description is required')
];

const validateUser = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('name').notEmpty().withMessage('Name is required')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { 
  validateComplaint, 
  validateUser, 
  validate 
};
