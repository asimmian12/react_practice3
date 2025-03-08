import React from 'react';

const doctors = [
  { name: 'Doctor Goldberg', specialty: 'NEUROLOGY', image: './images/doctor1.jpeg' },
  { name: 'Doctor Shaw', specialty: 'LUNGS', image: './images/doctor2.jpeg' },
  { name: 'Doctor Stewart', specialty: 'BRAIN', image: './images/doctor3.jpeg' },
  { name: "Doctor Smith", specialty: 'OTOLARYNGOLOGY', image: './images/doctor4.jpeg' },
  { name: 'Doctor Abrara', specialty: 'DERMATOLOGY', image: './images/doctor5.jpeg' },
  { name: 'Doctor Jackson', specialty: 'CARDIOVASCULAR', image: './images/doctor6.jpeg' },
];

const contactInfo = [
  { title: 'EMERGENCY', details: '0141 201 1100' },
  { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK' },
  { title: 'EMAIL', details: 'info.qeht@nhs.net' },
  { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only' },
];

const Doctor = () => { 
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="text-center">
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">Book an Appointment</button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">Book an MRI Scan</button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">Book an X-Ray</button>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="p-4">
        <section className="text-center my-8">
          <h1 className="text-2xl font-bold text-blue-800">Our Doctors</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {doctors.map((doctor, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.175,_0.885,_0.32,_1.275)] hover:scale-105">
                <img src={doctor.image} alt={doctor.name} className="w-full h-48 object-cover" />
                <div className="bg-blue-400 text-white p-4">
                  <h2 className="font-bold text-lg">{doctor.name}</h2>
                  <p className="font-semibold text-yellow-300">{doctor.specialty}</p>
                </div>
                <div className="bg-yellow-300 text-center p-2 hover:bg-blue-600 transition duration-300">
                  <button className="text-white font-semibold"><a href="https://forms.office.com/e/DygXuhpVFt">View Profile</a></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* Contact Section */}
      <section className="bg-white-100 p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-blue-400 text-white p-4 rounded-lg text-center">
              <h3 className="font-bold text-lg">{info.title}</h3>
              <p>{info.details}</p>
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

export default Doctor;


