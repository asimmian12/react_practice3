import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsLoggedIn }) {
  const [hospitalNumber, setHospitalNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 // Handle input changes
 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

// Handle form submission
const handleSubmit = async () => {
  const { name, password } = formData;

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
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hospital Number</label>
        <input type="email" id="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="name@flowbite.com" value={hospitalNumber} onChange={(e) => setHospitalNumber(e.target.value)} required />
      </div>
      <div className="mb-5">
        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name: </label>
        <input type="name" id="name" value={formData.name} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="name@flowbite.com" required />
      </div>
      <div className="mb-5">
        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" id="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="name@flowbite.com" required value={formData.email} onChange={handleChange}/>
      </div>
      <div className="mb-5">
        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input type="password" id="password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" value={password} onChange={(e) => setPassword(e.target.value)}required />
      </div>
   
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Register new account</button>      
 
      </form>  
  )};
    
    
 export default Login;
    


