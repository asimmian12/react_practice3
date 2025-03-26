import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const contactInfo = [
  { title: 'EMERGENCY', details: '0141 201 1100' },
  { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK' },
  { title: 'EMAIL', details: 'info.qeht@nhs.net' },
  { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only' },
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
    <div className={`min-h-screen bg-white transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section with Parallax Effect */}
      <section 
        className="relative bg-cover bg-center h-64 bg-fixed" 
        style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg animate-fadeIn">
              Welcome Back, {userData.firstName} {userData.surname}!
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
              {['Book an Appointment', 'Book an MRI Scan', 'Book an X-Ray'].map((text, index) => (
                <button 
                  key={index}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onMouseEnter={() => setIsHovering(index)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <span className={`inline-block ${isHovering === index ? 'animate-bounce' : ''}`}>
                    {text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      {/* Contact Section with Interactive Cards */}
      <section className="bg-white-100 p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${isHovering === `contact-${index}` ? 'transform scale-105 z-10' : ''}`}
              onMouseEnter={() => setIsHovering(`contact-${index}`)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <h3 className="font-bold text-xl mb-3">{info.title}</h3>
              <p className="text-blue-100">{info.details}</p>
              {isHovering === `contact-${index}` && (
                <div className="mt-4 animate-fadeIn">
                  <button className="text-xs bg-white text-blue-600 px-3 py-1 rounded-full">
                    {info.title === 'EMERGENCY' ? 'Call Now' : 'More Info'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 text-center">
        <p className="mb-4">&copy; 2025 ASIM MIAN - Hospital Portal</p>
        <div className="flex justify-center gap-6">
          {['linkedin', 'facebook', 'instagram'].map((social, index) => (
            <a
              key={index}
              href={`https://${social}.com`}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-white text-blue-600 p-3 rounded-full hover:bg-blue-100 transition-all duration-300 flex items-center justify-center w-12 h-12 ${isHovering === `social-${index}` ? 'animate-bounce' : ''}`}
              onMouseEnter={() => setIsHovering(`social-${index}`)}
              onMouseLeave={() => setIsHovering(null)}
            >
              {social === 'linkedin' && <span className="text-xl">Li</span>}
              {social === 'facebook' && <span className="text-xl">Fb</span>}
              {social === 'instagram' && <span className="text-xl">Ig</span>}
            </a>
          ))}
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