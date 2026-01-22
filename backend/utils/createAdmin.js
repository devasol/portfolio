import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const createAdminUser = async () => {
  try {
    // 1. CLEAR the demo admin if it exists
    await User.deleteOne({ email: 'admin@portfolio.com' });
    console.log('🧹 Demo credentials cleared');

    // 2. UPSERT the real admin user
    const adminEmail = 'dawit8908@gmail.com';
    const adminPassword = 'devasol@123';
    
    let admin = await User.findOne({ email: adminEmail });
    
    if (!admin) {
      admin = await User.create({
        name: 'Dawit Solomon',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log('🎉 Real admin user created successfully!');
    } else {
      // Force update the password and name to ensure sync
      admin.name = 'Dawit Solomon';
      admin.password = adminPassword;
      await admin.save();
      console.log('✅ Real admin user credentials updated and verified');
    }

  } catch (error) {
    console.error('❌ Error in admin user management:', error);
  }
};

export default createAdminUser;