import React, { useState, useEffect } from 'react';
import { Search, Phone, MapPin, Mail, Clock, ChevronDown, ChevronUp, X, Heart, Star, Calendar, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

const Service = () => {
  // State for interactive elements
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [expandedService, setExpandedService] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [bookedService, setBookedService] = useState(null);
  const [ageFilter, setAgeFilter] = useState(null);

  // Services data with more details
  const services = [
    { 
      id: 1,
      title: 'Cardiology', 
      desc: 'Heart-related treatments and checkups.',
      detailedDesc: 'Our pediatric cardiology team specializes in diagnosing and treating heart conditions in children, from newborns to teenagers. We offer non-invasive treatments and family-centered care.',
      icon: '❤️',
      ageGroups: [0, 18],
      waitTime: '1-2 weeks',
      doctors: 4,
      favorite: false
    },
    { 
      id: 2,
      title: 'Neurology', 
      desc: 'Brain and nervous system specialists.',
      detailedDesc: 'Child neurologists treat conditions ranging from epilepsy and migraines to complex neurological disorders. We use child-friendly approaches to make examinations comfortable.',
      icon: '🧠',
      ageGroups: [2, 18],
      waitTime: '2-3 weeks',
      doctors: 3,
      favorite: false
    },
    { 
      id: 3,
      title: 'Pediatrics', 
      desc: 'Healthcare for infants, children, and adolescents.',
      detailedDesc: 'General pediatric care for all childhood health needs, including vaccinations, developmental screenings, and common illnesses. Our offices are designed to be welcoming for children.',
      icon: '👶',
      ageGroups: [0, 18],
      waitTime: '3-5 days',
      doctors: 6,
      favorite: false
    },
    { 
      id: 4,
      title: 'Orthopedics', 
      desc: 'Bone, joint, and muscle care.',
      detailedDesc: 'Specializing in fractures, scoliosis, sports injuries, and congenital conditions. We use casts and braces decorated with fun designs chosen by our young patients.',
      icon: '🦴',
      ageGroups: [2, 18],
      waitTime: '1-2 weeks',
      doctors: 2,
      favorite: false
    },
    { 
      id: 5,
      title: 'Dermatology', 
      desc: 'Skin, hair, and nail treatments.',
      detailedDesc: 'Treating childhood skin conditions like eczema, acne, and birthmarks with gentle, effective treatments. Our examination rooms feature colorful wall art to distract during procedures.',
      icon: '💆',
      ageGroups: [0, 18],
      waitTime: '3-4 weeks',
      doctors: 2,
      favorite: false
    },
    { 
      id: 6,
      title: 'Radiology', 
      desc: 'Medical imaging for accurate diagnosis.',
      detailedDesc: 'Child-friendly MRI, X-Ray, and ultrasound services with themed examination rooms and interactive tools to explain procedures. Parents can accompany children during scans.',
      icon: '📷',
      ageGroups: [0, 18],
      waitTime: '1 week',
      doctors: 5,
      favorite: false
    },
  ];

  // Categories for filtering
  const categories = [...new Set(services.map(service => service.title))];

  // Filter services based on search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? service.title === selectedCategory : true;
    const matchesAge = ageFilter 
      ? (ageFilter >= service.ageGroups[0] && ageFilter <= service.ageGroups[1])
      : true;
    return matchesSearch && matchesCategory && matchesAge;
  });

  // Toggle service expansion
  const toggleExpand = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  // Toggle favorite
  const toggleFavorite = (serviceId) => {
    setFavorites(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };

  // Book a service
  const bookService = (serviceTitle) => {
    setBookedService(serviceTitle);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
    {/* Hero Section with Animation */}
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-cover bg-center h-72" 
      style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-60"></div>
      <div className="relative z-10 flex justify-center items-center h-full">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-6 py-3 m-2 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md"
          >
            <a href="/appointment">Book an Appointment</a>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-6 py-3 m-2 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md"
          >
            <a href="/Mri">Book an MRI Scan</a>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-6 py-3 m-2 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md"
          >
            <a href="/Xray">Book an X-Ray</a>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>

      {/* Search and Filter Section */}
      <section id="services-section" className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Find the Right Service</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-blue-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="w-full flex justify-between items-center px-4 py-2 border-2 border-blue-200 rounded-lg bg-white"
              >
                {selectedCategory || 'Filter by Category'}
                {showCategories ? <ChevronUp /> : <ChevronDown />}
              </button>
              
              {showCategories && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setShowCategories(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${!selectedCategory ? 'bg-blue-100' : ''}`}
                  >
                    All Categories
                  </button>
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowCategories(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${selectedCategory === category ? 'bg-blue-100' : ''}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Age Filter */}
            <div className="relative">
              <button
                onClick={() => setAgeFilter(ageFilter ? null : 5)} // Default to showing 5yo filter
                className="w-full flex justify-between items-center px-4 py-2 border-2 border-blue-200 rounded-lg bg-white"
              >
                {ageFilter ? `Age: ${ageFilter}` : 'Filter by Age'}
                {ageFilter ? <X size={18} onClick={(e) => {
                  e.stopPropagation();
                  setAgeFilter(null);
                }} /> : <ChevronDown />}
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div 
                key={service.id} 
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  expandedService === service.id ? 'border-2 border-blue-400' : ''
                }`}
              >
                {/* Service Header */}
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpand(service.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <span className="text-3xl mr-3">{service.icon}</span>
                      <div>
                        <h2 className="text-xl font-bold text-blue-900">{service.title}</h2>
                        <p className="text-blue-600">{service.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(service.id);
                      }}
                      className="text-gray-400 hover:text-yellow-500"
                      aria-label={favorites.includes(service.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Star 
                        size={24} 
                        fill={favorites.includes(service.id) ? 'gold' : 'none'} 
                        stroke={favorites.includes(service.id) ? 'gold' : 'currentColor'}
                      />
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedService === service.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-700 mb-4">{service.detailedDesc}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">Age Range</p>
                          <p className="font-semibold">{service.ageGroups[0]}-{service.ageGroups[1]} years</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">Wait Time</p>
                          <p className="font-semibold">{service.waitTime}</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">Specialists</p>
                          <p className="font-semibold">{service.doctors} doctors</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => bookService(service.title)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                        >
                          Book Now
                        </button>
                        <button
                          onClick={() => toggleExpand(service.id)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-bold text-blue-900 mb-2">No services found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                  setAgeFilter(null);
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Booked Service Confirmation */}
      {bookedService && (
        <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg max-w-sm z-50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">Appointment Requested!</h3>
              <p className="mt-1">
                <strong>{bookedService}</strong> service<br />
                Our team will contact you shortly
              </p>
            </div>
            <button 
              onClick={() => setBookedService(null)}
              className="text-green-700 hover:text-green-900"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Contact Information Section */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'EMERGENCY', detail: '0141 201 1100', icon: <Phone className="text-yellow-300 mx-auto" /> },
              { title: 'LOCATION', detail: '1345 Govan Road, G51 4TF Glasgow UK', icon: <MapPin className="text-yellow-300 mx-auto" /> },
              { title: 'EMAIL', detail: 'info.qeht@nhs.net', icon: <Mail className="text-yellow-300 mx-auto" /> },
              { title: 'WORKING HOURS', detail: 'Mon-Sat 09:00-20:00, Sunday Emergency only', icon: <Clock className="text-yellow-300 mx-auto" /> },
            ].map((info, index) => (
              <div key={index} className="bg-blue-800 rounded-xl p-6 text-center hover:bg-blue-700 transition">
                <div className="mb-3">
                  {info.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{info.title}</h3>
                <p>{info.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Children's Hospital Portal</h3>
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

export default Service;