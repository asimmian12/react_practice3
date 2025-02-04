import React, { useState } from 'react';

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
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
            placeholder="example@domain.com"
            required
          />
        </div>
        <button type="submit" className="text-white bg-blue-700 rounded-lg px-5 py-2.5 w-full">
          Contact Us Now
        </button>
      </form>
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
}

export default Contact;
