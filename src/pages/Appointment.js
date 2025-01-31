import React from 'react';



const Appointment = () => {
  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-lg font-bold">APPOINTMENT</div>
        <div>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">Register</button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="relative w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('/doctor.jpg')" }}>
        <div className="absolute inset-0 bg-blue-500 bg-opacity-30 flex justify-center items-center">
          <h1 className="text-white text-3xl font-bold">APPOINTMENT</h1>
        </div>
      </div>
      
      {/* Appointment Form */}
      <div className="flex justify-center my-10">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-lg font-bold mb-4">Appointment</h2>
          <input type="text" placeholder="Name" className="w-full p-2 mb-2 rounded text-black" />
          <input type="email" placeholder="Email" className="w-full p-2 mb-2 rounded text-black" />
          <input type="tel" placeholder="Phone" className="w-full p-2 mb-2 rounded text-black" />
          <textarea placeholder="Message" className="w-full p-2 mb-2 rounded text-black"></textarea>
          <button className="w-full bg-yellow-400 p-2 mt-2 rounded">Submit</button>
        </div>
      </div>
      
      {/* Schedule Hours */}
      <div className="flex justify-center">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-lg font-bold mb-4">Schedule Hours</h2>
          <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
          <p>Saturday: 10:00 AM - 3:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="flex justify-center gap-4 my-10">
        <div className="bg-blue-500 text-white p-4 rounded-lg w-40 text-center">Call Us: 0141 201 1100</div>
        <div className="bg-blue-500 text-white p-4 rounded-lg w-40 text-center">Email: info.qeht@nhs.net</div>
        <div className="bg-blue-500 text-white p-4 rounded-lg w-40 text-center">Location: 1345 Govan Road, G51 4TF Glasgow UK</div>
      </div>
      
      {/* Footer */}
      <footer className="bg-blue-500 text-white p-6 text-center">
        <p>&copy; 2025 ASIM MIAN</p>
        <div className="flex justify-center gap-4 mt-2">
          <span className="bg-white text-blue-500 p-2 rounded-full">LinkedIn</span>
          <span className="bg-white text-blue-500 p-2 rounded-full">Facebook</span>
          <span className="bg-white text-blue-500 p-2 rounded-full">Instagram</span>
        </div>
      </footer>
    </div>
  );
};


export default Appointment;