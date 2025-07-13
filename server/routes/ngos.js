const express = require('express');
const router = express.Router();
const Ngo = require('../models/Ngo');
const jwt = require('jsonwebtoken');

// Register NGO
router.post('/register', async (req, res) => {
  const { name, email, password, organization } = req.body;
  try {
    const exists = await Ngo.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const newNgo = new Ngo({ name, email, password, organization });
    await newNgo.save();
    res.status(201).json({ message: 'NGO registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login NGO
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const ngo = await Ngo.findOne({ email });
    if (!ngo || !(await ngo.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: ngo._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
    res.json({ token, ngo: { id: ngo._id, name: ngo.name, email: ngo.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
