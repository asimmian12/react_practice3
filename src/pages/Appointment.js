import React, { useEffect, useState } from 'react';

const Appointment = () => {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    // Retrieve the user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUserData(JSON.parse(storedUser));
    }
    }, []);
  
  if (!userData) {
    return <div>Loading...</div>;
  }

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

      <p>Hi {userData.firstName}, {userData.surname} Welcome to our clyde portal hospital</p>
      <br></br>
      <p>Last Active:  {userData.created_at}</p>
      <br></br>
      <p>Telephone: {userData.telephone_number}</p>
      <br></br>
      <p>Your upcoming appointment is with is listed below</p>
      <br></br>
      <p>The department Name:  {userData.department_name}</p>
      <br></br>
      <p>The department details:  {userData.details}</p>
      
      {/* Schedule Hours Section */}
      <div className="flex items-center justify-center min-h-screen bg-white-100 p-6">
        <div className="bg-blue-400 p-6 rounded-xl w-full max-w-md h-auto text-center">
          <h2 className="text-xl font-semibold text-white mb-4">Schedule Hours</h2>
          <div className="text-white space-y-2">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <div className="flex justify-between" key={day}>
                <span>{day}</span>
                <span>{day === 'Sunday' ? 'Closed' : '09:00 AM - 07:00 PM'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="bg-white-100 p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[ 
            { title: 'EMERGENCY', detail: '0141 201 1100' },
            { title: 'LOCATION', detail: '1345 Govan Road, G51 4TF Glasgow UK' },
            { title: 'EMAIL', detail: 'info.qeht@nhs.net' },
            { title: 'WORKING HOURS', detail: 'Mon-Sat 09:00-20:00, Sunday Emergency only' }
          ].map((info, index) => (
            <div key={index} className="bg-blue-400 text-white p-4 rounded-lg text-center">
              <h3 className="font-bold text-lg">{info.title}</h3>
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
};

export default Appointment;
