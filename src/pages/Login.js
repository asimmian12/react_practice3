import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsLoggedIn }) {
  const [hospitalNumber, setHospitalNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/login', {
        hospital_number: hospitalNumber,
        password: password,
      });
  
      if (response.status === 200) {
        const { user } = response.data;
  
        // Store the logged-in user's data in localStorage
        localStorage.setItem('user', JSON.stringify(user));
  
        // Update isLoggedIn state
        setIsLoggedIn(true);
  
        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };
  

  return (
    <div className="bg-gray-50 font-[sans-serif]">
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="max-w-md w-full">
        <a href="javascript:void(0)">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="w-40 mb-8 mx-auto block"
          />
        </a>
    <div className="p-8 rounded-2xl bg-white shadow">
      <h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <label className="text-gray-800 text-sm mb-2 block">Hospital Number
          <input
            type="text"
            value={hospitalNumber}
            onChange={(e) => setHospitalNumber(e.target.value)}
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            required
          />
        </label>
        <label className="text-gray-800 text-sm mb-2 block">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
            required
          />
        </label>
        {error && <div>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Login;
