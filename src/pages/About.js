import React from 'react';

const About= () => {
  return (
    
    <div className="bg-gray-50 min-h-screen">
      <section className="p-8">
        <h1 className="text-3xl text-blue-600 font-bold">ABOUT US</h1>
        <div className="flex mt-4">
          <img src="path_to_image" alt="About Us" className="w-1/3 rounded-lg shadow-md" />
          <div className="ml-6">
            <h2 className="text-xl font-semibold text-blue-700">WELCOME TO ASIM MIAN</h2>
            <p className="text-gray-700 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare.
              Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in.
            </p>
          </div>
        </div>
      </section>

      <section className="p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800">Our Doctors</h2>
        <div className="flex justify-center space-x-6 mt-4">
          {['Doctor Goldberg', 'Doctor Shaw', 'Doctor Stewart'].map((name, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 w-64">
              <img src={`path_to_image${index + 1}`} alt={name} className="w-full h-40 object-cover rounded-t-lg" />
              <div className="bg-blue-400 text-white text-center p-2 mt-2">
                <h3 className="font-semibold">{name}</h3>
                <p className="text-yellow-400 font-bold">NEUROLOGY</p>
              </div>
              <button className="bg-yellow-400 w-full py-1 mt-2 text-white font-bold rounded">View Profile</button>
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
     <span className="bg-white text-blue-500 p-2 rounded-full">LinkedIn</span>
     <span className="bg-white text-blue-500 p-2 rounded-full">Facebook</span>
     <span className="bg-white text-blue-500 p-2 rounded-full">Instagram</span>
   </div>
 </footer>
  </div>
  );
};

export default About;
