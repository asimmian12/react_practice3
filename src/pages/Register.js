import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaUserAlt, FaLock, FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaSpinner, FaIdCard, FaBirthdayCake, FaPhoneAlt, FaBuilding } from 'react-icons/fa';
import { motion } from 'framer-motion';

const registerUser = async (userData, navigate, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await axios.post('http://localhost:5000/register', userData);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    // Success animation before redirect
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/login');
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    document.getElementById('registerForm').classList.add('animate-shake');
    setTimeout(() => {
      document.getElementById('registerForm').classList.remove('animate-shake');
    }, 500);
    alert(error.response?.data?.message || 'Error during registration. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    hospital_number: '',
    email: '',
    department_id: '',
    telephone_number: '',
    password: '',
    confirm_password: '',
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
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Calculate password strength when password changes
    if (name === 'password') {
      let strength = 0;
      if (value.length > 0) strength++;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-blue-500';
      case 5: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
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
    await registerUser(userData, navigate, setIsLoading);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Animation */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-cover bg-center h-72" 
        style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-60"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 m-2 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md"
            >
              <a href="/appointment">Book an Appointment</a>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 m-2 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md"
            >
              <a href="/Mri">Book an MRI Scan</a>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 m-2 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md"
            >
              <a href="/Xray">Book an X-Ray</a>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Register Form */}
      <div className="min-h-screen bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-md mx-auto px-4 py-8"
        >
          <motion.h1 
            whileHover={{ scale: 1.02 }}
            className="text-3xl font-bold text-center text-blue-700 mb-6"
          >
            Register
          </motion.h1>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <FaSpinner className="animate-spin text-blue-600 text-4xl mx-auto mb-4" />
                <p className="text-lg">Creating your account...</p>
              </div>
            </motion.div>
          )}

          <motion.h4 
            whileHover={{ scale: 1.01 }}
            className="text-gray-600 text-base mb-6 text-center"
          >
            Create an account to access the hospital portal
          </motion.h4>
         
          <motion.form 
            id="registerForm"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUserAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    placeholder="First name"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-700">Surname</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUserAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    placeholder="Surname"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="hospital_number" className="block mb-2 text-sm font-medium text-gray-700">Hospital Number CHI</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="hospital_number"
                  name="hospital_number"
                  value={formData.hospital_number}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Hospital number"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Email address"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBirthdayCake className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="telephone_number" className="block mb-2 text-sm font-medium text-gray-700">Telephone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhoneAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="telephone_number"
                    name="telephone_number"
                    value={formData.telephone_number}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    placeholder="Telephone number"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="department_id" className="block mb-2 text-sm font-medium text-gray-700">Department</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="text-gray-400" />
                </div>
                <select
                  id="department_id"
                  name="department_id"
                  value={formData.department_id}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 p-2.5"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`} 
                      style={{ width: `${passwordStrength * 20}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 text-gray-500">
                    Password strength: {['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'][passwordStrength - 1] || ''}
                  </p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 p-2.5"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isLoading ? 'opacity-75' : ''}`}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </motion.button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  href="/login" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Login here
                </motion.a>
              </p>
            </div>
          </motion.form>
        </motion.div>

        {/* Contact Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-8 bg-white"
        >
          <motion.h2 
            whileHover={{ scale: 1.02 }}
            className="text-2xl font-bold text-center text-blue-800 mb-6"
          >
            Contact
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'EMERGENCY', detail: '0141 201 1100', icon: <FaPhone />, action: 'tel' },
              { title: 'LOCATION', detail: '1345 Govan Road, G51 4TF Glasgow UK', icon: <FaMapMarkerAlt />, action: 'map' },
              { title: 'EMAIL', detail: 'info.qeht@nhs.net', icon: <FaEnvelope />, action: 'mail' },
              { title: 'WORKING HOURS', detail: 'Mon-Sat 09:00-20:00, Sunday Emergency only', icon: <FaClock />, action: null }
            ].map((info, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (info.action === 'tel') window.location.href = `tel:${info.detail.replace(/\s/g, '')}`;
                  if (info.action === 'mail') window.location.href = `mailto:${info.detail}`;
                  if (info.action === 'map') window.open(`https://maps.google.com?q=${encodeURIComponent(info.detail)}`, '_blank');
                }}
                className={`bg-blue-400 text-white p-4 rounded-lg text-center cursor-pointer ${info.action ? 'hover:bg-blue-500' : ''}`}
              >
                <div className="text-2xl mb-2">{info.icon}</div>
                <h3 className="font-bold">{info.title}</h3>
                <p>{info.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-blue-500 text-white p-6 text-center"
        >
          <p>&copy; 2025 ASIM MIAN</p>
          <div className="flex justify-center gap-4 mt-4">
            <motion.a
              whileHover={{ y: -3 }}
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100 transition"
            >
              LinkedIn
            </motion.a>
            <motion.a
              whileHover={{ y: -3 }}
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100 transition"
            >
              Facebook
            </motion.a>
            <motion.a
              whileHover={{ y: -3 }}
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100 transition"
            >
              Instagram
            </motion.a>
          </div>
        </motion.footer>
      </div>

      {/* Add CSS for shake animation */}
      <style jsx>{`
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}

export default Register;