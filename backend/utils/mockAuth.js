import jwt from 'jsonwebtoken';

// Mock admin user data (for development only)
const MOCK_ADMIN = {
  id: 'master-1',
  name: 'Dawit Solomon',
  email: 'dawit8908@gmail.com',
  role: 'admin'
};

// Mock authentication function
export const mockLogin = async (email, password) => {
  // In a real app, you'd validate against the database
  // For now, we'll accept the default credentials
  if (email === 'dawit8908@gmail.com' && password === 'devasol@123') {
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