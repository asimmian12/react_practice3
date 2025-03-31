import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isHovering, setIsHovering] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Configure axios base URL
  axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.withCredentials = true;

  // Contact information
  const contactInfo = [
    { 
      title: 'EMERGENCY', 
      details: '0141 201 1100', 
      icon: <Phone className="text-yellow-300 mx-auto" size={24} />, 
      action: 'tel' 
    },
    { 
      title: 'LOCATION', 
      details: '1345 Govan Road, G51 4TF Glasgow UK', 
      icon: <MapPin className="text-yellow-300 mx-auto" size={24} />, 
      action: 'map' 
    },
    { 
      title: 'EMAIL', 
      details: 'info.qeht@nhs.net', 
      icon: <Mail className="text-yellow-300 mx-auto" size={24} />, 
      action: 'mail' 
    },
    { 
      title: 'WORKING HOURS', 
      details: 'Mon-Sat 09:00-20:00, Sunday Emergency only', 
      icon: <Clock className="text-yellow-300 mx-auto" size={24} />, 
      action: null 
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          navigate('/login');
          return;
        }

        const user = JSON.parse(storedUser);
        setUserData(user);

        // Fetch departments
        const deptResponse = await axios.get('/api/departments');
        setDepartments(deptResponse.data);

        // Fetch appointments
        const appointmentsResponse = await axios.get(`/api/appointments?user_id=${user.id}`);
        setAppointments(appointmentsResponse.data);

        setIsLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (!userData || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-blue-800">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-cover bg-center h-72 md:h-96" 
        style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-60"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center px-4">
            <p className="text-5xl font-bold text-center text-white-700 mb-8">
              Welcome Back {userData.firstName}, {userData.surname}!
            </p>
            <p className="text-5xl font-bold text-center text-white-700 mb-8">
              Welcome to Clyde Children's Hospital Dashboard
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Banner Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {[
              { number: appointments.length, label: 'Your Appointments' },
              { number: '95%', label: 'Patient Satisfaction' },
              { number: '24/7', label: 'Emergency Care' },
              { number: departments.length, label: 'Specialties Available' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* User Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img 
              src={userData.hospital_account_img || './images/account2.png'} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
            />
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-blue-800">{userData.firstName} {userData.surname}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-gray-600">Member Since</p>
                  <p className="font-semibold">{new Date(userData.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-semibold">{userData.telephone_number}</p>
                </div>
                <div>
                  <p className="text-gray-600">Primary Department</p>
                  <p className="font-semibold">{userData.name || 'None'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 justify-center mt-6"
        >
          {/* Account Management Card */}
          <div 
            className="w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1"
            onMouseEnter={() => setIsHovering('account')}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className="flex flex-col items-center p-6">
              <div className="relative">
                <img
                  className={`w-24 h-24 mb-3 rounded-full shadow-lg transition-transform duration-300 ${isHovering === 'account' ? 'scale-110' : ''}`}
                  src={userData.hospital_account_img || './images/account2.png'}
                  alt="User profile"
                />
                {isHovering === 'account' && (
                  <div className="absolute inset-0 rounded-full bg-blue-500 bg-opacity-20 animate-ping"></div>
                )}
              </div>
              <h5 className="mb-1 text-xl font-medium text-gray-900">Account Management</h5>
              <span className="text-sm text-gray-500">View and update your account details</span>
              <div className="flex mt-4">
                <Link
                  to="/account"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Go to Account
                </Link>
              </div>
            </div>
          </div>

          {/* Appointment Card */}
          <div 
            className="w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1"
            onMouseEnter={() => setIsHovering('appointment')}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className="flex flex-col items-center p-6">
              <div className="relative">
                <img
                  className={`w-24 h-24 mb-3 rounded-full shadow-lg transition-transform duration-300 ${isHovering === 'appointment' ? 'scale-110' : ''}`}
                  alt="Appointment"
                  src='./images/account2.png'
                />
                {isHovering === 'appointment' && (
                  <div className="absolute inset-0 rounded-full bg-blue-500 bg-opacity-20 animate-ping"></div>
                )}
              </div>
              <h5 className="mb-1 text-xl font-medium text-gray-900">Appointments</h5>
              <span className="text-sm text-gray-500">Manage your medical appointments</span>
              <div className="flex mt-4">
                <Link
                  to="/appointment"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Go to Appointments
                </Link>
              </div>
            </div>
          </div>
        </motion.div>            
      </div>

      {/* Contact Information Section */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (info.action === 'tel') window.location.href = `tel:${info.details.replace(/\s/g, '')}`;
                  if (info.action === 'mail') window.location.href = `mailto:${info.details}`;
                  if (info.action === 'map') window.open(`https://maps.google.com?q=${encodeURIComponent(info.details)}`, '_blank');
                }}
                className={`bg-blue-800 rounded-xl p-6 text-center cursor-pointer ${info.action ? 'hover:bg-blue-700' : ''}`}
              >
                <div className="mb-3">
                  {info.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{info.title}</h3>
                <p>{info.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Clyde Children's Hospital</h3>
              <p className="text-blue-300">Making hospital visits easier for kids</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-300 transition">Privacy Policy</a>
              <a href="#" className="hover:text-yellow-300 transition">Terms of Service</a>
              <a href="#" className="hover:text-yellow-300 transition">Accessibility</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-blue-800 text-center text-blue-300">
            <p>&copy; {new Date().getFullYear()} ASIM MIAN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;