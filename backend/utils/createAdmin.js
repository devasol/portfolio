import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const createAdminUser = async () => {
  try {
    // Check if THIS specific admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@portfolio.com' });
    
    if (existingAdmin) {
      console.log('✅ Admin user "admin@portfolio.com" verified');
      return;
    }

    // Create the admin user (password will be hashed by User model pre-save hook)
    await User.create({
      name: 'Admin User',
      email: 'admin@portfolio.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('🎉 Admin user created successfully!');
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
};

export default createAdminUser;