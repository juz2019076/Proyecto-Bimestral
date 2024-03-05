import jwt from 'jsonwebtoken';

const verifyAdminToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
    req.adminUserId = decoded.adminUserId;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default verifyAdminToken;
