import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isNgoLoggedIn = !!localStorage.getItem('ngoToken');

  const handleLogout = () => {
    localStorage.removeItem('ngoToken');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo or App Name */}
        <Link to="/" className="text-xl font-bold">
          🌍 HydroAfrica
        </Link>

        {/* Nav Links */}
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">Home</Link>

          <Link to="/report" className="hover:underline">Report Water Issue</Link>
          <Link to="/register" className="hover:underline">Register NGO</Link>
          {isNgoLoggedIn && <Link to="/dashboard" className="hover:underline">Dashboard</Link>}
        </div>

        {/* Auth Button */}
        <div>
          {isNgoLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 font-semibold px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 font-semibold px-3 py-1 rounded hover:bg-gray-100"
            >
              NGO Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
