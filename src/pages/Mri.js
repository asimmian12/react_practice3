import React from 'react';

const MRI = () => {
  return (
    <div>
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">MRI Scan Details</h1>
          <p className="text-gray-700">Here you can find details about your MRI scans.</p>

          <div className="mt-6">
            <div className="border-t border-gray-300 py-4">
              <h2 className="font-semibold text-gray-800">Recent MRI Scan:</h2>
              <p className="text-gray-600">Date: 2024-12-15</p>
              <p className="text-gray-600">Status: Reviewed</p>
            </div>

            <div className="border-t border-gray-300 py-4">
              <h2 className="font-semibold text-gray-800">Next Appointment:</h2>
              <p className="text-gray-600">Date: 2025-03-20</p>
              <p className="text-gray-600">Time: 10:00 AM</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a href="/profile" className="text-blue-500 hover:underline">Back to Profile</a>
          </div>
        </div>
      </section>

      <section className="p-8 bg-white">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="flex justify-center space-x-6 mt-4 flex-wrap">
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
    </div>
  );
};

export default MRI;
