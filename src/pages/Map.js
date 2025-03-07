import React, { useState, useEffect } from 'react';

const Map = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const goToSlide = (index) => {
    setActiveSlide(index);
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="text-center">
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300"><a href="/appointment">Book an Appointment</a></button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300"><a href="/Mri">Book an MRI Scan</a></button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300"><a href="/Xray">Book an X-Ray</a></button>
          </div>
        </div>
      </section>
    
      {/* Carousel Section */}
      <div id="animation-carousel" className="relative w-full">
        <div className="relative h-72 overflow-hidden rounded-lg md:h-80">
          {/* Slide 1 */}
          <div className={`absolute duration-200 ease-linear w-full h-full ${activeSlide === 0 ? 'block' : 'hidden'}`}>
            <img src="/images/hospital_map.jpg" alt="Hospital Map" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-full h-full object-cover" />
          </div>

          {/* Slide 2 */}
          <div className={`absolute duration-200 ease-linear w-full h-full ${activeSlide === 1 ? 'block' : 'hidden'}`}>
            <img src="/images/hospital2_map.jpg" alt="Hospital Map" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-full h-full object-cover" />
          </div>

          {/* Slide 3 */}
          <div className={`absolute duration-200 ease-linear w-full h-full ${activeSlide === 2 ? 'block' : 'hidden'}`}>
            <img src="/images/hospital3_map.jpg" alt="Hospital Map" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-full h-full object-cover" />
          </div>
        </div>

        {/* Carousel Controls */}
        <button 
          type="button" 
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
          onClick={() => goToSlide((activeSlide - 1 + totalSlides) % totalSlides)}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button 
          type="button" 
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
          onClick={() => goToSlide((activeSlide + 1) % totalSlides)}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>

      {/* Contact Section */}
      <section className="bg-white p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[{ title: 'EMERGENCY', detail: '0141 201 1100' }, { title: 'LOCATION', detail: '1345 Govan Road, G51 4TF Glasgow UK' }, { title: 'EMAIL', detail: 'info.qeht@nhs.net' }, { title: 'WORKING HOURS', detail: 'Mon-Sat 09:00-20:00, Sunday Emergency only' }]
            .map((info, index) => (
              <div key={index} className="bg-blue-400 text-white p-4 rounded-lg text-center">
                <h3 className="font-bold text-lg">{info.title}</h3>
                <p>{info.detail}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-500 text-white p-6 text-center">
        <p>&copy; 2025 ASIM MIAN</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">LinkedIn</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Instagram</a>
        </div>
      </footer>
    </div>
  );
}

export default Map;
