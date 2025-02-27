import React from 'react';

const Play = () => {
  const contactInfo = [
    { title: 'EMERGENCY', details: '0141 201 1100' },
    { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK' },
    { title: 'EMAIL', details: 'info.qeht@nhs.net' },
    { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only' },
  ];
  return (
    <div>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-primary">Welcome to the Play Areas</h2>
        <p className="mt-4 text-gray-700">
          Our play areas are full of fun toys, games, and activities to keep you busy while you wait for your doctor’s appointment or treatment. It’s a place where you can relax, make new friends, and have fun!
        </p>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold">What You Can Do</h3>
          <ul className="list-disc pl-5 mt-4">
            <li>Play with toys and puzzles.</li>
            <li>Watch fun cartoons or movies on the TV.</li>
            <li>Join in group activities with other kids.</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold">For Kids</h3>
          <p className="text-gray-700 mt-4">
            The play areas are designed just for you! You’ll find lots of activities to keep you busy. From building with blocks to coloring and drawing – there’s something for everyone!
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Did You Know?</h3>
          <p className="text-gray-700 mt-4">
            Play is very important for kids, even when you're in the hospital! It helps you feel happy and relaxed, and makes waiting easier.
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

export default Play;
