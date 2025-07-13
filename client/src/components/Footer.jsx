const Footer = () => {
  return (
    <footer className="bg-white mt-10 pt-6 border-t shadow-inner">
      <h2 className="text-center text-lg font-semibold text-blue-700 mb-4">Hope Restored 💧</h2>
      <h3 className="text-center text-2xl font-bold mb-2">"Empowering communities through clean water reporting and NGO action across Africa."</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 pb-6">
        <img
          src="/images/Water02.jpg"
          alt="Smiling children"
          className="w-full h-48 object-cover rounded-md"
        />
        <img
          src="/images/Water01.jpg"
          alt="Clean water project"
          className="w-full h-48 object-cover rounded-md"
        />
        <img
          src="/images/Water03.jpg"
          alt="Water celebration"
          className="w-full h-48 object-cover rounded-md"
        />
      </div>

      <p className="text-center text-gray-600 text-sm py-4">
        &copy; {new Date().getFullYear()} HydroAfrica. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
