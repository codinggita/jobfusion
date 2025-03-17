const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const authMiddleware = async (req, res, next) => {
  // Extract token from Authorization header (e.g., "Bearer <token>")
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Access Denied! No token provided.' });
  }

  // Check if token includes "Bearer" prefix and extract the token part
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : authHeader;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access Denied! Invalid token format.' });
  }

  try {
    // Verify the token using the JWT_SECRET from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user from database to ensure they still exist (optional but adds security)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User no longer exists.' });
    }

    // Attach user data to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ success: false, message: 'Invalid or Expired Token' });
  }
};

module.exports = authMiddleware;