import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import navigate
import axios from 'axios';

const NgoLogin = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ✅ hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://hydroafrica.onrender.com/api/reports', form);
      localStorage.setItem('ngoToken', res.data.token);
      onLogin(res.data.ngo); // parent callback
      navigate('/'); // ✅ redirect to homepage
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded mt-6">
      <h2 className="text-xl font-bold mb-4">NGO Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className="w-full p-2 border rounded" />
        <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="Password" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Login</button>
      </form>
    </div>
  );
};

export default NgoLogin;
