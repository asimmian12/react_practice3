import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';

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

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isHovering, setIsHovering] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Retrieve the user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
      // Add slight delay for loading animation
      setTimeout(() => setIsLoaded(true), 300);
    }
  }, []);

  if (!userData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
             </div>
           </motion.div>
         </div>
       </motion.section>
 
      {/* Cards Section with Floating Animation */}
      <section className="p-4">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 justify-center mt-6">
          {/* Account Management Card */}
          <div 
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1"
            onMouseEnter={() => setIsHovering('account')}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className="flex justify-end px-4 pt-4">
              <button className="inline-block text-gray-500 hover:bg-gray-100 rounded-lg text-sm p-1.5">
                <span className="sr-only">Open dropdown</span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center pb-6">
              <div className="relative">
                <img
                  className={`w-24 h-24 mb-3 rounded-full shadow-lg transition-transform duration-300 ${isHovering === 'account' ? 'scale-110' : ''}`}
                  src={userData.hospital_account_img || './images/account2.png'}
                  alt="User profile"
                />
                {isHovering === 'account' && (
                  <div className="absolute inset-0 rounded-full bg-blue-500 bg-opacity-20 animate-ping"></div>
                )}
              </div>
              <h5 className="mb-1 text-xl font-medium text-gray-900">{userData.firstName} {userData.surname}</h5>
              <span className="text-sm text-gray-500">{userData.position}</span>
              <div className="flex mt-4">
                <Link
                  to="/account"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  View Account Details
                </Link>
              </div>
            </div>
          </div>

          {/* Games Card */}
          <div 
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1"
            onMouseEnter={() => setIsHovering('appointment')}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className="flex justify-end px-4 pt-4">
              <button className="inline-block text-gray-500 hover:bg-gray-100 rounded-lg text-sm p-1.5">
                <span className="sr-only">Open dropdown</span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center pb-6">
              <div className="relative">
                <img
                  className={`w-24 h-24 mb-3 rounded-full shadow-lg transition-transform duration-300 ${isHovering === 'appointment' ? 'scale-110' : ''}`}
                  alt="Appointment"
                  src='./images/account2.png'
                />
                {isHovering === 'appointment' && (
                  <div className="absolute inset-0 rounded-full bg-blue-500 bg-opacity-20 animate-ping"></div>
                )}
              </div>
              <h5 className="mb-1 text-xl font-medium text-gray-900">Appointment</h5>
              <span className="text-sm text-gray-500">Click here to view an appointment!</span>
              <div className="flex mt-4">
                <Link
                  to="/appointment"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Go to Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section - Consistent with Login Page */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
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

      {/* Footer - Consistent with Login Page */}
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

      {/* Add some floating decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-100 opacity-20"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;