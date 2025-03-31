import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Clock, X } from 'lucide-react';

const Appointment = () => {
  const [userData, setUserData] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [jsonDepartments, setJsonDepartments] = useState([]);
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
  const [doctorDetails, setDoctorDetails] = useState({});
  const [departmentDetails, setDepartmentDetails] = useState({});
  const [doctorAvailability, setDoctorAvailability] = useState({});
  const [error, setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
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

  // Enhanced department data combining SQL and JSON
  const getEnhancedDepartment = (deptId) => {
    const sqlDept = departments.find(d => d.id == deptId);
    if (!sqlDept) return null;
    
    const jsonDept = jsonDepartments.find(d => 
      d.name.toLowerCase() === sqlDept.name.toLowerCase()
    );
    
    return { ...sqlDept, ...jsonDept };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedSlot(null);
  };

  const isDoctorAvailable = (doctorId, date) => {
    if (!doctorId || !date) return false;
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    return doctorAvailability[doctorId]?.some(a => a.day_of_week === dayOfWeek);
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    
    if (!selectedDepartment || !selectedDoctor || !selectedDate || !selectedSlot || !formData.reason) {
      setError('Please fill all required fields');
      return;
    }

    try {
      // Convert time to 24-hour format for storage
      const time24hr = new Date(`2000-01-01T${selectedSlot}`).toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/^24:/, '00:'); // Handle midnight case

      const newAppointment = {
        user_id: userData.id,
        doctor_id: parseInt(selectedDoctor),
        department_id: parseInt(selectedDepartment),
        date: selectedDate,
        time: time24hr,
        reason: formData.reason,
        notes: formData.notes || null,
        status: 'booked'
      };

      await axios.post('/api/appointments', newAppointment);
      
      // Refresh appointments list
      const updatedResponse = await axios.get(`/api/appointments?user_id=${userData.id}`);
      setAppointments(updatedResponse.data);
      
      // Reset form
      setShowBookingForm(false);
      setSelectedDepartment('');
      setSelectedDoctor('');
      setSelectedDate('');
      setSelectedSlot(null);
      setFormData({ reason: '', notes: '' });
      setError(null);
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError(error.response?.data?.message || 'Failed to book appointment. Please try again.');
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await axios.patch(`/api/appointments/${appointmentId}`, { status: 'cancelled' });
      
      setAppointments(prev => prev.map(appt => 
        appt.id === appointmentId ? { ...appt, status: 'cancelled' } : appt
      ));
      setError(null);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setError('Failed to cancel appointment. Please try again.');
    }
  };

  const handleRescheduleAppointment = async (appointmentId) => {
    try {
      const appointment = appointments.find(a => a.id === appointmentId);
      if (!appointment) {
        setError('Appointment not found');
        return;
      }
      
      setSelectedDepartment(appointment.department_id);
      setSelectedDoctor(appointment.doctor_id);
      setSelectedDate(appointment.date);
      setFormData({
        reason: appointment.reason || '',
        notes: appointment.notes || ''
      });
      setShowBookingForm(true);
      setError(null);
    } catch (error) {
      console.error('Error preparing reschedule:', error);
      setError('Failed to prepare reschedule. Please try again.');
    }
  };

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

      // Fetch data sequentially with error handling for each
      try {
        const deptResponse = await axios.get('/api/departments');
        console.log('Departments loaded:', deptResponse.data);
        setDepartments(deptResponse.data);
      } catch (deptError) {
        console.error('Error loading departments:', deptError);
        setError('Failed to load departments. Please try again.');
      }

      try {
        const jsonDeptResponse = await axios.get('/departments');
        console.log('JSON departments loaded:', jsonDeptResponse.data);
        setJsonDepartments(jsonDeptResponse.data);
      } catch (jsonError) {
        console.error('Error loading JSON departments:', jsonError);
        // Don't set error as this is secondary data
      }

      try {
        const doctorsResponse = await axios.get('/api/doctors');
        console.log('Doctors loaded:', doctorsResponse.data);
        setDoctors(doctorsResponse.data);
        
        // Create doctors map
        const doctorsMap = {};
        doctorsResponse.data.forEach(doctor => {
          doctorsMap[doctor.id] = doctor;
        });
        setDoctorDetails(doctorsMap);
      } catch (doctorsError) {
        console.error('Error loading doctors:', doctorsError);
        setError('Failed to load doctors. Please try again.');
      }

      try {
        const appointmentsResponse = await axios.get(`/api/appointments?user_id=${user.id}`);
        setAppointments(appointmentsResponse.data);
      } catch (appointmentsError) {
        console.error('Error loading appointments:', appointmentsError);
        setError('Failed to load appointments. Please try again.');
      }

      setDataLoaded(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error in fetchData:', error);
      setError('Failed to load data. Please try again later.');
      setIsLoading(false);
    }
  };

  fetchData();
}, [navigate]);

  // Fetch doctors when department changes
  useEffect(() => {
    const fetchDoctors = async () => {
      if (!selectedDepartment) {
        // If no department selected, show all doctors
        try {
          const response = await axios.get('/api/doctors');
          setDoctors(response.data);
        } catch (error) {
          console.error('Error fetching all doctors:', error);
        }
        return;
      }

      try {
        const response = await axios.get('/api/doctors', {
          params: { department_id: selectedDepartment }
        });
        
        setDoctors(response.data);
        
        // Fetch availability for each doctor
        const availabilityMap = {};
        for (const doctor of response.data) {
          try {
            const availabilityResponse = await axios.get(`/api/doctor-availability?doctor_id=${doctor.id}`);
            availabilityMap[doctor.id] = availabilityResponse.data;
          } catch (error) {
            console.error(`Error fetching availability for doctor ${doctor.id}:`, error);
            availabilityMap[doctor.id] = [];
          }
        }
        setDoctorAvailability(availabilityMap);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Failed to load doctors. Please try again.');
      }
    };

    fetchDoctors();
  }, [selectedDepartment]);

  // Fetch available slots when doctor or date changes
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDoctor || !selectedDate) {
        setAvailableSlots([]);
        return;
      }

      try {
        const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
        const availability = doctorAvailability[selectedDoctor]?.find(a => a.day_of_week === dayOfWeek);
        
        if (!availability) {
          setAvailableSlots([]);
          return;
        }

        // Get booked slots for this doctor on this date
        const bookedSlotsResponse = await axios.get('/api/appointments', {
          params: {
            doctor_id: selectedDoctor,
            date: selectedDate
          }
        });
        
        // Generate all possible slots
        const start = new Date(`${selectedDate}T${availability.start_time}`);
        const end = new Date(`${selectedDate}T${availability.end_time}`);
        const slotDuration = availability.slot_duration || 30; // minutes
        
        const allSlots = [];
        let current = new Date(start);
        
        while (current < end) {
          const timeStr = current.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          });
          allSlots.push(timeStr);
          current = new Date(current.getTime() + slotDuration * 60000);
        }
        
        // Filter out booked slots
        const bookedSlots = bookedSlotsResponse.data.map(appt => 
          new Date(`2000-01-01T${appt.time}`).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })
        );
        
        const available = allSlots.filter(slot => !bookedSlots.includes(slot));
        setAvailableSlots(available);
      } catch (error) {
        console.error('Error fetching slots:', error);
        setError('Failed to load available slots. Please try again.');
      }
    };

    fetchSlots();
  }, [selectedDoctor, selectedDate, doctorAvailability]);

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
             Welcome to Clyde Children's Hospital Appointment Portal
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
        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
          >
            <p>{error}</p>
          </motion.div>
        )}

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
              src={'./images/account2.png'} 
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
              </div>
            </div>
          </div>
        </motion.div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-blue-800">Book New Appointment</h2>
                  <button 
                    onClick={() => {
                      setShowBookingForm(false);
                      setError(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleBookAppointment}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Department *</label>
                      <select
                      value={selectedDepartment}
                      onChange={(e) => {
                        setSelectedDepartment(e.target.value);
                        setSelectedDoctor('');
                        setSelectedDate('');
                        setSelectedSlot(null);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required>
                        <option value="">{departments.length > 0 ? 'Select Department' : 'Loading departments...'}</option>
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                            </option>
                          ))}
                          </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Doctor *</label>
                      <select
                        value={selectedDoctor}
                        onChange={(e) => {
                          setSelectedDoctor(e.target.value);
                          setSelectedDate('');
                          setSelectedSlot(null);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={!dataLoaded}
                      >
                        <option value="">{dataLoaded ? 'Select Doctor' : 'Loading...'}</option>
                        {doctors?.map(doctor => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.title || 'Dr.'} {doctor.firstName} {doctor.lastName} ({doctor.specialization})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Date *</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min={new Date().toISOString().split('T')[0]}
                        required
                        disabled={!selectedDoctor}
                      />
                      {selectedDoctor && selectedDate && (
                        <div className="mt-2 text-sm text-gray-600">
                          {isDoctorAvailable(selectedDoctor, selectedDate) 
                            ? 'Doctor is available this day' 
                            : 'Doctor is not available this day'}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Reason *</label>
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

                  {availableSlots.length > 0 ? (
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">Available Time Slots *</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {availableSlots.map(slot => (
                          <motion.button
                            key={slot}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 px-4 rounded-lg border ${selectedSlot === slot ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'}`}
                          >
                            {slot}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : selectedDoctor && selectedDate && (
                    <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-yellow-700">
                        {isDoctorAvailable(selectedDoctor, selectedDate) 
                          ? 'No available slots left for this day' 
                          : 'Doctor is not available on this day'}
                      </p>
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
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowBookingForm(false);
                        setError(null);
                      }}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                      disabled={!selectedSlot}
                    >
                      Confirm Booking
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {/* Appointments Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-blue-800">Your Appointments</h2>
          </div>

          {appointments.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500 mb-4">You don't have any upcoming appointments.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBookingForm(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Book Your First Appointment
              </motion.button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {appointments.map(appointment => {
                const doctor = doctorDetails[appointment.doctor_id] || {};
                const department = getEnhancedDepartment(appointment.department_id) || {};
                const availability = doctorAvailability[appointment.doctor_id] || [];
                
                return (
                  <div key={appointment.id} className="p-6 hover:bg-blue-50 transition">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <img 
                            src={`./images/${doctor.image}`} 
                            alt={`${doctor.title || 'Dr.'} ${doctor.lastName || ''}`}
                            className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                          />
                          <div>
                            <h3 className="font-bold text-lg text-blue-800">
                              {doctor.firstName ? `${doctor.title || 'Dr.'} ${doctor.firstName} ${doctor.lastName}` : 'Doctor'} - {department.name || 'Department'}
                            </h3>
                            {doctor.specialization && (
                              <p className="text-gray-600 text-sm">{doctor.specialization}</p>
                            )}
                            {doctor.bio && (
                              <p className="text-gray-600 text-xs mt-1">{doctor.bio}</p>
                            )}
                            <p className="text-gray-600 mt-1">
                              {new Date(appointment.date).toLocaleDateString('en-GB', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })} at {appointment.time}
                            </p>
                            {appointment.reason && (
                              <p className="text-gray-700 mt-1">
                                <span className="font-medium">Reason:</span> {appointment.reason}
                              </p>
                            )}
                            <p className={`mt-2 text-sm font-medium ${
                              appointment.status === 'booked' ? 'text-blue-600' : 
                              appointment.status === 'completed' ? 'text-green-600' :
                              appointment.status === 'cancelled' ? 'text-red-600' : 
                              'text-yellow-600'
                            }`}>
                              Status: {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </p>
                            {availability.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs text-gray-500">
                                  <span className="font-medium">Typical Availability:</span> {availability.map(a => 
                                    `${a.day_of_week} ${a.start_time}-${a.end_time}`
                                  ).join(', ')}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRescheduleAppointment(appointment.id)}
                          className="px-4 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                          disabled={appointment.status === 'cancelled' || appointment.status === 'completed'}
                        >
                          Reschedule
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="px-4 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50 transition"
                          disabled={appointment.status === 'cancelled' || appointment.status === 'completed'}
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                    {appointment.notes && (
                      <div className="mt-4 bg-white-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <span className="font-medium">Notes:</span> {appointment.notes}
                        </p>
                      </div>
                    )}
                    {department.details && (
                      <div className="mt-4 bg-white-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1">About {department.name}:</h4>
                        <p className="text-sm text-gray-700">{department.details}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Department Information */}
{appointments.length > 0 && (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
  >
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-blue-800">Your Department Information</h2>
    </div>

    <div className="p-6">
      {/* Department Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-blue-800">
          {departments.find(d => d.id === appointments[0].department_id)?.name || 'Your Department'}
        </h3>
        <p className="text-gray-600 mt-1">Specialized care for your needs</p>
      </div>

      {/* Department Hours */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-700 mb-3">Department Hours</h4>
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

      {(() => {
        const dept = departments.find(d => d.id === appointments[0].department_id);
        if (!dept) return null;
        
        return (
          <>
            {dept.details && (
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">About This Department</h4>
                <p className="text-gray-700">{dept.details}</p>
              </div>
            )}

            {dept.nurse && (
              <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">Primary Care Team</h4>
                <p className="text-gray-700">
                  <span className="font-medium">Primary Nurse:</span> {dept.nurse}
                </p>
              </div>
            )}
          </>
        );
      })()}
    </div>
  </motion.div>
)}
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

export default Appointment;