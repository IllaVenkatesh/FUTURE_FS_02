import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mini-crm');
  const existing = await User.findOne({ email: 'admin@example.com' });
  if (!existing) {
    const hashed = await bcrypt.hash('Admin@123', 10);
    await User.create({ name: 'Admin User', email: 'admin@example.com', password: hashed });
    console.log('Admin seeded');
  } else {
    console.log('Admin already exists');
  }
  process.exit();
};

seedAdmin();
