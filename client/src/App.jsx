import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MapView from './components/mapView';
import ReportForm from './components/ReportForm';
import NgoRegister from './components/NgoRegister';
import NgoLogin from './components/NgoLogin';
import NgoDashboard from './components/NgoDashboard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/register" element={<NgoRegister />} />
        <Route path="/login" element={<NgoLogin onLogin={(ngo) => console.log('🧑‍💼 NGO Logged In:', ngo)} />} />
        <Route path="/dashboard" element={<NgoDashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
