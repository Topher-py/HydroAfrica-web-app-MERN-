import { useState } from 'react';
import axios from 'axios';

const NgoRegister = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', organization: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('https://hydroafrica.onrender.com/api/reports', form);
      setSuccess(true);
      setForm({ name: '', email: '', password: '', organization: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded mt-6">
      <h2 className="text-xl font-bold mb-4">NGO Registration</h2>
      {success && <p className="text-green-600">✅ Registered successfully!</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" className="w-full p-2 border rounded" />
        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className="w-full p-2 border rounded" />
        <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="Password" className="w-full p-2 border rounded" />
        <input name="organization" value={form.organization} onChange={handleChange} placeholder="Organization Name" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
};

export default NgoRegister;
