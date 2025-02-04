import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">Register</button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="relative w-full h-64 bg-cover bg-center" style={{ backgroundImage: "url('/doctor.jpg')" }}>
        <div className="absolute inset-0 bg-blue-500 bg-opacity-30 flex justify-center items-center">
          <h1 className="text-white text-3xl font-bold">HOME</h1>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 my-6">
        <button className="bg-blue-500 text-white px-6 py-3 rounded">Book an Appointment</button>
        <button className="bg-blue-500 text-white px-6 py-3 rounded">See Our Doctors</button>
        <button className="bg-blue-500 text-white px-6 py-3 rounded">Contact Us</button>
      </div>
      
      {/* Our Doctors */}
      <section className="text-center my-10">
        <h2 className="text-2xl font-bold mb-6">Our Doctors</h2>
        <div className="flex justify-center space-x-6">
          <div className="bg-white shadow-md p-4 rounded-lg text-center w-64">
            <img src="assets/images/department/neurology_doctor.jpg" alt="Doctor 1" altName="1st Doctor" className="w-full rounded" />
            <h3 className="mt-2 font-semibold">Dr. John Doe</h3>
            <p>Cardiologist</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg text-center w-64">
            <img src="assets/images/department/neurology_doctor.jpg" alt="Doctor 2" altName="2nd Doctor" className="w-full rounded" />
            <h3 className="mt-2 font-semibold">Dr. Lisa Smith</h3>
            <p>Neurologist</p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-lg text-center w-64">
            <img src="assets/images/department/neurology_img2.jpg" alt="Doctor 3" altName="3rd Doctor" className="w-full rounded" />
            <h3 className="mt-2 font-semibold">Dr. Brian White</h3>
            <p>Dermatologist</p>
          </div>
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
          <span className="bg-white text-blue-500 p-2 rounded-full">LinkedIn</span>
          <span className="bg-white text-blue-500 p-2 rounded-full">Facebook</span>
          <span className="bg-white text-blue-500 p-2 rounded-full">Instagram</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
