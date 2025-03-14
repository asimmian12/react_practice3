import React from 'react';

const Appointment = () => {
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

      {/* Appointment Form */}
      <div className="flex justify-center my-10">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-lg font-bold mb-4">Appointment</h2>
          <input type="text" placeholder="Name" className="w-full p-2 mb-2 rounded text-black" required/>
          <input type="email" placeholder="Email" className="w-full p-2 mb-2 rounded text-black" required/>
          <input type="tel" placeholder="Phone" className="w-full p-2 mb-2 rounded text-black" required/>
          <textarea placeholder="Message" className="w-full p-2 mb-2 rounded text-black"></textarea>
          <button className="w-full bg-yellow-400 p-2 mt-2 rounded hover:bg-blue-600 transition duration-300"><a href="https://forms.office.com/e/1hDUaX57ki">Submit</a></button>
        </div>
      </div>

      {/* Schedule Hours Section */}
      <div className="flex items-center justify-center min-h-screen bg-white-100 p-6">
        <div className="bg-blue-400 p-6 rounded-xl w-full max-w-md h-auto text-center">
          <h2 className="text-xl font-semibold text-white mb-4">Schedule Hours</h2>
          <div className="text-white space-y-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <div className="flex justify-between" key={day}>
                <span>{day}</span>
                <span>{day === 'Sunday' ? 'Closed' : '09:00 AM - 07:00 PM'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="bg-white-100 p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[ 
            { title: 'EMERGENCY', detail: '0141 201 1100' },
            { title: 'LOCATION', detail: '1345 Govan Road, G51 4TF Glasgow UK' },
            { title: 'EMAIL', detail: 'info.qeht@nhs.net' },
            { title: 'WORKING HOURS', detail: 'Mon-Sat 09:00-20:00, Sunday Emergency only' }
          ].map((info, index) => (
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
};

export default Appointment;
