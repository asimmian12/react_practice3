import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const About = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const doctors = [
    { 
      name: 'Doctor Goldberg', 
      specialty: 'NEUROLOGY', 
      image: './images/doctor1.jpeg',
      bio: 'Dr. Goldberg specializes in pediatric neurology with over 15 years of experience. She completed her residency at Johns Hopkins and has published numerous papers on childhood neurological disorders.',
      education: 'MD, Harvard Medical School',
      awards: 'Top Pediatric Neurologist 2023, Medical Excellence Award 2021'
    },
    { 
      name: 'Doctor Shaw', 
      specialty: 'PULMONOLOGY', 
      image: './images/doctor2.jpeg',
      bio: 'Dr. Shaw is our leading pulmonologist, focusing on childhood asthma and respiratory conditions. He pioneered several minimally invasive techniques now used nationwide.',
      education: 'MD, Stanford University',
      awards: 'Innovator in Pediatric Care 2022'
    },
    { 
      name: 'Doctor Stewart', 
      specialty: 'NEUROSURGERY', 
      image: './images/doctor3.jpeg',
      bio: 'Dr. Stewart heads our neurosurgery department and has performed over 500 successful pediatric brain surgeries. Her research on minimally invasive techniques has revolutionized the field.',
      education: 'MD, PhD, Oxford University',
      awards: 'International Neurosurgery Award 2020'
    },
    { 
      name: 'Doctor Smith', 
      specialty: 'OTOLARYNGOLOGY', 
      image: './images/doctor4.jpeg',
      bio: 'Dr. Smith specializes in ear, nose and throat conditions in children. He developed the "Whisper Technique" for painless ear examinations in toddlers.',
      education: 'MD, Yale School of Medicine',
      awards: 'Patient Choice Award 5 years running'
    },
    { 
      name: 'Doctor Abrara', 
      specialty: 'DERMATOLOGY', 
      image: './images/doctor5.jpeg',
      bio: 'Dr. Abrara focuses on childhood skin conditions and allergies. Her gentle approach makes even the most nervous patients feel at ease.',
      education: 'MD, University of California',
      awards: 'Dermatology Innovation Award 2023'
    },
    { 
      name: 'Doctor Jackson', 
      specialty: 'CARDIOLOGY', 
      image: './images/doctor6.jpeg',
      bio: 'Dr. Jackson leads our pediatric cardiology team. He has developed new protocols for early detection of congenital heart conditions.',
      education: 'MD, Columbia University',
      awards: 'Heart Hero Award 2021, 2022'
    },
  ];

  const contactInfo = [
    { title: 'EMERGENCY', details: '0141 201 1100', icon: <FaPhone />, action: 'tel' },
    { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK', icon: <FaMapMarkerAlt />, action: 'map' },
    { title: 'EMAIL', details: 'info.qeht@nhs.net', icon: <FaEnvelope />, action: 'mail' },
    { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only', icon: <FaClock />, action: null },
  ];

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
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
      <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-70"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 text-center"
          >
            About Clyde Children's Hospital
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 shadow-lg"
            >
              <a href="/appointment">Book an Appointment</a>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 shadow-lg"
            >
              <a href="/Mri">Book an MRI Scan</a>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 shadow-lg"
            >
              <a href="/Xray">Book an X-Ray</a>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="p-8 md:p-12 bg-blue-50">
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
                    View Full Profile
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Doctor Modal */}
      {isModalOpen && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <button 
                onClick={closeModal}
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
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                  >
                    Book Appointment
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeModal}
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

      {/* Contact Section */}
      <section className="p-8 md:p-12 bg-blue-50">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                onClick={() => handleContactClick(info.action, info.details)}
                className={`bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer ${info.action ? 'hover:bg-blue-100' : ''}`}
              >
                <div className="text-blue-600 text-3xl mb-4">{info.icon}</div>
                <h3 className="font-bold text-xl text-blue-800 mb-2">{info.title}</h3>
                <p className="text-gray-700">{info.details}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Interactive Map Section */}
      <section className="h-96 w-full bg-gray-200 relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2238.755353587785!2d-4.316578723078045!3d55.86162497262864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48884421b98f7583%3A0x3f21e4d4dd8c9f3e!2s1345%20Govan%20Rd%2C%20Glasgow%20G51%204TF%2C%20UK!5e0!3m2!1sen!2sus!4v1712345678901"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        ></iframe>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Clyde Children's Hospital</h3>
              <p className="text-blue-200 max-w-md">
                Providing compassionate, specialized care for children in a welcoming and supportive environment.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <div className="flex gap-4 mb-6">
                <motion.a 
                  whileHover={{ y: -3 }}
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition text-xl"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -3 }}
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition text-xl"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </motion.a>
                <motion.a 
                  whileHover={{ y: -3 }}
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition text-xl"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </motion.a>
              </div>
              <p className="text-blue-300 text-sm">
                &copy; 2025 Clyde Children's Hospital. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;