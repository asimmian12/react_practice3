import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: 'url(/assets/images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="text-center">
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">
              <a href="/appointment">Book an Appointment</a>
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">
              <a href="/Mri">Book an MRI Scan</a>
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">
              <a href="/Xray">Book an X-Ray</a>
            </button>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">{user.firstName} {user.surname}</h2>
          <p className="text-gray-500">Account Created: {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'No data available'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/xray">
            <div className="bg-blue-500 text-white shadow-md rounded-2xl p-6 hover:bg-blue-600 transition duration-300 cursor-pointer">
              <h3 className="text-xl font-semibold">X-Ray</h3>
              <p className="text-sm">View X-Ray Reports</p>
            </div>
          </Link>

          <Link to="/mri">
            <div className="bg-green-500 text-white shadow-md rounded-2xl p-6 hover:bg-green-600 transition duration-300 cursor-pointer">
              <h3 className="text-xl font-semibold">MRI</h3>
              <p className="text-sm">View MRI Reports</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Contact Information Section */}
      <section className="bg-white p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          {[ 
            { title: 'EMERGENCY', detail: '0141 201 1100' },
            { title: 'LOCATION', detail: '1345 Govan Road, G51 4TF Glasgow UK' },
            { title: 'EMAIL', detail: 'info.qeht@nhs.net' },
            { title: 'WORKING HOURS', detail: 'Mon-Sat 09:00-20:00, Sunday Emergency only' }
          ].map((info, index) => (
            <div key={index} className="bg-blue-400 text-white p-4 rounded-lg text-center shadow-md">
              <h3 className="font-bold text-lg">{info.title}</h3>
              <p>{info.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-500 text-white p-6 text-center">
        <p>&copy; 2025 ASIM MIAN</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">
            LinkedIn
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
