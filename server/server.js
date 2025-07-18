require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors({
  origin: 'https://hydroafrica.netlify.app',
  credentials: true
}));
app.use(express.json());

// Routes
const ngoRoutes = require('./routes/ngos');
const reportRoutes = require('./routes/reports');

app.use('/api/ngos', ngoRoutes);
app.use('/api/reports', reportRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB Error:', err));

// Health check route
app.get('/', (req, res) => {
  res.send('🌍 Clean Water API Running');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
