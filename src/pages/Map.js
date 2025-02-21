import React from 'react'

const Map = () => { 
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: 'url(./assets/images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="text-center">
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">Book an Appointment</button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">Book an MRI Scan</button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">Book an X-Ray</button>
          </div>
        </div>
      </section>
      
      {/* Map Title */}
      <div className="text-center py-4">
        <h1 className="text-4xl font-semibold">Map</h1>
      </div>

      {/* Hospital Map Image */}
      <div className="flex justify-center py-4">
        <img src="/assets/images/hospital_map.jpg" alt="Hospital Map" className="max-w-full h-auto" />
      </div>
      
      {/* Hospital Map Image */}
      <div className="flex justify-center py-4">
        <img src="/assets/images/hospital2_map.jpg" alt="Hospital Map" className="max-w-full h-auto" />
      </div>
      
      {/* Hospital Map Image */}
      <div className="flex justify-center py-4">
        <img src="/assets/images/hospital3_map.jpg" alt="Hospital Map" className="max-w-full h-auto" />
      </div>


      {/* Contact Section */}
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
