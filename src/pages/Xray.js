import React from 'react';

const Xray = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">X-Ray Scans</h1>
        <p className="text-gray-700 mb-4 text-center">Here you can view your recent X-Ray reports and details.</p>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-xl">Chest X-Ray</h2>
            <p className="text-gray-600">Date: 2023-12-15</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Report</button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-xl">Abdominal X-Ray</h2>
            <p className="text-gray-600">Date: 2024-01-20</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Report</button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/profile" className="text-blue-500 hover:underline">Back to Profile</a>
        </div>
      </div>
    </div>
  );
};

export default Xray;
