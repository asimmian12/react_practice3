import React from 'react';

const Theatres = () => {
    const contactInfo = [
        { title: 'EMERGENCY', details: '0141 201 1100' },
        { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK' },
        { title: 'EMAIL', details: 'info.qeht@nhs.net' },
        { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only' },
      ];
  return (
    <div>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-primary">Welcome to the Surgical Theatres</h2>
        <p className="mt-4 text-gray-700">
          The surgical theatres are special rooms where doctors perform surgeries to help fix things in your body. Don’t worry – we have friendly nurses and doctors who will take care of you throughout the entire process.
        </p>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold">What Happens in Surgery?</h3>
          <ul className="list-disc pl-5 mt-4">
            <li>You will meet a lot of friendly doctors and nurses who will explain everything that’s going to happen.</li>
            <li>You will fall asleep during the surgery with the help of special medicine, so you won’t feel any pain.</li>
            <li>After the surgery, you’ll rest in a recovery room while the nurses take care of you.</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold">For Kids</h3>
          <p className="text-gray-700 mt-4">
            Surgery can sound a little scary, but the doctors and nurses will make sure you feel comfortable and safe. They’ll explain everything and answer any questions you have!
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold">Did You Know?</h3>
          <p className="text-gray-700 mt-4">
            Many kids need surgery, and it helps them get better. You’ll have the best doctors taking care of you, and we’re always here to help you feel better.
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

export default Theatres;
