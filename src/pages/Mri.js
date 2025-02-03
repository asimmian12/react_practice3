import React from 'react';

const MRI = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
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
    </div>
  );
};

export default MRI;



