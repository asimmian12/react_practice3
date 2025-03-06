import React, { useEffect, useState } from 'react';

const contactInfo = [
  { title: 'EMERGENCY', details: '0141 201 1100' },
  { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK' },
  { title: 'EMAIL', details: 'info.qeht@nhs.net' },
  { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only' },
];

const Account = () => {
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

      {/* Account Management Section */}
      <section className="p-4">
        <section className="text-center my-8">
          <h1 className="text-2xl font-bold text-blue-800">Manage Your Account</h1>
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <img
                src={userData.hospital_account_img || './images/account2.png'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
              />
            </div>

            {/* Account Details */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-lg">Hospital Number:</p>
                <p className="font-semibold text-gray-900 text-lg">{userData.hospital_number}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-lg">Email:</p>
                <p className="font-semibold text-gray-900 text-lg">{userData.email}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-lg">Department:</p>
                <p className="font-semibold text-gray-900 text-lg">{userData.department_name}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-lg">Phone:</p>
                <p className="font-semibold text-gray-900 text-lg">{userData.telephone_number}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-lg">DOB:</p>
                <p className="font-semibold text-gray-900 text-lg">{userData.dob}</p>
              </div>

              {/* Edit Button */}
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-6">
                Edit Profile
              </button>
            </div>
          </div>
        </section>
      </section>

      {/* Contact Section */}
      <section className="bg-white p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-blue-400 text-white p-4 rounded-lg text-center shadow-md transform transition-all hover:scale-95">
              <h3 className="font-bold text-lg">{info.title}</h3>
              <p className="text-sm">{info.details}</p>
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
};

export default Account;
