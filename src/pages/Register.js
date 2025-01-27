import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const registerUser = async (userData, navigate) => {
  try {
    const response = await axios.post('http://localhost:5000/register', userData);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // Store the JWT
    }

    // Navigate to the login page after successful registration
    navigate('/login');
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    alert('Error during registration. Please try again.');
  }
};

function Register() {
  const navigate = useNavigate(); // Use useNavigate here

  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    hospital_number: '',
    email: '',
    department_id: '',
    telephone_number: '',
    password: '',
    confirm_password: '',
  });

  const [departments, setDepartments] = useState([]); // State for department list

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // Fetch department details from the backend
        const response = await axios.get('http://localhost:5000/departments');
        setDepartments(response.data); // Set departments state
      } catch (error) {
        console.error('Error fetching departments:', error.response ? error.response.data : error.message);
        alert('Error fetching departments. Check console for details.');
      }
    };

    fetchDepartments();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const { password, confirm_password, ...userData } = formData;

    // Validate all fields are filled
    if (Object.values(formData).some((value) => !value)) {
      alert('Please fill in all fields.');
      return;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate passwords match
    if (password !== confirm_password) {
      alert('Passwords do not match!');
      return;
    }

    // Include the password in the payload
    userData.password = password;

    // Call the registerUser function and pass navigate as argument
    await registerUser(userData, navigate);
  };

  return (
   

<form className="max-w-sm mx-auto">
  <div className="mb-5">
    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hospital Number</label>
    <input type="email" id="email" value={formData.hospital_number} onChange={handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="name@flowbite.com" required />
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
    <input type="password" id="password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required value={formData.password} onChange={handleChange}/>
  </div>
  <div className="mb-5">
    <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
    <input type="password" id="confirm-password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" value={formData.confirm_password} onChange={handleChange} required/>
  </div>

  <div className="mb-5">
    <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Bitrth</label>
    <input type="date" id="date" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" value={formData.date} onChange={handleChange} required/>
  </div>


  <div className="mb-5">
    <label for="department_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
       <select
       name="department_id" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" value={formData.department_id} onChange={handleChange}>
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>Department</label>
    <input type="department_id" id="department_id" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
  </div>
  <div className="flex items-start mb-5">
    <div className="flex items-center h-5">
      <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label for="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Register new account</button>
       
      </form>
  

)}


export default Register;
