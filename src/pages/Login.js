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
    <div>
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={hospitalNumber}
          onChange={(e) => setHospitalNumber(e.target.value)}
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
          placeholder="Name"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
          placeholder="example@domain.com"
          required
        />
      </div>
      {error && <div>{error}</div>}
      <button type="submit" className="text-white bg-blue-700 rounded-lg px-5 py-2.5">
      Login
      </button>
    </form>
  </div>
   

  );


}

export default Login;
