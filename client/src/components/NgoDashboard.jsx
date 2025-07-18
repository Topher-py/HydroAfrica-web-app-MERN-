import { useEffect, useState } from 'react';
import axios from 'axios';

const NgoDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const token = localStorage.getItem('ngoToken');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('https://hydroafrica.onrender.com/api/reports');
        setReports(res.data);
        setLoading(false);
      } catch (err) {
        console.error('❌ Failed to fetch reports:', err);
      }
    };
    fetchReports();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(
        `https://hydroafrica.onrender.com/api/reports/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReports((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error('❌ Status update failed:', err);
    }
  };

  const handleVerify = async (id) => {
    try {
      await axios.patch(
        `https://hydroafrica.onrender.com/api/reports/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReports(prev =>
        prev.map(r => r._id === id ? { ...r, verified: true } : r)
      );
    } catch (err) {
      console.error("❌ Verification failed:", err);
    }
  };

  const filteredReports = reports.filter((r) =>
    filter === 'all' ? true : r.status === filter
  );

  if (loading) return <p className="text-center mt-6">🔄 Loading reports...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">NGO Dashboard: Manage Reports</h2>

      {/* Filter selector */}
      <div className="mb-4">
        <label>Filter by status: </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-2 py-1 ml-2"
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {filteredReports.map((report) => (
        <div key={report._id} className="bg-white p-4 mb-4 shadow rounded">
          <p className="font-semibold">📍 Location: {report.location.coordinates.join(', ')}</p>
          <p className="text-sm text-gray-700 mt-1">📝 {report.description}</p>

          {report.image && (
            <img
              src={report.image}
              alt="report"
              className="w-48 h-auto mt-2 rounded"
            />
          )}

          <div className="mt-2">
            <label>Status: </label>
            <select
              value={report.status}
              onChange={(e) => handleStatusChange(report._id, e.target.value)}
              className="border rounded px-2 py-1 ml-2"
            >
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {!report.verified && (
            <button
              onClick={() => handleVerify(report._id)}
              className="bg-blue-600 text-white px-2 py-1 rounded mt-2"
            >
              ✅ Verify
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NgoDashboard;
