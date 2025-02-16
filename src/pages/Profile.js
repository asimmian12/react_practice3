import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/1') 
      .then(response => {
        if (response.data) {
          const { name, created_at, last_active } = response.data;
          setUser({
            name: name || 'Unknown User',
            created_at: created_at || null,
            last_active: last_active || null
          });
        }
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">{user.name}</h2>
        <p className="text-gray-500">Account Created: {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'No data available'}</p>
        <p className="text-gray-500">Last Active: {user.last_active ? new Date(user.last_active).toLocaleString() : 'No data available'}</p>
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
  );
};

export default Profile;
