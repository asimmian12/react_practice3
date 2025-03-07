import React from 'react';

const Home = () => {
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

      {/* Our Doctors Section */}
      <section className="p-8 text-center"> 
  <h2 className="text-3xl font-bold text-blue-700 mb-6">Our Doctors</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { name: 'Doctor Goldberg', specialty: 'NEUROLOGY', image: './images/doctor1.jpeg' },
      { name: 'Doctor Shaw', specialty: 'LUNGS', image: './images/doctor2.jpeg' },
      { name: 'Doctor Stewart', specialty: 'BRAIN', image: './images/doctor3.jpeg' }
    ].map((doctor, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-xl overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.175,_0.885,_0.32,_1.275)] hover:scale-105"
      >
        <img src={doctor.image} alt={doctor.name} className="w-full h-48 object-cover" />
        <div className="p-4 bg-blue-100">
          <h3 className="text-xl font-semibold text-blue-700">{doctor.name}</h3>
          <p className="text-gray-600">{doctor.specialty}</p>
          <button className="mt-2 bg-yellow-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">View Profile</button>
        </div>
      </div>
    ))}
  </div>
</section>


      
      <section className="p-8 bg-white-100 text-center">
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
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">LinkedIn</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
