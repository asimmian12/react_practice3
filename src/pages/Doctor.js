import React, { useState, useEffect } from 'react';
import { Search, Phone, MapPin, Mail, Clock, Calendar, Star, ChevronDown, ChevronUp, X } from 'lucide-react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import the JSON file directly (make sure the path is correct)
import departmentData from './departments.json';

const Doctor = () => {
  const navigate = useNavigate();
  // State for interactive elements
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [showSpecialties, setShowSpecialties] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [departmentVideos, setDepartmentVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    reason: '',
    notes: ''
  });

  // Configure axios
  axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.withCredentials = true;

  // Doctor data with more details
  const doctors = [
    { 
      id: 1,
      name: 'Doctor Goldberg', 
      specialty: 'NEUROLOGY', 
      image: './images/doctor1.jpeg',
      bio: 'Pediatric neurologist with 15 years experience specializing in childhood epilepsy.',
      rating: 4.8,
      available: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'],
      ageGroups: '2-18',
      languages: ['English', 'Spanish'],
      department_id: 1
    },
    { 
      id: 2,
      name: 'Doctor Shaw', 
      specialty: 'PULMONOLOGY', 
      image: './images/doctor2.jpeg',
      bio: 'Expert in childhood respiratory conditions including asthma and allergies.',
      rating: 4.6,
      available: ['10:00 AM', '11:00 AM', '03:00 PM', '04:00 PM'],
      ageGroups: '5-18',
      languages: ['English', 'French'],
      department_id: 2
    },
    { 
      id: 3,
      name: 'Doctor Stewart', 
      specialty: 'NEUROSURGERY', 
      image: './images/doctor3.jpeg',
      bio: 'Pediatric neurosurgeon specializing in minimally invasive procedures.',
      rating: 4.9,
      available: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
      ageGroups: '10-18',
      languages: ['English'],
      department_id: 1
    },
    { 
      id: 4,
      name: "Doctor Smith", 
      specialty: 'OTOLARYNGOLOGY', 
      image: './images/doctor4.jpeg',
      bio: 'ENT specialist with expertise in childhood ear, nose and throat conditions.',
      rating: 4.7,
      available: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM'],
      ageGroups: '2-18',
      languages: ['English', 'Arabic'],
      department_id: 3
    },
    { 
      id: 5,
      name: 'Doctor Abrara', 
      specialty: 'DERMATOLOGY', 
      image: './images/doctor5.jpeg',
      bio: 'Pediatric dermatologist treating skin conditions from eczema to acne.',
      rating: 4.5,
      available: ['11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
      ageGroups: '2-18',
      languages: ['English', 'Urdu'],
      department_id: 4
    },
    { 
      id: 6,
      name: 'Doctor Jackson', 
      specialty: 'CARDIOLOGY', 
      image: './images/doctor6.jpeg',
      bio: 'Pediatric cardiologist specializing in congenital heart conditions.',
      rating: 4.8,
      available: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM'],
      ageGroups: '0-18',
      languages: ['English', 'Mandarin'],
      department_id: 5
    },
  ];

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

  // All specialties for filtering
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? doctor.specialty === selectedSpecialty : true;
    return matchesSearch && matchesSpecialty;
  });

  // Handle booking appointment
  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Confirm booking
  const confirmBooking = async (timeSlot) => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        navigate('/login');
        return;
      }
      
      const user = JSON.parse(storedUser);
      
      // Convert time to 24-hour format for storage
      const time24hr = new Date(`2000-01-01T${timeSlot}`).toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }).replace(/^24:/, '00:'); // Handle midnight case

      const newAppointment = {
        user_id: user.id,
        doctor_id: selectedDoctor.id,
        department_id: selectedDoctor.department_id,
        date: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD format
        time: time24hr,
        patient_name: formData.name,
        patient_age: formData.age,
        reason: formData.reason,
        notes: formData.notes || null,
        status: 'booked'
      };

      const response = await axios.post('/api/appointments', newAppointment);
      
      setBookedAppointment({
        doctor: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        time: timeSlot,
        date: new Date().toLocaleDateString()
      });
      
      setShowModal(false);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
      
      // Reset form
      setFormData({ name: '', age: '', reason: '', notes: '' });
      setError(null);
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError(error.response?.data?.message || 'Failed to book appointment. Please try again.');
    }
  };

  // Toggle favorite doctor
  const toggleFavorite = (doctorId) => {
    setFavorites(prev => 
      prev.includes(doctorId) 
        ? prev.filter(id => id !== doctorId) 
        : [...prev, doctorId]
    );
  };

  useEffect(() => {
    try {
      // Clean video IDs by removing URL parameters
      const cleanedData = departmentData.map(dept => ({
        ...dept,
        videos: dept.videos?.map(video => 
          video.includes('?') ? video.split('?')[0] : video
        )
      }));
      
      setDepartmentVideos(cleanedData);
      console.log('Department videos loaded:', cleanedData);
    } catch (error) {
      console.error('Error processing department data:', error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Consistent with About Page */}
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
            className="text-center px-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4"></h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-4 py-2 sm:px-6 sm:py-3 m-1 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md text-sm sm:text-base"
              >
                <a href="/appointment">Book an Appointment</a>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-4 py-2 sm:px-6 sm:py-3 m-1 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md text-sm sm:text-base"
              >
                <a href="/Mri">Book an MRI Scan</a>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-4 py-2 sm:px-6 sm:py-3 m-1 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md text-sm sm:text-base"
              >
                <a href="/Xray">Book an X-Ray</a>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Banner Section - Stats from About Page */}
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
              { number: '50+', label: 'Specialized Doctors' },
              { number: '10K+', label: 'Patients Yearly' },
              { number: '95%', label: 'Patient Satisfaction' },
              { number: '24/7', label: 'Emergency Care' }
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

      {/* Search and Filter Section */}
      <section id="doctors-section" className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Find the Right Specialist</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-blue-400" />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Specialty Filter */}
            <div className="relative">
              <button
                onClick={() => setShowSpecialties(!showSpecialties)}
                className="w-full flex justify-between items-center px-4 py-2 border-2 border-blue-200 rounded-lg bg-white"
              >
                {selectedSpecialty || 'Filter by Specialty'}
                {showSpecialties ? <ChevronUp /> : <ChevronDown />}
              </button>
              
              {showSpecialties && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                  <button
                    onClick={() => {
                      setSelectedSpecialty(null);
                      setShowSpecialties(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${!selectedSpecialty ? 'bg-blue-100' : ''}`}
                  >
                    All Specialties
                  </button>
                  {specialties.map((specialty, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedSpecialty(specialty);
                        setShowSpecialties(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${selectedSpecialty === specialty ? 'bg-blue-100' : ''}`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedSpecialty) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty(null);
                }}
                className="flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition"
              >
                <X size={18} />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <motion.div 
                key={doctor.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Doctor Image with Favorite Button */}
                <div className="relative">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(doctor.id)}
                    className="absolute top-3 right-3 bg-white/80 p-2 rounded-full backdrop-blur-sm"
                    aria-label={favorites.includes(doctor.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Star 
                      size={24} 
                      fill={favorites.includes(doctor.id) ? 'gold' : 'none'} 
                      stroke={favorites.includes(doctor.id) ? 'gold' : 'currentColor'}
                      className="text-blue-900"
                    />
                  </button>
                </div>

                {/* Doctor Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-blue-900">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
                      <Star size={16} fill="gold" stroke="gold" />
                      <span className="ml-1 text-blue-900">{doctor.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mt-3 line-clamp-2">{doctor.bio}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                      Ages: {doctor.ageGroups}
                    </span>
                    {doctor.languages.map((lang, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBookAppointment(doctor)}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    Book Appointment
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-bold text-blue-900 mb-2">No doctors found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty(null);
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Booked Appointment Confirmation */}
      {bookedAppointment && (
        <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg max-w-sm z-50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">Appointment Booked!</h3>
              <p className="mt-1">
                <strong>{bookedAppointment.doctor}</strong> ({bookedAppointment.specialty})<br />
                {bookedAppointment.time} on {bookedAppointment.date}
              </p>
            </div>
            <button 
              onClick={() => setBookedAppointment(null)}
              className="text-green-700 hover:text-green-900"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-blue-900">Book Appointment</h2>
                  <h3 className="text-xl mt-1">{selectedDoctor.name}</h3>
                  <p className="text-blue-600">{selectedDoctor.specialty}</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mt-6">
                <h4 className="font-bold text-gray-800 mb-3">Available Time Slots</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedDoctor.available.map((slot, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => confirmBooking(slot)}
                      className="border border-blue-300 hover:bg-blue-50 text-blue-900 py-2 px-4 rounded-lg transition"
                    >
                      {slot}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-bold text-gray-800 mb-2">Patient Information</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Patient Name *"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="age"
                    placeholder="Age *"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                  <textarea
                    name="reason"
                    placeholder="Reason for visit *"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows="3"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  <textarea
                    name="notes"
                    placeholder="Additional notes (optional)"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows="2"
                    value={formData.notes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>

              {error && (
                <div className="mt-4 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50"
                disabled={!formData.name || !formData.age || !formData.reason}
              >
                Confirm Booking
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
   
      <section className="py-12 bg-white-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Department Videos</h2>
          
          {departmentVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departmentVideos
                .filter(dept => dept.videos && dept.videos.length > 0)
                .map((dept) => (
                  <motion.div 
                    key={dept.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-blue-900 mb-2">{dept.name}</h3>
                      <p className="text-gray-600 mb-4">{dept.details}</p>
                    </div>
                    
                    <div className="space-y-4 p-4">
                      {dept.videos.map((videoId, index) => (
                        <div key={index} className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={`${dept.name} Video ${index + 1}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))
              }
            </div>
          ) : (
            <div className="text-center py-12">
              <p>No videos available at this time.</p>
              <button 
                onClick={() => console.log('Department videos state:', departmentVideos)}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
              >
                (Click to log video data to console)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Confetti effect */}
      {confetti && <Confetti recycle={false} numberOfPieces={500} />}

      {/* Contact Information Section - Consistent with About Page */}
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

      {/* Footer - Consistent with About Page */}
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

export default Doctor;