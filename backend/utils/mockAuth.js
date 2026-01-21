import jwt from 'jsonwebtoken';

// Mock admin user data (for development only)
const MOCK_ADMIN = {
  id: '1',
  name: 'Admin User',
  email: 'admin@portfolio.com',
  role: 'admin'
};

// Mock authentication function
export const mockLogin = async (email, password) => {
  // In a real app, you'd validate against the database
  // For now, we'll accept the default credentials
  if (email === 'admin@portfolio.com' && password === 'admin123') {
    const token = jwt.sign(
      { id: MOCK_ADMIN.id, email: MOCK_ADMIN.email },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '30d' }
    );
    
    return {
      success: true,
      token,
      user: MOCK_ADMIN
    };
  }
  
  return {
    success: false,
    message: 'Invalid credentials'
  };
};

// Mock function to verify token
export const mockVerifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    return { valid: true, user: MOCK_ADMIN };
  } catch (error) {
    return { valid: false, user: null };
  }
};