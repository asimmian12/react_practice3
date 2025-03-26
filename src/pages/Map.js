import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaLinkedin, FaFacebook, FaInstagram, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Map = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const totalSlides = 3;

  const contactInfo = [
    { title: 'EMERGENCY', details: '0141 201 1100', icon: <FaPhone />, action: 'tel' },
    { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK', icon: <FaMapMarkerAlt />, action: 'map' },
    { title: 'EMAIL', details: 'info.qeht@nhs.net', icon: <FaEnvelope />, action: 'mail' },
    { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only', icon: <FaClock />, action: null }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying && !isHovering) {
      interval = setInterval(() => {
        setActiveSlide((current) => (current + 1) % totalSlides);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovering]);

  const goToSlide = (index) => {
    setActiveSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const nextSlide = () => {
    goToSlide((activeSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    goToSlide((activeSlide - 1 + totalSlides) % totalSlides);
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section with Animation */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-cover bg-center h-72" 
        style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-60"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-4">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6 text-center"
          >
            Hospital Maps & Directions
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
      </motion.section>

      {/* Interactive Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 py-8 w-full"
      >
        <motion.h1 
          whileHover={{ scale: 1.02 }}
          className="text-3xl font-bold text-center text-blue-800 mb-6"
        >
          Hospital Maps & Directions
        </motion.h1>

        {/* Enhanced Carousel */}
        <div 
          className="relative w-full overflow-hidden rounded-xl shadow-xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative h-64 md:h-96 overflow-hidden">
            {/* Slide 1 */}
            <motion.div
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${activeSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: activeSlide === 0 ? 0 : 100, opacity: activeSlide === 0 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="/images/hospital_map.jpg" 
                alt="Hospital Main Building Map" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white text-xl font-bold">Main Hospital Building</h3>
                <p className="text-white/90">Ground floor map with all departments</p>
              </div>
            </motion.div>

            {/* Slide 2 */}
            <motion.div
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${activeSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: activeSlide === 1 ? 0 : 100, opacity: activeSlide === 1 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="/images/hospital2_map.jpg" 
                alt="Hospital East Wing Map" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white text-xl font-bold">East Wing</h3>
                <p className="text-white/90">Specialist departments and outpatient clinics</p>
              </div>
            </motion.div>

            {/* Slide 3 */}
            <motion.div
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${activeSlide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: activeSlide === 2 ? 0 : 100, opacity: activeSlide === 2 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="/images/hospital3_map.jpg" 
                alt="Hospital Parking and Entrances" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white text-xl font-bold">Parking & Entrances</h3>
                <p className="text-white/90">Visitor parking and accessible entrances</p>
              </div>
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${activeSlide === index ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            className="absolute top-1/2 left-4 z-30 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:outline-none"
            onClick={prevSlide}
          >
            <FaChevronLeft className="text-white text-xl" />
            <span className="sr-only">Previous</span>
          </button>

          <button
            type="button"
            className="absolute top-1/2 right-4 z-30 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:outline-none"
            onClick={nextSlide}
          >
            <FaChevronRight className="text-white text-xl" />
            <span className="sr-only">Next</span>
          </button>
        </div>

        {/* Interactive Directions Panel */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 bg-blue-50 p-6 rounded-xl shadow-md"
        >
          <h3 className="text-xl font-bold text-blue-800 mb-4">Getting Here</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-bold text-blue-700 mb-2">By Car</h4>
              <p className="text-gray-700">Free parking available in visitor lots A, B, and C</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-bold text-blue-700 mb-2">Public Transport</h4>
              <p className="text-gray-700">Bus routes 4, 7, and 22 stop directly outside</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-bold text-blue-700 mb-2">Accessibility</h4>
              <p className="text-gray-700">All entrances are wheelchair accessible</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive Contact Section */}
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
          Need Help Finding Us?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleContactClick(info.action, info.details)}
              className={`bg-blue-100 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer ${info.action ? 'hover:bg-blue-200' : ''}`}
            >
              <div className="text-blue-600 text-2xl mb-3">{info.icon}</div>
              <h3 className="font-bold text-lg text-blue-800 mb-2">{info.title}</h3>
              <p className="text-gray-700">{info.details}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Interactive Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-blue-800 text-white py-8 mt-auto"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Clyde Children's Hospital</h3>
              <p className="text-blue-200">Making healthcare accessible for everyone</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
              <div className="flex gap-4 mb-4">
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </motion.a>
              </div>
              <p className="text-blue-200 text-sm">&copy; 2025 ASIM MIAN. All rights reserved.</p>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Map;