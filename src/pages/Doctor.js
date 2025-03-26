import React, { useState, useEffect } from 'react';
import { Search, Phone, MapPin, Mail, Clock, Calendar, Star, ChevronDown, ChevronUp, X } from 'lucide-react';
import Confetti from 'react-confetti';

const Doctor = () => {
  // State for interactive elements
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [showSpecialties, setShowSpecialties] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Doctor data with more details
  const doctors = [
    { 
      id: 1,
      name: 'Doctor Goldberg', 
      specialty: 'NEUROLOGY', 
      image: './images/doctor1.jpeg',
      bio: 'Pediatric neurologist with 15 years experience specializing in childhood epilepsy.',
      rating: 4.8,
      available: ['Mon 9:00-12:00', 'Wed 14:00-17:00'],
      ageGroups: '2-18',
      languages: ['English', 'Spanish']
    },
    { 
      id: 2,
      name: 'Doctor Shaw', 
      specialty: 'PULMONOLOGY', 
      image: './images/doctor2.jpeg',
      bio: 'Expert in childhood respiratory conditions including asthma and allergies.',
      rating: 4.6,
      available: ['Tue 10:00-13:00', 'Thu 15:00-18:00'],
      ageGroups: '5-18',
      languages: ['English', 'French']
    },
    { 
      id: 3,
      name: 'Doctor Stewart', 
      specialty: 'NEUROSURGERY', 
      image: './images/doctor3.jpeg',
      bio: 'Pediatric neurosurgeon specializing in minimally invasive procedures.',
      rating: 4.9,
      available: ['Mon 13:00-16:00', 'Fri 9:00-12:00'],
      ageGroups: '10-18',
      languages: ['English']
    },
    { 
      id: 4,
      name: "Doctor Smith", 
      specialty: 'OTOLARYNGOLOGY', 
      image: './images/doctor4.jpeg',
      bio: 'ENT specialist with expertise in childhood ear, nose and throat conditions.',
      rating: 4.7,
      available: ['Wed 9:00-12:00', 'Sat 10:00-13:00'],
      ageGroups: '2-18',
      languages: ['English', 'Arabic']
    },
    { 
      id: 5,
      name: 'Doctor Abrara', 
      specialty: 'DERMATOLOGY', 
      image: './images/doctor5.jpeg',
      bio: 'Pediatric dermatologist treating skin conditions from eczema to acne.',
      rating: 4.5,
      available: ['Tue 14:00-17:00', 'Thu 9:00-12:00'],
      ageGroups: '2-18',
      languages: ['English', 'Urdu']
    },
    { 
      id: 6,
      name: 'Doctor Jackson', 
      specialty: 'CARDIOLOGY', 
      image: './images/doctor6.jpeg',
      bio: 'Pediatric cardiologist specializing in congenital heart conditions.',
      rating: 4.8,
      available: ['Mon 10:00-13:00', 'Wed 14:00-17:00'],
      ageGroups: '0-18',
      languages: ['English', 'Mandarin']
    },
  ];

  // Contact information
  const contactInfo = [
    { title: 'EMERGENCY', details: '0141 201 1100', icon: <Phone className="text-yellow-300" /> },
    { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK', icon: <MapPin className="text-yellow-300" /> },
    { title: 'EMAIL', details: 'info.qeht@nhs.net', icon: <Mail className="text-yellow-300" /> },
    { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only', icon: <Clock className="text-yellow-300" /> },
  ];

  // All specialties for filtering
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? doctor.specialty === selectedSpecialty : true;
    return matchesSearch && matchesSpecialty;
  });

  // Handle booking appointment
  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  // Confirm booking
  const confirmBooking = (timeSlot) => {
    setBookedAppointment({
      doctor: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      time: timeSlot,
      date: new Date().toLocaleDateString()
    });
    setShowModal(false);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  // Toggle favorite doctor
  const toggleFavorite = (doctorId) => {
    setFavorites(prev => 
      prev.includes(doctorId) 
        ? prev.filter(id => id !== doctorId) 
        : [...prev, doctorId]
    );
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {confetti && <Confetti recycle={false} numberOfPieces={200} />}

      {/* Hero Section with Interactive Buttons */}
      <section className="relative bg-cover bg-center h-96 flex items-center justify-center" 
               style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Meet Our Pediatric Specialists</h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Compassionate care designed specifically for children and young adults
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => document.getElementById('doctors-section').scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Find Your Doctor
            </button>
            <button 
              className="bg-white hover:bg-blue-100 text-blue-900 font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Emergency Contact
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section id="doctors-section" className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Find the Right Specialist</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-blue-400" />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Specialty Filter */}
            <div className="relative">
              <button
                onClick={() => setShowSpecialties(!showSpecialties)}
                className="w-full flex justify-between items-center px-4 py-2 border-2 border-blue-200 rounded-lg bg-white"
              >
                {selectedSpecialty || 'Filter by Specialty'}
                {showSpecialties ? <ChevronUp /> : <ChevronDown />}
              </button>
              
              {showSpecialties && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                  <button
                    onClick={() => {
                      setSelectedSpecialty(null);
                      setShowSpecialties(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${!selectedSpecialty ? 'bg-blue-100' : ''}`}
                  >
                    All Specialties
                  </button>
                  {specialties.map((specialty, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedSpecialty(specialty);
                        setShowSpecialties(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${selectedSpecialty === specialty ? 'bg-blue-100' : ''}`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedSpecialty) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty(null);
                }}
                className="flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition"
              >
                <X size={18} />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div 
                key={doctor.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Doctor Image with Favorite Button */}
                <div className="relative">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(doctor.id)}
                    className="absolute top-3 right-3 bg-white/80 p-2 rounded-full backdrop-blur-sm"
                    aria-label={favorites.includes(doctor.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Star 
                      size={24} 
                      fill={favorites.includes(doctor.id) ? 'gold' : 'none'} 
                      stroke={favorites.includes(doctor.id) ? 'gold' : 'currentColor'}
                      className="text-blue-900"
                    />
                  </button>
                </div>

                {/* Doctor Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-blue-900">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
                      <Star size={16} fill="gold" stroke="gold" />
                      <span className="ml-1 text-blue-900">{doctor.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mt-3 line-clamp-2">{doctor.bio}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                      Ages: {doctor.ageGroups}
                    </span>
                    {doctor.languages.map((lang, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleBookAppointment(doctor)}
                    className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-4 rounded-lg transition"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-bold text-blue-900 mb-2">No doctors found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty(null);
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Booked Appointment Confirmation */}
      {bookedAppointment && (
        <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg max-w-sm z-50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">Appointment Booked!</h3>
              <p className="mt-1">
                <strong>{bookedAppointment.doctor}</strong> ({bookedAppointment.specialty})<br />
                {bookedAppointment.time} on {bookedAppointment.date}
              </p>
            </div>
            <button 
              onClick={() => setBookedAppointment(null)}
              className="text-green-700 hover:text-green-900"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-blue-900">Book Appointment</h2>
                  <h3 className="text-xl mt-1">{selectedDoctor.name}</h3>
                  <p className="text-blue-600">{selectedDoctor.specialty}</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mt-6">
                <h4 className="font-bold text-gray-800 mb-3">Available Time Slots</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedDoctor.available.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => confirmBooking(slot)}
                      className="border border-blue-300 hover:bg-blue-50 text-blue-900 py-2 px-4 rounded-lg transition"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-bold text-gray-800 mb-2">Patient Information</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Patient Name"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Age"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <textarea
                    placeholder="Reason for visit (optional)"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <button
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Information Section */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-blue-800 rounded-xl p-6 text-center hover:bg-blue-700 transition">
                <div className="flex justify-center mb-3">
                  {info.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{info.title}</h3>
                <p>{info.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Children's Hospital Portal</h3>
              <p className="text-blue-300">Making hospital visits easier for kids</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-300 transition">Privacy Policy</a>
              <a href="#" className="hover:text-yellow-300 transition">Terms of Service</a>
              <a href="#" className="hover:text-yellow-300 transition">Accessibility</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-blue-800 text-center text-blue-300">
            <p>&copy; {new Date().getFullYear()} ASIM MIAN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Doctor;