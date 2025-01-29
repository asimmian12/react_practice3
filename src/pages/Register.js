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
    <div className="max-w-4xl max-sm:max-w-lg mx-auto font-[sans-serif] p-6">
      <div className="text-center mb-12 sm:mb-16">
        <a href="javascript:void(0)">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="w-48 inline-block"
          />
        </a>
        <h4 className="text-gray-600 text-base mt-6">Sign up to access the hospital portal</h4>
      </div>

      <form>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-600 text-sm mb-2 block">First Name</label>
            <input
              name="firstName"
              type="text"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm mb-2 block">Surname</label>
            <input
              name="surname"
              type="text"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </div>
          {/* <div>
            <label className="text-gray-600 text-sm mb-2 block">Date of Birth</label>
            <input
              name="dob"
              type="date"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter email"
              value={formData.dob}
              onChange={handleChange}
            />
          </div> */}
          <div>
            <label className="text-gray-600 text-sm mb-2 block">Hospital Number</label>
            <input
              name="hospital_number"
              type="text"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="EG: CHI25121900"
              value={formData.hospital_number}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm mb-2 block">Email</label>
            <input
              name="email"
              type="email"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm mb-2 block">Department</label>
            <select
              name="department_id"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              value={formData.department_id}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-gray-600 text-sm mb-2 block">Telephone No.</label>
            <input
              name="telephone_number"
              type="number"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter mobile number"
              value={formData.telephone_number}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm mb-2 block">Password</label>
            <input
              name="password"
              type="password"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-gray-600 text-sm mb-2 block">Confirm Password</label>
            <input
              name="confirm_password"
              type="password"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Confirm password"
              value={formData.confirm_password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:!mt-12 mt-6">
          <button
            type="button"
            className="mx-auto block py-3 px-6 text-sm tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
