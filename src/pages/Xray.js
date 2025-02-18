import React from 'react';

const Xray = () => {
  return (
    <section className="p-4 bg-white-100 min-h-screen">
      <section className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">X-Ray Scans</h1>
        <p className="text-gray-700 mb-4 text-center">Here you can view your recent X-Ray reports and details.</p>

        <div className="space-y-4">
          <div className="bg-white-50 p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-xl">Chest X-Ray</h2>
            <p className="text-gray-600">Date: 2023-12-15</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Report</button>
          </div>

          <div className="bg-white-50 p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-xl">Abdominal X-Ray</h2>
            <p className="text-gray-600">Date: 2024-01-20</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Report</button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/profile" className="text-blue-500 hover:underline">Back to Profile</a>
        </div>
    </section>

  
  <section className="p-8 bg-white">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="flex justify-center space-x-6 mt-4">
          {[
            { title: 'EMERGENCY', detail: '0141 201 1100' },
            { title: 'LOCATION', detail: '1345 Govan Road, G51 4TF Glasgow UK' },
            { title: 'EMAIL', detail: 'info.qeht@nhs.net' },
            { title: 'WORKING HOURS', detail: 'Mon-Sat 09:00-20:00, Sunday Emergency only' }
          ].map((info, index) => (
            <div key={index} className="bg-blue-400 text-white p-4 rounded-md w-48 text-center">
              <h3 className="font-bold">{info.title}</h3>
              <p>{info.detail}</p>
            </div>
          ))}
        </div>
      </section>
      
      <footer className="bg-blue-500 text-white p-6 text-center">
        <p>&copy; 2025 ASIM MIAN</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">LinkedIn</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Instagram</a>
        </div>
      </footer>
    </section>
  );
};

export default Xray;
