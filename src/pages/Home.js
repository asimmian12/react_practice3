import React, { useEffect, useState } from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: 'url(./assets/images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="text-center">
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300"><a href="/appointment">Book an Appointment</a></button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300"><a href="/Mri">Book an MRI Scan</a></button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300"><a href="/Xray">Book an X-Ray</a></button>
          </div>
        </div>
      </section>

      {/* Our Doctors Section */}
      <section className="p-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Our Doctors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Doctor Goldberg', specialty: 'NEUROLOGY', image: './assets/images/doctor1.jpeg' },
            { name: 'Doctor Shaw', specialty: 'LUNGS',  image: './assets/images/doctor2.jpeg' },
            { name: 'Doctor Stewart', specialty: 'BRAIN', image: './assets/images/doctor3.jpeg' }
          ].map((doctor, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl overflow-hidden">
              <img src={doctor.image} alt={doctor.name} className="w-full h-48 object-cover" />
              <div className="p-4 bg-blue-100">
                <h3 className="text-xl font-semibold text-blue-700">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialty}</p>
                <button className="mt-2 bg-yellow-400 text-white px-4 py-2 rounded">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Specialties Section */}
      <section className="p-8 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Our Specialties</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            'Neurology', 'Renals', 'Oncology', 'Otolaryngology',
            'Ophthalmology', 'Cardiovascular', 'Pulmonology',
            'Renal Medicine', 'Gastroenterology', 'Urology',
            'Dermatology', 'Gynaecology'
          ].map((specialty, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full mb-2">
                <span className="text-2xl">❤</span>
              </div>
              <p className="text-gray-700">{specialty}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="p-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Contact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-blue-100 rounded-xl">
            <h3 className="font-bold">EMERGENCY</h3>
            <p>041 201 1101</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-xl">
            <h3 className="font-bold">LOCATION</h3>
            <p>1845 Green Road, G61 6TT Glasgow UK</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-xl">
            <h3 className="font-bold">EMAIL</h3>
            <p>info@asimmian.net</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-xl">
            <h3 className="font-bold">WORKING HOURS</h3>
            <p>Mon-Sat: 08:00-20:00<br />Sunday: Emergency only</p>
          </div>
        </div>
      </section>

      {/* Footer */}
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

export default Home;