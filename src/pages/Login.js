import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsLoggedIn }) {
  const [hospitalNumber, setHospitalNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Add isLoading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

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
    } finally {
      setIsLoading(false);  // End loading
    }
  };

  return (
    <div className="min-h-screen bg-white">
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

      <div className="min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Login</h1>
        {isLoading && <div className="loading-indicator">Loading...</div>}
        <h4 className="text-gray-600 text-base mb-4">Login to access the hospital portal</h4>
       
        <form className="max-w-sm mx-auto p-6" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="hospitalNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Hospital Number CHI
            </label>
            <input
              type="text"
              id="hospitalNumber"
              value={hospitalNumber}
              onChange={(e) => setHospitalNumber(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your hospital number"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Login
          </button>
        </form>

        {/* Contact Section */}
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

        {/* Footer */}
        <footer className="bg-blue-500 text-white p-6 text-center">
          <p>&copy; 2025 ASIM MIAN</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">LinkedIn</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Instagram</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Login;
