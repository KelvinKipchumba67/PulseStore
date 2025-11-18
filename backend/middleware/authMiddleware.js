import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js'; // We'll create this next
import User from '../models/userModel.js'; // We'll create this next

// Protect routes - checks for valid token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the 'jwt' cookie
  // We're using cookies, but you could also check req.headers.authorization
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID from the token payload, exclude password
      req.user = await User.findById(decoded.userId).select('-password');

      if (req.user) {
        next(); // User is found, proceed to the next middleware/controller
      } else {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin middleware - checks if the user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is an admin, proceed
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

// Now we can export them correctly
export { protect, admin };