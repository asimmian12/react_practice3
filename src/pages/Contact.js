import React, { useState } from 'react';

const contactInfo = [
  { title: 'EMERGENCY', details: '0141 201 1100' },
  { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK' },
  { title: 'EMAIL', details: 'info.qeht@nhs.net' },
  { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only' },
];

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
     
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="text-center">
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">
              <a href="/appointment">Book an Appointment</a>
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">
              <a href="/Mri">Book an MRI Scan</a>
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">
              <a href="/Xray">Book an X-Ray</a>
            </button>
          </div>
        </div>
      </section>

   
      <section className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Contact Us</h1>
        <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your Email"
              required
            />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 w-full">
            Submit
          </button>
        </form>
      </section>

    
      <section className="bg-white p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-blue-400 text-white p-4 rounded-lg text-center shadow-md">
              <h3 className="font-bold text-lg">{info.title}</h3>
              <p>{info.details}</p>
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
}

export default Contact;
