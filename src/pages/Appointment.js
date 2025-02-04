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