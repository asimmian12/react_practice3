import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, 
  FaLinkedin, FaFacebook, FaInstagram, FaChevronLeft, 
  FaChevronRight, FaDirections, FaParking, FaBus, FaWheelchair,
  FaHeart
} from 'react-icons/fa';
import { MdClose, MdStreetview } from 'react-icons/md';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';

const Map = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [showStreetView, setShowStreetView] = useState(false);
  const [streetViewLoaded, setStreetViewLoaded] = useState(false);
  const streetViewRef = useRef(null);
  const panoramaRef = useRef(null);
  const totalSlides = 3;

  const hospitalLocation = {
    lat: 55.861111, // Example coordinates for Glasgow
    lng: -4.310556
  };

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

  const services = [
    { title: 'Cardiology', desc: 'Heart-related treatments and checkups.', icon: '❤️' },
    { title: 'Neurology', desc: 'Brain and nervous system specialists.', icon: '🧠' },
    { title: 'Pediatrics', desc: 'Healthcare for infants and children.', icon: '👶' },
    { title: 'Orthopedics', desc: 'Bone, joint, and muscle care.', icon: '🦴' }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying && !isHovering) {
      interval = setInterval(() => {
        setActiveSlide((current) => (current + 1) % totalSlides);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovering]);

  useEffect(() => {
    if (showStreetView && !streetViewLoaded) {
      // Load Google Maps API script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=47.5763831,-122.4211769
&fov=80&heading=70&pitch=0&key=AIzaSyANEfgRkFbrcjx-l8OECzFKmRyQKQdf7IY&signature=Asim`;
      script.async = true;
      script.onload = initializeStreetView;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showStreetView]);

  const initializeStreetView = () => {
    if (window.google && window.google.maps) {
      const panorama = new window.google.maps.StreetViewPanorama(
        streetViewRef.current,
        {
          position: hospitalLocation,
          pov: { heading: 165, pitch: 0 },
          zoom: 1,
          addressControl: false,
          linksControl: false,
          fullscreenControl: false,
          motionTrackingControl: false
        }
      );
      panoramaRef.current = panorama;
      setStreetViewLoaded(true);
    }
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => goToSlide((activeSlide + 1) % totalSlides);
  const prevSlide = () => goToSlide((activeSlide - 1 + totalSlides) % totalSlides);

  const handleContactClick = (action, details) => {
    switch(action) {
      case 'tel': window.location.href = `tel:${details.replace(/\s/g, '')}`; break;
      case 'mail': window.location.href = `mailto:${details}`; break;
      case 'map': window.open(`https://maps.google.com?q=${encodeURIComponent(details)}`, '_blank'); break;
      default: break;
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
          <p className="text-5xl font-bold text-center text-white-700 mb-8">
             Map
          </p>
          </div>
        </motion.section>
 
      {/* Interactive Map Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-4 py-12 w-full"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map Carousel */}
          <div className="lg:w-2/3">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative h-80 md:h-96 overflow-hidden bg-gray-200">
                <AnimatePresence mode="wait">
                  {[0, 1, 2].map((index) => (
                    activeSlide === index && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 w-full h-full bg-blue-100 flex items-center justify-center"
                      >
                        <div className="text-center p-6">
                          <div className="text-6xl mb-4 text-blue-600">
                            {['🏥', '🏢', '🅿️'][index]}
                          </div>
                          <h3 className="text-2xl font-bold text-blue-800">
                            {['Main Building', 'East Wing', 'Parking'][index]}
                          </h3>
                          <p className="text-gray-600 mt-2">
                            {[
                              'All departments and facilities',
                              'Specialist clinics and services',
                              'Visitor parking and accessible routes'
                            ][index]}
                          </p>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-all"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="text-blue-800 text-xl" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-all"
                aria-label="Next slide"
              >
                <FaChevronRight className="text-blue-800 text-xl" />
              </button>

              {/* Street View Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowStreetView(true)}
                className="absolute bottom-4 right-4 z-20 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-all"
              >
                <MdStreetview className="text-lg" />
                <span>Street View</span>
              </motion.button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${activeSlide === index ? 'bg-white w-6' : 'bg-white/50'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Services Quick Access */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border-l-4 border-blue-500"
                >
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h4 className="font-bold text-blue-800">{service.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Directions Panel */}
          <div className="lg:w-1/3">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8"
            >
              <div className="bg-blue-700 text-white p-5">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FaDirections className="text-yellow-300" />
                  <span>Getting Here</span>
                </h3>
              </div>
              
              <div className="p-5 space-y-4">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                >
                  <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                    <FaParking className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800">By Car</h4>
                    <p className="text-gray-700 text-sm">Free parking in visitor lots A-C</p>
                    <p className="text-blue-600 text-xs mt-1">5 min walk to main entrance</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                >
                  <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                    <FaBus className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800">Public Transport</h4>
                    <p className="text-gray-700 text-sm">Bus routes 4, 7, 22 stop outside</p>
                    <p className="text-blue-600 text-xs mt-1">Every 10-15 minutes</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                >
                  <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                    <FaWheelchair className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800">Accessibility</h4>
                    <p className="text-gray-700 text-sm">All entrances wheelchair accessible</p>
                    <p className="text-blue-600 text-xs mt-1">Priority parking available</p>
                  </div>
                </motion.div>
              </div>
              
              <div className="p-5 bg-gray-50 border-t">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://maps.google.com?q=1345+Govan+Road,+G51+4TF+Glasgow+UK', '_blank')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                >
                  <FaMapMarkerAlt />
                  <span>Open in Google Maps</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

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

      {/* Street View Modal */}
      <AnimatePresence>
        {showStreetView && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setShowStreetView(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-4xl h-[80vh] bg-gray-200 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowStreetView(false)}
                className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition"
                aria-label="Close street view"
              >
                <MdClose className="text-xl" />
              </button>
              
              <div 
                ref={streetViewRef} 
                className="w-full h-full"
                style={{ minHeight: '400px' }}
              >
                {!streetViewLoaded && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-pulse flex flex-col items-center">
                        <MdStreetview className="text-6xl text-blue-600 mb-4" />
                        <p className="text-gray-700">Loading street view...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg flex items-center gap-2"
                  onClick={() => window.open(`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${hospitalLocation.lat},${hospitalLocation.lng}`, '_blank')}
                >
                  <FaMapMarkerAlt />
                  <span>Open in Google Street View</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default Map;