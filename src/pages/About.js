import React from 'react';

const About = () => {
  const doctors = [
    { name: 'Doctor Goldberg', specialty: 'NEUROLOGY', image: '/assets/images/doctor1.jpeg' },
    { name: 'Doctor Shaw', specialty: 'LUNGS', image: '/assets/images/doctor2.jpeg' },
    { name: 'Doctor Stewart', specialty: 'BRAIN', image: '/assets/images/doctor3.jpeg' },
    { name: 'Doctor Smith', specialty: 'OTOLARYNGOLOGY', image: '/assets/images/doctor4.jpeg' },
    { name: 'Doctor Abrara', specialty: 'DERMATOLOGY', image: '/assets/images/doctor5.jpeg' },
    { name: 'Doctor Jackson', specialty: 'CARDIOVASCULAR', image: '/assets/images/doctor6.jpeg' },
  ];

  const contactInfo = [
    { title: 'EMERGENCY', details: '0141 201 1100' },
    { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK' },
    { title: 'EMAIL', details: 'info.qeht@nhs.net' },
    { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: 'url(/assets/images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="text-center">
          <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300"><a href="/appointment">Book an Appointment</a></button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300"><a href="/Mri">Book an MRI Scan</a></button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300"><a href="/Xray">Book an X-Ray</a></button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="p-8 bg-white-50">
        <h1 className="text-3xl text-blue-600 font-bold text-center">ABOUT US</h1>
        <div className="flex flex-col md:flex-row mt-4 items-center">
          <img src="/assets/images/aboutus.jpg" alt="About Us" className="w-full md:w-1/3 rounded-lg shadow-md" />
          <div className="mt-4 md:mt-0 md:ml-6">
            <h2 className="text-xl font-semibold text-blue-700">WELCOME TO ASIM MIAN</h2>
            <p className="text-gray-700 mt-2">
            At Clyde Children's Hospital, we are dedicated to providing compassionate and high-quality care for young patients in a welcoming and supportive environment. Our team of skilled healthcare professionals works tirelessly to ensure that every child receives the best medical attention tailored to their needs.
            Beyond medical care, we prioritize emotional well-being by creating a child-friendly atmosphere with engaging activities and interactive programs. Our commitment extends to families, offering guidance and support throughout their journey.
            With a focus on innovation and excellence, Clyde Children's Hospital continues to evolve, integrating advanced medical treatments and technology to enhance patient care. We strive to make every child's hospital experience as comfortable and positive as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="p-8">
  <h1 className="text-2xl font-bold text-blue-800 text-center">Our Doctors</h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
    {doctors.map((doctor, index) => (
      <div
        key={index}
        className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.175,_0.885,_0.32,_1.275)] hover:scale-105"
      >
        <img src={doctor.image} alt={doctor.name} className="w-full h-48 object-cover" />
        <div className="bg-blue-400 text-white p-4">
          <h2 className="font-bold text-lg">{doctor.name}</h2>
          <p className="font-semibold text-yellow-300">{doctor.specialty}</p>
        </div>
        <div className="bg-yellow-300 text-center p-2 hover:bg-blue-600 transition duration-300">
          <button className="text-white font-semibold hover:underline">View Profile</button>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Contact Section */}
      <section className="p-8 bg-white">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-blue-400 text-white p-4 rounded-md w-48 text-center">
              <h3 className="font-bold">{info.title}</h3>
              <p>{info.details}</p>
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

export default About;

