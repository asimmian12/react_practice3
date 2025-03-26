import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Appointment = () => {
  const [userData, setUserData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    notes: ''
  });
  const navigate = useNavigate();

  // Fetch user data and initial appointments
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserData(user);

          // Fetch departments from MySQL
          const deptResponse = await axios.get('/api/departments');
          setDepartments(deptResponse.data);

          // Fetch user's appointments
          const appointmentsResponse = await axios.get(`/api/appointments?userId=${user.id}`);
          setAppointments(appointmentsResponse.data);

          setIsLoading(false);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Fetch doctors when department changes
  useEffect(() => {
    if (selectedDepartment) {
      const fetchDoctors = async () => {
        try {
          const response = await axios.get(`/api/doctors?departmentId=${selectedDepartment}`);
          setDoctors(response.data);
        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      };
      fetchDoctors();
    }
  }, [selectedDepartment]);

  // Fetch available slots when doctor or date changes
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const fetchSlots = async () => {
        try {
          const response = await axios.get(
            `/api/appointments/slots?doctorId=${selectedDoctor}&date=${selectedDate}`
          );
          setAvailableSlots(response.data);
        } catch (error) {
          console.error('Error fetching slots:', error);
        }
      };
      fetchSlots();
    }
  }, [selectedDoctor, selectedDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      const newAppointment = {
        userId: userData.id,
        doctorId: selectedDoctor,
        departmentId: selectedDepartment,
        date: selectedDate,
        time: selectedSlot,
        reason: formData.reason,
        notes: formData.notes,
        status: 'booked'
      };

      const response = await axios.post('/api/appointments', newAppointment);
      
      // Update local state
      setAppointments([...appointments, response.data]);
      setShowBookingForm(false);
      setSelectedSlot(null);
      setFormData({ reason: '', notes: '' });

      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.delete(`/api/appointments/${appointmentId}`);
      
      // Update local state
      setAppointments(appointments.filter(appt => appt.id !== appointmentId));
      alert('Appointment cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel appointment. Please try again.');
    }
  };

  if (!userData || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-blue-800">Loading your appointment information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-72" style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-60"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Hello, {userData.firstName} {userData.surname}</h1>
          <p className="text-white mb-6">Welcome to Clyde Portal Hospital</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setShowBookingForm(true)}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 shadow-lg"
            >
              Book New Appointment
            </button>
            <button 
              onClick={() => navigate('/Mri')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 shadow-lg"
            >
              Book MRI Scan
            </button>
            <button 
              onClick={() => navigate('/Xray')}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 shadow-lg"
            >
              Book X-Ray
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-16 relative z-20">
        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img 
              src={userData.profileImage || './images/account2.png'} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
            />
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-blue-800">{userData.firstName} {userData.surname}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-gray-600">Last Active</p>
                  <p className="font-semibold">{new Date(userData.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-semibold">{userData.telephone_number}</p>
                </div>
                <div>
                  <p className="text-gray-600">Primary Department</p>
                  <p className="font-semibold">{userData.department_name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-blue-800">Book New Appointment</h2>
                  <button 
                    onClick={() => setShowBookingForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleBookAppointment}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Department</label>
                      <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Doctor</label>
                      <select
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={!selectedDepartment}
                      >
                        <option value="">Select Doctor</option>
                        {doctors.map(doctor => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.title} {doctor.firstName} {doctor.lastName} ({doctor.specialization})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min={new Date().toISOString().split('T')[0]}
                        required
                        disabled={!selectedDoctor}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Reason</label>
                      <input
                        type="text"
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Brief reason for appointment"
                        required
                      />
                    </div>
                  </div>

                  {availableSlots.length > 0 && (
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">Available Time Slots</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {availableSlots.map(slot => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 px-4 rounded-lg border ${selectedSlot === slot ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'}`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Additional Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                      placeholder="Any additional information..."
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                      disabled={!selectedSlot}
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-blue-800">Your Appointments</h2>
          </div>

          {appointments.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500 mb-4">You don't have any upcoming appointments.</p>
              <button
                onClick={() => setShowBookingForm(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Book Your First Appointment
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {appointments.map(appointment => (
                <div key={appointment.id} className="p-6 hover:bg-blue-50 transition">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-blue-800">
                        {appointment.doctorName} - {appointment.departmentName}
                      </h3>
                      <p className="text-gray-600">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </p>
                      {appointment.reason && (
                        <p className="text-gray-700 mt-1">
                          <span className="font-medium">Reason:</span> {appointment.reason}
                        </p>
                      )}
                      <p className={`mt-2 text-sm font-medium ${
                        appointment.status === 'booked' ? 'text-green-600' : 
                        appointment.status === 'cancelled' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        Status: {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => alert('Reschedule functionality coming soon!')}
                        className="px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                        disabled={appointment.status === 'cancelled'}
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="px-4 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50 transition"
                        disabled={appointment.status === 'cancelled'}
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

        {/* Department Information */}
        {userData.department_name && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Your Department Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{userData.department_name}</h3>
                <p className="text-gray-700">{userData.details}</p>
                <p className="text-gray-700 mt-2">
                  <span className="font-medium">Your doctor:</span> {userData.doctor}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Department Hours</h3>
                <div className="space-y-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <div className="flex justify-between" key={day}>
                      <span className="text-gray-600">{day}</span>
                      <span className="font-medium">
                        {day === 'Sunday' ? 'Closed' : '09:00 AM - 07:00 PM'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <section className="bg-white py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Need Help?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'EMERGENCY', detail: '0141 201 1100', icon: '🚑', action: 'tel' },
              { title: 'LOCATION', detail: '1345 Govan Road, G51 4TF Glasgow UK', icon: '📍', action: 'map' },
              { title: 'EMAIL', detail: 'info.qeht@nhs.net', icon: '✉️', action: 'mail' },
              { title: 'WORKING HOURS', detail: 'Mon-Sat 09:00-20:00, Sunday Emergency only', icon: '⏰', action: null }
            ].map((info, index) => (
              <div 
                key={index} 
                className="bg-blue-100 p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer transform hover:-translate-y-1"
                onClick={() => {
                  if (info.action === 'tel') {
                    window.location.href = `tel:${info.detail.replace(/\s/g, '')}`;
                  } else if (info.action === 'mail') {
                    window.location.href = `mailto:${info.detail}`;
                  } else if (info.action === 'map') {
                    window.open(`https://maps.google.com?q=${encodeURIComponent(info.detail)}`, '_blank');
                  }
                }}
              >
                <div className="text-3xl mb-3">{info.icon}</div>
                <h3 className="font-bold text-lg text-blue-800 mb-2">{info.title}</h3>
                <p className="text-gray-700">{info.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Clyde Portal Hospital</h3>
              <p className="text-blue-200">Making healthcare accessible for everyone</p>
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

export default Appointment;