import React from 'react';

const MRI = () => {
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

      {/* MRI Scan Details Section */}
      <section className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 my-8">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">MRI Scan Details</h1>
        <p className="text-gray-700 mb-4 text-center">Here you can find details about your MRI scans.</p>

        <div className="space-y-4">
          <div className="bg-white-50 p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-xl">Recent MRI Scan:</h2>
            <p className="text-gray-600">Date: 2024-12-15</p>
            <p className="text-gray-600">Status: Reviewed</p>
          </div>

          <div className="bg-white-50 p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-xl">Next Appointment:</h2>
            <p className="text-gray-600">Date: 2025-03-20</p>
            <p className="text-gray-600">Time: 10:00 AM</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button><a href="/profile" className="text-blue-500 hover:underline">Back to Profile</a></button>
        </div>
      </section>

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

export default MRI;
