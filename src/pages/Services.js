import React from 'react';

const Service = () => {
  return (
  <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: 'url(/assets/images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="text-center">
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded">Book an Appointment</button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded">Book an MRI Scan</button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded">Book an X-Ray</button>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Cardiology', desc: 'Heart-related treatments and checkups.' },
            { title: 'Neurology', desc: 'Brain and nervous system specialists.' },
            { title: 'Pediatrics', desc: 'Healthcare for infants, children, and adolescents.' },
            { title: 'Orthopedics', desc: 'Bone, joint, and muscle care.' },
            { title: 'Dermatology', desc: 'Skin, hair, and nail treatments.' },
            { title: 'Radiology', desc: 'Medical imaging for accurate diagnosis.' },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow-md rounded-2xl border-t-4 border-yellow-400 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">{service.title}</h2>
              <p className="text-gray-600">{service.desc}</p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                Learn More
              </button>
            </div>
          ))}    
        </div>
      </section>
      <section className="p-8 bg-white">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="flex justify-center space-x-6 mt-4">
          {[
            { title: 'EMERGENCY', detail: '0141 201 1100' },
            { title: 'LOCATION', detail: '1345 Govan Road, G51 4TF Glasgow UK' },
            { title: 'EMAIL', detail: 'info.qeht@nhs.net' },
            { title: 'WORKING HOURS', detail: 'Mon-Sat 09:00-20:00, Sunday Emergency only' }
          ].map((info, index) => (
            <div key={index} className="bg-blue-400 text-white p-4 rounded-md w-48 text-center">
              <h3 className="font-bold">{info.title}</h3>
              <p>{info.detail}</p>
            </div>
          ))}
        </div>
      </section>
      
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
};

export default Service;