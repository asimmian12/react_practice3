import departmentData from './departments.json';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Clock, AlertCircle, X } from 'lucide-react';
import axios from 'axios';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('profile');
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [departmentVideos, setDepartmentVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
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
        setFormData(user);

        // Fetch departments
        const deptResponse = await axios.get('/api/departments');
        setDepartments(deptResponse.data);

        // Fetch doctors
        const doctorsResponse = await axios.get('/api/doctors');
        setDoctors(doctorsResponse.data);

        // Fetch appointments
        const appointmentsResponse = await axios.get(`/api/appointments?user_id=${user.id}`);
        const appointmentsData = appointmentsResponse.data;

        // Filter out appointments with invalid dates and format dates
        const validAppointments = appointmentsData
          .filter(appt => !isNaN(new Date(appt.date).getTime()))
          .map(appt => ({
            ...appt,
            date: new Date(appt.date).toISOString().split('T')[0]
          }));

        setAppointments(validAppointments);

        // Load department videos
        setLoadingVideos(true);
        const departmentIds = [...new Set(validAppointments.map(appt => appt.department_id))];
        
        const relevantDepartments = departmentData.filter(dept => 
          departmentIds.includes(dept.id)
        );
        
        const cleanedData = relevantDepartments.map(dept => ({
          ...dept,
          videos: dept.videos?.map(video => {
            if (video.includes('youtube.com/watch?v=')) {
              return video.split('v=')[1].split('&')[0];
            }
            return video.includes('?') ? video.split('?')[0] : video;
          })
        }));
        
        setDepartmentVideos(cleanedData);
        setLoadingVideos(false);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
        setLoadingVideos(false);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(formData));
    setUserData(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const cancelAppointment = async (id) => {
    try {
      await axios.patch(`/api/appointments/${id}`, { status: 'cancelled' });
      
      const updatedAppointments = appointments.map(appt => 
        appt.id === id ? { ...appt, status: 'cancelled' } : appt
      );
      setAppointments(updatedAppointments);
      
      const remainingDeptIds = [...new Set(updatedAppointments.filter(a => a.status !== 'cancelled').map(appt => appt.department_id))];
      const updatedVideos = departmentData.filter(dept => 
        remainingDeptIds.includes(dept.id)
      ).map(dept => ({
        ...dept,
        videos: dept.videos?.map(video => {
          if (video.includes('youtube.com/watch?v=')) {
            return video.split('v=')[1].split('&')[0];
          }
          return video.includes('?') ? video.split('?')[0] : video;
        })
      }));
      
      setDepartmentVideos(updatedVideos);
      alert('Appointment cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setError('Failed to cancel appointment. Please try again.');
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-blue-800">Loading your account information...</p>
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
              Welcome to Clyde Children's Hospital Account Portal
            </p>
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
        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded flex items-start"
          >
            <AlertCircle className="mr-2 flex-shrink-0" />
            <div>
              <p className="font-bold">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Profile Card with Tabs */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 font-medium ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-6 py-4 font-medium ${activeTab === 'appointments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
            >
              Appointments
            </button>
            <button
              onClick={() => setActiveTab('medical')}
              className={`px-6 py-4 font-medium ${activeTab === 'medical' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
            >
              Medical Info
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {activeTab === 'profile' && (
              <div>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Left Column - Profile Picture */}
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <img
                          src={formData.hospital_account_img || './images/account2.png'}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 mb-4"
                        />
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Change Photo
                        </button>
                      </div>
                      
                      {/* Right Column - Form Fields */}
                      <div className="flex-grow space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 mb-1">First Name</label>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName || ''}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-1">Last Name</label>
                            <input
                              type="text"
                              name="surname"
                              value={formData.surname || ''}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 mb-1">Phone Number</label>
                            <input
                              type="tel"
                              name="telephone_number"
                              value={formData.telephone_number || ''}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-1">Date of Birth</label>
                            <input
                              type="date"
                              name="dob"
                              value={formData.dob || ''}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Column - Profile Picture */}
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <img
                        src={userData.hospital_account_img || './images/account2.png'}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 mb-4"
                      />
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                      >
                        <span>✏️</span> Edit Profile
                      </button>
                    </div>
                    
                    {/* Right Column - Profile Details */}
                    <div className="flex-grow">
                      <h2 className="text-2xl font-bold text-blue-800 mb-6">{userData.firstName} {userData.surname}</h2>
                      
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Hospital Number:</span>
                          <span className="font-semibold text-gray-800">{userData.hospital_number}</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Email:</span>
                          <span className="font-semibold text-gray-800">{userData.email}</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Phone:</span>
                          <span className="font-semibold text-gray-800">{userData.telephone_number}</span>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between py-3 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Date of Birth:</span>
                          <span className="font-semibold text-gray-800">{userData.dob}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'medical' && (
              <div>
                <h2 className="text-2xl font-bold text-blue-800 mb-6">Medical Information</h2>
                
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-lg text-blue-700 mb-3">Medical History</h3>
                  <p className="text-gray-700">
                    {userData.medical_history || 'No medical history recorded yet.'}
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-bold text-lg text-blue-700 mb-3">Current Medications</h3>
                  <p className="text-gray-700">
                    {userData.medications || 'No current medications recorded.'}
                  </p>
                </div>
                
                <button 
                  onClick={() => alert('Medical information update functionality coming soon!')}
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Update Medical Info
                </button>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div>
                <h2 className="text-2xl font-bold text-blue-800 mb-6">My Appointments</h2>
                
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-blue-800">Loading your appointments...</p>
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map(appointment => (
                      <motion.div 
                        key={appointment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">
                              {doctors.find(d => d.id === appointment.doctor_id) ? 
                                `${doctors.find(d => d.id === appointment.doctor_id).title || 'Dr.'} 
                                 ${doctors.find(d => d.id === appointment.doctor_id).firstName} 
                                 ${doctors.find(d => d.id === appointment.doctor_id).lastName}` : 
                                'Doctor'}
                            </h3>
                            <p className="text-gray-600">{appointment.reason || 'No reason provided'}</p>
                            <p className="text-blue-600 mt-1">
                              {appointment.date} at {appointment.time}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                              {departments.find(d => d.id === appointment.department_id)?.name || 'Department'}
                            </p>
                            {appointment.notes && (
                              <p className="text-gray-500 text-sm mt-1">Notes: {appointment.notes}</p>
                            )}
                            <p className={`mt-2 text-sm font-medium ${
                              appointment.status === 'booked' ? 'text-blue-600' : 
                              appointment.status === 'completed' ? 'text-green-600' :
                              appointment.status === 'cancelled' ? 'text-red-600' : 
                              'text-yellow-600'
                            }`}>
                              Status: {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </p>
                          </div>
                          {appointment.status === 'booked' && (
                            <button
                              onClick={() => cancelAppointment(appointment.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">You don't have any upcoming appointments.</p>
                    <button
                      onClick={() => navigate('/appointment')}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Book an Appointment
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Department Videos Section */}
      {appointments.length > 0 && (
        <section className="py-12 bg-white-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
              {departmentVideos.length > 0 
                ? 'Educational Videos for Your Appointments' 
                : 'No Videos Available for Your Appointments'}
            </h2>     
            {loadingVideos ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-blue-800">Loading educational videos...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
                <p>{error}</p>
              </div>
            ) : (
              departmentVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {departmentVideos.map((department) => (
                    <motion.div 
                      key={department.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-blue-900 mb-2">{department.name}</h3>
                        <p className="text-white-600 mb-4">{department.details}</p>
                        
                        <div className="flex items-center mb-3">
                          <img 
                            src={`./images/${department.doctor_img}`} 
                            alt={department.doctor}
                            className="w-10 h-10 rounded-full object-cover mr-2"
                          />
                          <span className="text-sm">{department.doctor}</span>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-bold text-white-800">Educational Videos</h4>
                          {department.videos?.map((videoId, index) => (
                            <div key={index} className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden bg-gray-100">
                              <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={`${department.name} Video ${index + 1}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">No Resources Found</h3>
                    <p className="text-gray-600 mb-4">
                      We couldn't find any department resources matching your appointments.
                    </p>
                    <button 
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Browse Departments
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}

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
};

export default Account;