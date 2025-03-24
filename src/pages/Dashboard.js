import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const contactInfo = [
  { title: 'EMERGENCY', details: '0141 201 1100' },
  { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK' },
  { title: 'EMAIL', details: 'info.qeht@nhs.net' },
  { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only' },
];

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve the user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="text-center">
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">Book an Appointment</button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">Book an MRI Scan</button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">Book an X-Ray</button>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="p-4">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 justify-center mt-6">
          {/* Account Management Card */}
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex justify-end px-4 pt-4">
              <button className="inline-block text-gray-500 hover:bg-gray-100 rounded-lg text-sm p-1.5">
                <span className="sr-only">Open dropdown</span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center pb-6">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={userData.hospital_account_img || './images/account2.png'}
                alt="User profile"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900">{userData.firstName} {userData.surname}</h5>
              <span className="text-sm text-gray-500">{userData.position}</span>
              <div className="flex mt-4">
                <Link
                  to="/account"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                >
                  View Account Details
                </Link>
              </div>
            </div>
          </div>

          {/* Games Card */}
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex justify-end px-4 pt-4">
              <button className="inline-block text-gray-500 hover:bg-gray-100 rounded-lg text-sm p-1.5">
                <span className="sr-only">Open dropdown</span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center pb-6">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                alt="Appointment"
                src='./images/account2.png'
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900">Appointment</h5>
              <span className="text-sm text-gray-500">Click here to view an appointment!</span>
              <div className="flex mt-4">
                <Link
                  to="/appointment"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                >
                  Go to Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Contact Section */}
     <section className="bg-white-100 p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-blue-400 text-white p-4 rounded-lg text-center">
              <h3 className="font-bold text-lg">{info.title}</h3>
              <p>{info.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-500 text-white p-6 text-center">
        <p>&copy; 2025 ASIM MIAN</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">LinkedIn</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Instagram</a>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
