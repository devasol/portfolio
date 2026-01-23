
const isDevelopment = import.meta.env.MODE === 'development';

// 1. Try environment variable
// 2. Fallback to hardcoded production URL if in production
// 3. Fallback to localhost if in development
export const API_BASE_URL = import.meta.env.VITE_API_URL || (isDevelopment 
  ? 'http://localhost:5001/api' 
  : 'https://portfolio-hcjl.onrender.com/api');

console.log(`🔌 API Configured: ${API_BASE_URL} (Mode: ${import.meta.env.MODE})`);
