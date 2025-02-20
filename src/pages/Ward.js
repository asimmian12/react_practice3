// src/pages/WardsPage.js
import React from 'react';

const Wards = () => {
    const contactInfo = [
        { title: 'EMERGENCY', details: '0141 201 1100' },
        { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK' },
        { title: 'EMAIL', details: 'info.qeht@nhs.net' },
        { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only' },
      ];
  return (
    <div>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-primary">Welcome to the Children's Wards</h2>
        <p className="mt-4 text-gray-700">
          The children's wards are bright and colorful places where doctors and nurses take care of you if you need to stay in the hospital for treatment. You will have your own bed and may have a roommate, but don’t worry – we will make sure you feel comfortable.
        </p>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold">What to Expect in the Ward</h3>
          <ul className="list-disc pl-5 mt-4">
            <li>Friendly nurses will help take care of you and make sure you feel at ease.</li>
            <li>You will have toys, books, and games to keep you entertained.</li>
            <li>The doctors will come to check on you regularly and explain everything in a way that you can understand.</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold">For Kids</h3>
          <p className="text-gray-700 mt-4">
            Staying in the hospital might feel strange, but we’ll do everything to make it fun! You can watch cartoons, play games on the tablet, or talk to the friendly staff if you feel nervous.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Did You Know?</h3>
          <p className="text-gray-700 mt-4">
            The children’s ward is a safe space for you to heal and rest. You will be able to visit different rooms and meet doctors who specialize in treating kids!
          </p>
        </div>
      </div>

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

export default Wards;
