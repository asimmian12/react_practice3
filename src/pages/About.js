import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Clock, X } from 'lucide-react';
import Confetti from 'react-confetti';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    reason: '',
    notes: ''
  });

  // Cleanup effect to reset overflow when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Configure axios
  axios.defaults.baseURL = 'http://localhost:5000';
  axios.defaults.withCredentials = true;

  const doctors = [
    { 
      id: 1,
      name: 'Doctor Goldberg', 
      specialty: 'NEUROLOGY', 
      image: './images/doctor1.jpeg',
      bio: 'Dr. Goldberg specializes in pediatric neurology with over 15 years of experience. She completed her residency at Johns Hopkins and has published numerous papers on childhood neurological disorders.',
      education: 'MD, Harvard Medical School',
      awards: 'Top Pediatric Neurologist 2023, Medical Excellence Award 2021',
      available: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'],
      department_id: 1
    },
    { 
      id: 2,
      name: 'Doctor Shaw', 
      specialty: 'PULMONOLOGY', 
      image: './images/doctor2.jpeg',
      bio: 'Dr. Shaw is our leading pulmonologist, focusing on childhood asthma and respiratory conditions. He pioneered several minimally invasive techniques now used nationwide.',
      education: 'MD, Stanford University',
      awards: 'Innovator in Pediatric Care 2022',
      available: ['10:00 AM', '11:00 AM', '03:00 PM', '04:00 PM'],
      department_id: 2
    },
    { 
      id: 3,
      name: 'Doctor Stewart', 
      specialty: 'NEUROSURGERY', 
      image: './images/doctor3.jpeg',
      bio: 'Dr. Stewart heads our neurosurgery department and has performed over 500 successful pediatric brain surgeries. Her research on minimally invasive techniques has revolutionized the field.',
      education: 'MD, PhD, Oxford University',
      awards: 'International Neurosurgery Award 2020',
      available: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
      department_id: 1
    },
    { 
      id: 4,
      name: 'Doctor Smith', 
      specialty: 'OTOLARYNGOLOGY', 
      image: './images/doctor4.jpeg',
      bio: 'Dr. Smith specializes in ear, nose and throat conditions in children. He developed the "Whisper Technique" for painless ear examinations in toddlers.',
      education: 'MD, Yale School of Medicine',
      awards: 'Patient Choice Award 5 years running',
      available: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM'],
      department_id: 3
    },
    { 
      id: 5,
      name: 'Doctor Abrara', 
      specialty: 'DERMATOLOGY', 
      image: './images/doctor5.jpeg',
      bio: 'Dr. Abrara focuses on childhood skin conditions and allergies. Her gentle approach makes even the most nervous patients feel at ease.',
      education: 'MD, University of California',
      awards: 'Dermatology Innovation Award 2023',
      available: ['11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
      department_id: 4
    },
    { 
      id: 6,
      name: 'Doctor Jackson', 
      specialty: 'CARDIOLOGY', 
      image: './images/doctor6.jpeg',
      bio: 'Dr. Jackson leads our pediatric cardiology team. He has developed new protocols for early detection of congenital heart conditions.',
      education: 'MD, Columbia University',
      awards: 'Heart Hero Award 2021, 2022',
      available: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM'],
      department_id: 5
    },
  ];

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

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    setError(null);
    setSelectedTimeSlot(null);
    setFormData({ name: '', age: '', reason: '', notes: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const confirmBooking = async () => {
    try {
      // Validate time slot selection
      if (!selectedTimeSlot) {
        setError('Please select a time slot');
        return;
      }
  
      // Validate form fields
      if (!formData.name || !formData.age || !formData.reason) {
        setError('Please fill all required fields');
        return;
      }
  
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        document.body.style.overflow = 'auto'; // Reset before navigating
        navigate('/login');
        return;
      }
      
      const user = JSON.parse(storedUser);
      
      // Convert time to simple HH:MM format (24-hour)
      const time24hr = selectedTimeSlot.replace(' AM', '').replace(' PM', '');
      const [hours, minutes] = time24hr.split(':');
      let formattedTime = time24hr;
      
      // Convert to 24-hour format if needed
      if (selectedTimeSlot.includes('PM') && hours !== '12') {
        formattedTime = `${parseInt(hours) + 12}:${minutes}`;
      } else if (selectedTimeSlot.includes('AM') && hours === '12') {
        formattedTime = `00:${minutes}`;
      }
      
      // Get current date in YYYY-MM-DD format
      const today = new Date();
      const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
      const newAppointment = {
        user_id: user.id,
        doctor_id: selectedDoctor.id,
        department_id: selectedDoctor.department_id,
        date: dateStr,
        time: formattedTime,
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
        time: selectedTimeSlot,
        date: new Date().toLocaleDateString()
      });
      
      setIsModalOpen(false);
      document.body.style.overflow = 'auto'; 
      setConfetti(true);
      setTimeout(() => {
        setConfetti(false);
      }, 3000);
      
      // Reset form
      setFormData({ name: '', age: '', reason: '', notes: '' });
      setSelectedTimeSlot(null);
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError(error.response?.data?.message || 'Failed to book appointment. Please try again.');
    }
  };

  const handleContactClick = (action, details) => {
    switch(action) {
      case 'tel':
        window.location.href = `tel:${details.replace(/\s/g, '')}`;
        break;
      case 'mail':
        window.location.href = `mailto:${details}`;
        break;
      case 'map':
        window.open(`https://maps.google.com?q=${encodeURIComponent(details)}`, '_blank');
        break;
      default:
        break;
    }
  };

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

      {/* About Section */}
      <section className="p-8 md:p-12 bg-white-50">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-blue-800 mb-2">ABOUT US</h1>
          <div className="flex flex-col md:flex-row mt-8 items-center gap-8">
            <motion.img 
              whileHover={{ scale: 1.02 }}
              src="./images/aboutus.jpg" 
              alt="About Us" 
              className="w-full md:w-1/2 rounded-xl shadow-xl transition-transform duration-500 ease-in-out"
            />
            <div className="mt-6 md:mt-0">
              <motion.h2 
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl md:text-3xl font-semibold text-blue-700 mb-4"
              >
                WELCOME TO CLYDE CHILDREN'S HOSPITAL
              </motion.h2>
              <motion.p 
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-gray-700 text-lg"
              >
                At Clyde Children's Hospital, we are dedicated to providing compassionate and high-quality care for young patients in a welcoming and supportive environment. Our team of skilled healthcare professionals works tirelessly to ensure that every child receives the best medical attention tailored to their needs.
              </motion.p>
              <motion.p 
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-gray-700 text-lg mt-4"
              >
                Beyond medical care, we prioritize emotional well-being by creating a child-friendly atmosphere with engaging activities and interactive programs. Our commitment extends to families, offering guidance and support throughout their journey.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
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

      {/* Doctors Section */}
      <section className="p-8 md:p-12 bg-white">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-blue-800 text-center mb-4">Our Specialist Doctors</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Meet our team of dedicated pediatric specialists who are committed to providing the highest quality care for your children.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="bg-white shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative group overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h2 className="font-bold text-2xl text-white">{doctor.name}</h2>
                    <p className="font-semibold text-yellow-300">{doctor.specialty}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 line-clamp-3">{doctor.bio}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openModal(doctor)}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Book Appointment
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
      
      {/* Doctor Modal */}
      {isModalOpen && selectedDoctor && (
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
                  onClick={closeModal}
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
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`border ${selectedTimeSlot === slot ? 'bg-blue-100 border-blue-500' : 'border-blue-300 hover:bg-blue-50'} text-blue-900 py-2 px-4 rounded-lg transition`}
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
                onClick={confirmBooking}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
              >
                Confirm Booking
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Confetti effect */}
      {confetti && <Confetti recycle={false} numberOfPieces={500} />}

      {/* Contact Section */}
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
                onClick={() => handleContactClick(info.action, info.details)}
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

export default About;