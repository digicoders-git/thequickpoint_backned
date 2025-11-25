import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const JWT_SECRET = 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// MongoDB Connection (Local)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

// Admin Schema
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model('Admin', adminSchema);

// Create default admin if not exists
const createDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: 'admin@admin.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({
        name: 'Admin',
        email: 'admin@admin.com',
        password: hashedPassword
      });
      console.log('Default admin created: admin@admin.com / admin123');
    }
  } catch (error) {
    console.log('Error creating admin:', error);
  }
};

// Initialize default admin
createDefaultAdmin();

// Login Route
app.post('/api/admin/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email });
    console.log('Admin found:', admin ? 'Yes' : 'No');
    
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Dashboard Stats Route
app.get('/api/admin/dashboard/stats', (req, res) => {
  res.json({
    totalUsers: 0,
    activeUsers: 0,
    totalAdmins: 1
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server running' });
});

export default app;
