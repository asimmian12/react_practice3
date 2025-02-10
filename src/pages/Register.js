import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const registerUser = async (userData, navigate) => {
  try {
    const response = await axios.post('http://localhost:5000/register', userData);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // Store the JWT
    }

    navigate('/login'); // Navigate to the login page after successful registration
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    alert('Error during registration. Please try again.');
  }
};

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    hospital_number: '',
    email: '',
    department_id: '',
    telephone_number: '',
    password: '',
    confirm_password: '',
    company: '',
    url: '',
    dob: '',
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error.response ? error.response.data : error.message);
        alert('Error fetching departments. Check console for details.');
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirm_password, ...userData } = formData;

    if (Object.values(formData).some((value) => !value)) {
      alert('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password !== confirm_password) {
      alert('Passwords do not match!');
      return;
    }

    userData.password = password;

    await registerUser(userData, navigate);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <h4 className="text-gray-600 text-base mb-4">Register to access the hospital portal</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
          <input type="text" id="first_name" name="firstName" placeholder="John" required value={formData.firstName} onChange={handleChange} className="input" />
        </div>
        <div>
          <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
          <input type="text" id="last_name" name="surname" placeholder="Doe" required value={formData.surname} onChange={handleChange} className="input" />
        </div>
        <div>
          <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900">Company</label>
          <input type="text" id="company" name="company" placeholder="Flowbite" required value={formData.company} onChange={handleChange} className="input" />
        </div>
        <div>
          <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900">Website URL</label>
          <input type="url" id="website" name="url" placeholder="www.google.com" required value={formData.url} onChange={handleChange} className="input" />
        </div>
        <div>
          <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900">Hospital visitors</label>
          <input type="number" id="visitors" name="hospital_number" placeholder="5" required value={formData.hospital_number} onChange={handleChange} className="input" />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email address</label>
          <input type="email" id="email" name="email" placeholder="example@domain.com" required value={formData.email} onChange={handleChange} className="input" />
        </div>
        <div>
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date of Birth</label>
          <input type="date" id="date" name="dob" required value={formData.dob} onChange={handleChange} className="input" />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
          <input type="tel" id="phone" name="telephone_number" placeholder="0141 583 6088" required value={formData.telephone_number} onChange={handleChange} className="input" />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">Department</label>
          <select name="department_id" required value={formData.department_id} onChange={handleChange} className="input">
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>{department.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input type="password" id="password" name="password" placeholder="•••••••••" required value={formData.password} onChange={handleChange} className="input" />
        </div>
        <div>
          <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
          <input type="password" id="confirm_password" name="confirm_password" placeholder="•••••••••" required value={formData.confirm_password} onChange={handleChange} className="input" />
        </div>
      </div>

      <div className="flex items-center mt-4">
        <input id="terms" type="checkbox" required className="mr-2" />
        <label htmlFor="terms" className="text-sm text-gray-900">I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>.</label>
      </div>

      <button type="submit" className="btn-primary mt-4 w-full">Submit</button>

      <section className="p-8 bg-white mt-6">
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

      <footer className="bg-blue-500 text-white p-6 text-center mt-6">
        <p>&copy; 2025 ASIM MIAN</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">LinkedIn</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Instagram</a>
        </div>
      </footer>
    </form>
  );
}

export default Register;
