import { useState, useEffect } from 'react';
import axios from 'axios';

const ReportForm = () => {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [success, setSuccess] = useState(false);

  // Get user GPS location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          type: 'Point',
          coordinates: [pos.coords.longitude, pos.coords.latitude]
        });
      },
      (err) => console.warn('GPS not allowed:', err)
    );
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!location) {
    alert('📍 Location not available. Please enable GPS.');
    return;
  }

  const formData = new FormData();
  formData.append('description', description);
  formData.append('location', JSON.stringify(location));
  if (photo) {
    formData.append('photo', photo);
  }

  try {
    await axios.post('http://localhost:5000/api/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setSuccess(true);
    setDescription('');
    setPhoto(null);
  } catch (err) {
    alert('❌ Failed to submit report: ' + err.message);
  }
};


  return (
    <div className="bg-white p-6 shadow rounded max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4">Report a Water Issue</h2>
      {success && <p className="text-green-600 mb-3">✅ Report submitted!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          required
          className="w-full p-2 border rounded"
          placeholder="Describe the water issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="w-full"
          placeholder='attach a photo'
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
// This component allows users to submit reports about water issues, including a description and an optional photo URL.