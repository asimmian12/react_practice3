import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const contactInfo = [
  { title: 'EMERGENCY', details: '0141 201 1100', icon: '🚑' },
  { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK', icon: '📍' },
  { title: 'EMAIL', details: 'info.qeht@nhs.net', icon: '✉️' },
  { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only', icon: '⏰' },
];

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('profile');
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(user);
      setFormData(user);
      
      // Simulate fetching appointments
      setTimeout(() => {
        setAppointments([
          { id: 1, date: '2025-04-15', time: '10:00 AM', doctor: 'Dr. Smith', type: 'General Checkup' },
          { id: 2, date: '2025-04-20', time: '02:30 PM', doctor: 'Dr. Johnson', type: 'Follow-up' }
        ]);
        setIsLoading(false);
      }, 1000);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save updated data
    localStorage.setItem('user', JSON.stringify(formData));
    setUserData(formData);
    setIsEditing(false);
    // Show success feedback
    alert('Profile updated successfully!');
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.filter(appt => appt.id !== id));
    // Show feedback
    alert('Appointment cancelled successfully!');
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
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section with Interactive Background */}
      <section className="relative bg-cover bg-center h-72 md:h-80" style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-60"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Welcome Back, {userData.firstName} {userData.surname}!</h1>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('/appointment')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 shadow-lg flex items-center gap-2"
            >
              <span>📅</span> Book Appointment
            </button>
            <button 
              onClick={() => navigate('/Mri')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 shadow-lg flex items-center gap-2"
            >
              <span>🖼️</span> Book MRI Scan
            </button>
            <button 
              onClick={() => navigate('/Xray')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 shadow-lg flex items-center gap-2"
            >
              <span>🦴</span> Book X-Ray
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-16 relative z-20">
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
                              name="first_name"
                              value={formData.first_name || ''}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-1">Last Name</label>
                            <input
                              type="text"
                              name="last_name"
                              value={formData.last_name || ''}
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
                      <h2 className="text-2xl font-bold text-blue-800 mb-6">{userData.first_name} {userData.last_name}</h2>
                      
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
                          <span className="text-gray-600 font-medium">Department:</span>
                          <span className="font-semibold text-gray-800">{userData.department_name}</span>
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

            {activeTab === 'appointments' && (
              <div>
                <h2 className="text-2xl font-bold text-blue-800 mb-6">Your Appointments</h2>
                
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You don't have any upcoming appointments.</p>
                    <button 
                      onClick={() => navigate('/appointment')}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Book an Appointment
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map(appointment => (
                      <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-lg text-blue-800">{appointment.type}</h3>
                            <p className="text-gray-600">With {appointment.doctor}</p>
                            <p className="text-gray-500 text-sm mt-1">
                              <span className="font-medium">Date:</span> {appointment.date} at {appointment.time}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => alert('Reschedule functionality coming soon!')}
                              className="px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                            >
                              Reschedule
                            </button>
                            <button 
                              onClick={() => cancelAppointment(appointment.id)}
                              className="px-4 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
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
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Need Help?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="bg-blue-100 p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer transform hover:-translate-y-1"
                onClick={() => {
                  if (info.title === 'EMAIL') {
                    window.location.href = `mailto:${info.details}`;
                  } else if (info.title === 'EMERGENCY') {
                    window.location.href = `tel:${info.details.replace(/\s/g, '')}`;
                  }
                }}
              >
                <div className="text-3xl mb-3">{info.icon}</div>
                <h3 className="font-bold text-lg text-blue-800 mb-2">{info.title}</h3>
                <p className="text-gray-700">{info.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Footer */}
      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Children's Hospital Portal</h3>
              <p className="text-blue-200">Making hospital visits easier for kids</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <div className="flex gap-4 mb-4">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                  aria-label="LinkedIn"
                >
                  <span className="text-lg">🔗</span>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                  aria-label="Facebook"
                >
                  <span className="text-lg">👍</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                  aria-label="Instagram"
                >
                  <span className="text-lg">📷</span>
                </a>
              </div>
              <p className="text-blue-200 text-sm">&copy; 2025 ASIM MIAN. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Account;