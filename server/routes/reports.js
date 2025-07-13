const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Report = require('../models/Report');
const auth = require('../middleware/auth');

// Set up Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Init upload middleware
const upload = multer({ storage });

// POST: Submit a report
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { description, location, status } = req.body;

    if (!location || !description) {
      return res.status(400).json({ message: 'Missing description or location' });
    }

    const parsedLocation = JSON.parse(location); // 👈 fix here

    const newReport = new Report({
     description,
     location: parsedLocation,
     image: req.file ? `/uploads/${req.file.filename}` : null,
     status: status || 'new' // ✅ Use provided status or default to 'new'
   });



    const saved = await newReport.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Report POST error:', err);
    res.status(400).json({ message: err.message });
  }
});

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET: Fetch nearby reports
router.get('/nearby', async (req, res) => {
  const { lng, lat, radius = 5000 } = req.query;
  try {
    const reports = await Report.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(radius)
        }
      }
    });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Update report status
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Report.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

router.patch('/:id/verify', auth, async (req, res) => {
  try {
    const updated = await Report.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Verification failed' });
  }
});


module.exports = router;
