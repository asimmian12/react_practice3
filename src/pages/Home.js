import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaLinkedin, FaFacebook, FaInstagram, FaHeart } from 'react-icons/fa';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';

const Home = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentSpecialty, setCurrentSpecialty] = useState('');
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const doctors = [
    { 
      name: 'Doctor Goldberg', 
      specialty: 'NEUROLOGY', 
      image: './images/doctor1.jpeg',
      bio: 'Renowned neurologist with 15 years of experience in treating complex neurological disorders.',
      education: 'MD, Harvard Medical School',
      awards: 'Top Neurologist 2023'
    },
    { 
      name: 'Doctor Shaw', 
      specialty: 'PULMONOLOGY', 
      image: './images/doctor2.jpeg',
      bio: 'Pulmonary specialist dedicated to advanced respiratory care and patient wellness.',
      education: 'MD, Stanford University',
      awards: 'Innovator in Pulmonary Care 2022'
    },
    { 
      name: 'Doctor Stewart', 
      specialty: 'NEUROSURGERY', 
      image: './images/doctor3.jpeg',
      bio: 'Leading expert in brain health and innovative neurological treatments.',
      education: 'MD, PhD, Oxford University',
      awards: 'Neurosurgery Excellence Award 2021'
    },
  ];

  const specialties = [
    'Neurology', 'Renals', 'Oncology', 'Otolaryngology',
    'Ophthalmology', 'Cardiovascular', 'Pulmonology',
    'Renal Medicine', 'Gastroenterology', 'Urology',
    'Dermatology', 'Gynaecology'
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const openDoctorModal = (doctor) => {
    setSelectedDoctor(doctor);
    document.body.style.overflow = 'hidden';
  };

  const closeDoctorModal = () => {
    setSelectedDoctor(null);
    document.body.style.overflow = 'auto';
  };

  const openAppointmentModal = () => {
    setIsAppointmentModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleSpecialtyHover = (specialty) => {
    setCurrentSpecialty(specialty);
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
                onClick={openAppointmentModal}
              >
                Book an Appointment
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

      {/* Doctors Section */}
      <section className="p-8 md:p-12 bg-white">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-blue-800 text-center mb-4">Our Doctors</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Meet our team of dedicated pediatric specialists committed to providing the highest quality care.
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
                className="bg-white shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer"
                onClick={() => openDoctorModal(doctor)}
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
                  <div className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-center">
                    View Profile
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Specialties Section */}
      <section className="p-8 md:p-12 bg-blue-50">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Our Specialties</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {specialties.map((specialty, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => handleSpecialtyHover(specialty)}
                onMouseLeave={() => setCurrentSpecialty('')}
                className="flex flex-col items-center transition-transform duration-300 hover:scale-110"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full mb-2">
                  <FaHeart className="w-6 h-6" />
                </div>
                <p className={`text-gray-700 ${currentSpecialty === specialty ? 'font-bold text-blue-600' : ''}`}>
                  {specialty}
                </p>
              </motion.div>
            ))}
          </div>
          {currentSpecialty && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-blue-700 font-semibold"
            >
              Currently exploring {currentSpecialty} specialty
            </motion.div>
          )}
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

      {/* Contact Section */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
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

      {/* Doctor Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <button 
                onClick={closeDoctorModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
              >
                &times;
              </button>
              
              <div className="relative h-64 w-full">
                <img 
                  src={selectedDoctor.image} 
                  alt={selectedDoctor.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h2 className="font-bold text-3xl text-white">{selectedDoctor.name}</h2>
                  <p className="font-semibold text-yellow-300 text-xl">{selectedDoctor.specialty}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">About Dr. {selectedDoctor.name.split(' ')[1]}</h3>
                  <p className="text-gray-700">{selectedDoctor.bio}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Education</h3>
                    <p className="text-gray-700">{selectedDoctor.education}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Awards & Recognition</h3>
                    <p className="text-gray-700">{selectedDoctor.awards}</p>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openAppointmentModal}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                  >
                    Book Appointment
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeDoctorModal}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-300"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Appointment Modal */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="relative">
              <button 
                onClick={closeAppointmentModal}
                className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
              
              <h2 className="text-2xl font-bold text-blue-800 mb-6">Book an Appointment</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="doctor" className="block text-gray-700 mb-2">Select Doctor</label>
                  <select 
                    id="doctor" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor, index) => (
                      <option key={index} value={doctor.name}>{doctor.name} - {doctor.specialty}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-gray-700 mb-2">Appointment Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                >
                  Submit Appointment Request
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}

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

export default Home;