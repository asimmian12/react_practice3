import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Clock, Mail, Phone } from 'lucide-react';

const doctors = [
  { name: 'Doctor Goldberg', specialty: 'NEUROLOGY', image: './images/doctor1.jpeg', bio: 'Renowned neurologist with 15 years of experience in treating complex neurological disorders.' },
  { name: 'Doctor Shaw', specialty: 'LUNGS', image: './images/doctor2.jpeg', bio: 'Pulmonary specialist dedicated to advanced respiratory care and patient wellness.' },
  { name: 'Doctor Stewart', specialty: 'BRAIN', image: './images/doctor3.jpeg', bio: 'Leading expert in brain health and innovative neurological treatments.' },
];

const specialties = [
  'Neurology', 'Renals', 'Oncology', 'Otolaryngology',
  'Ophthalmology', 'Cardiovascular', 'Pulmonology',
  'Renal Medicine', 'Gastroenterology', 'Urology',
  'Dermatology', 'Gynaecology'
];

const contactInfo = [
  { title: 'EMERGENCY', details: '0141 201 1100', icon: Phone },
  { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK', icon: MapPin },
  { title: 'EMAIL', details: 'info.qeht@nhs.net', icon: Mail },
  { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only', icon: Clock },
];

const Home = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentSpecialty, setCurrentSpecialty] = useState('');
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const openDoctorModal = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeDoctorModal = () => {
    setSelectedDoctor(null);
  };

  const openAppointmentModal = () => {
    setIsAppointmentModalOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
  };

  const handleSpecialtyHover = (specialty) => {
    setCurrentSpecialty(specialty);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Dynamic Clock */}
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full">
          <div className="text-white text-4xl font-bold mb-4">
            <p>Home</p>
          </div>
          <div className="text-center">
            <button 
              onClick={openAppointmentModal}
              className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">
              Book an Appointment
            </button>
            <button 
              className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">
              <a href="/Mri">Book an MRI Scan</a>
            </button>
            <button 
              className="bg-blue-500 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 transition duration-300">
              <a href="/Xray">Book an X-Ray</a>
            </button>
          </div>
        </div>
      </section>

      {/* Doctors Section with Interactive Modals */}
      <section className="p-8">
        <h1 className="text-2xl font-bold text-blue-800 text-center">Our Doctors</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              onClick={() => openDoctorModal(doctor)}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.175,_0.885,_0.32,_1.275)] hover:scale-105 cursor-pointer">
              <img src={doctor.image} alt={doctor.name} className="w-full h-48 object-cover" />
              <div className="bg-blue-400 text-white p-4">
                <h2 className="font-bold text-lg">{doctor.name}</h2>
                <p className="font-semibold text-yellow-300">{doctor.specialty}</p>
              </div>
              <div className="bg-yellow-300 text-center p-2 hover:bg-blue-600 transition duration-300">
                <button className="text-white font-semibold">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specialties Section with Hover Effect */}
      <section className="p-8 bg-white-100 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Our Specialties</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {specialties.map((specialty, index) => (
            <div 
              key={index} 
              onMouseEnter={() => handleSpecialtyHover(specialty)}
              onMouseLeave={() => setCurrentSpecialty('')}
              className="flex flex-col items-center transition-transform duration-300 transform hover:scale-110">
              <div className="w-12 h-12 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full mb-2">
                <Heart className="w-6 h-6" />
              </div>
              <p className={`text-gray-700 ${currentSpecialty === specialty ? 'font-bold text-blue-600' : ''}`}>
                {specialty}
              </p>
            </div>
          ))}
        </div>
        {currentSpecialty && (
          <div className="mt-4 text-blue-700 font-semibold animate-fadeIn">
            Currently exploring {currentSpecialty} specialty
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section className="p-8 bg-white">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div 
                key={index} 
                className="bg-blue-400 text-white p-4 rounded-md w-48 text-center group hover:bg-blue-500 transition duration-300">
                <div className="flex justify-center mb-2">
                  <Icon className="w-6 h-6 text-white group-hover:animate-pulse" />
                </div>
                <h3 className="font-bold">{info.title}</h3>
                <p>{info.details}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-800">{selectedDoctor.name}</h2>
              <button 
                onClick={closeDoctorModal}
                className="text-red-500 hover:text-red-700">
                Close
              </button>
            </div>
            <img 
              src={selectedDoctor.image} 
              alt={selectedDoctor.name} 
              className="w-full h-64 object-cover rounded-md mb-4" 
            />
            <p className="text-gray-700">{selectedDoctor.bio}</p>
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Book an Appointment</h2>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full p-2 border rounded" 
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-2 border rounded" 
              />
              <select className="w-full p-2 border rounded">
                <option>Select Doctor</option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor.name}>{doctor.name}</option>
                ))}
              </select>
              <input 
                type="date" 
                className="w-full p-2 border rounded" 
              />
              <button 
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Submit Appointment Request
              </button>
            </form>
            <button 
              onClick={closeAppointmentModal}
              className="mt-4 w-full text-red-500 hover:text-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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