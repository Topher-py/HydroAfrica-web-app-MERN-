const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  image: { type: String },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [lng, lat]
  },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  status: {
  type: String,
  enum: ['new', 'in-progress', 'resolved'],
  default: 'new'
}

});

reportSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Report', reportSchema);
