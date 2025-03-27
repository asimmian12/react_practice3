import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Scan, Magnet, AlertCircle, Clock, ChevronDown, ChevronUp, Info, Phone, MapPin, Mail, AlertTriangle } from 'lucide-react';

const Mri = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [expandedSection, setExpandedSection] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    scanType: '',
    notes: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          navigate('/login');
          return;
        }
        const user = JSON.parse(storedUser);
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const contactInfo = [
    { 
      title: "EMERGENCY", 
      details: "0141 201 1100", 
      icon: <Phone className="text-yellow-300 mx-auto" size={24} />, 
      action: "tel" 
    },
    { 
      title: "LOCATION", 
      details: "1345 Govan Road, G51 4TF Glasgow UK", 
      icon: <MapPin className="text-yellow-300 mx-auto" size={24} />, 
      action: "map" 
    },
    { 
      title: "EMAIL", 
      details: "info.qeht@nhs.net", 
      icon: <Mail className="text-yellow-300 mx-auto" size={24} />, 
      action: "mail" 
    },
    { 
      title: "WORKING HOURS", 
      details: "Mon-Sat 09:00-20:00, Sunday Emergency only", 
      icon: <Clock className="text-yellow-300 mx-auto" size={24} />, 
      action: null 
    }
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('MRI booking submitted! We will contact you to confirm.');
    setShowBookingForm(false);
  };

  const scanTypes = [
    {
      name: "Brain MRI",
      duration: "30-45 minutes",
      uses: "Detects tumors, bleeding, inflammation",
      prep: "No metal objects, may require contrast injection",
      icon: <Scan className="w-8 h-8 text-blue-600" />
    },
    {
      name: "Spine MRI",
      duration: "45-60 minutes",
      uses: "Evaluates discs, nerves, spinal cord",
      prep: "Remove all jewelry, wear comfortable clothing",
      icon: <Scan className="w-8 h-8 text-purple-600" />
    },
    {
      name: "Joint MRI",
      duration: "30-45 minutes",
      uses: "Assesses ligaments, tendons, cartilage",
      prep: "No special preparation needed",
      icon: <Scan className="w-8 h-8 text-green-600" />
    },
    {
      name: "Abdominal MRI",
      duration: "45-60 minutes",
      uses: "Examines organs, blood vessels",
      prep: "Fast for 4 hours prior",
      icon: <Scan className="w-8 h-8 text-red-600" />
    }
  ];

  const faqs = [
    {
      question: "Is an MRI scan painful?",
      answer: "No, MRI scans are painless but you'll need to remain very still during the procedure."
    },
    {
      question: "What if I'm claustrophobic?",
      answer: "We offer open MRI options and can provide mild sedation if needed."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-cover bg-center h-72 md:h-96" 
        style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-60"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center px-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {userData ? `Hello, ${userData.firstName} ${userData.surname}` : 'MRI Services'}
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              {userData ? 'Welcome to Clyde Children\'s Hospital Appointment Portal' : 'Advanced imaging technology for detailed diagnosis without radiation'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBookingForm(true)}
                className="bg-white text-blue-600 px-4 py-2 sm:px-6 sm:py-3 m-1 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md text-sm sm:text-base"
              >
                Book an MRI Scan
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-4 py-2 sm:px-6 sm:py-3 m-1 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md text-sm sm:text-base"
              >
                <a href="/Mri">Book an MRI Scan</a>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-4 py-2 sm:px-6 sm:py-3 m-1 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md text-sm sm:text-base"
              >
                <a href="/Xray">Book an X-Ray</a>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Banner Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {[
              { number: "45 min", label: 'Average Scan Time' },
              { number: "99%", label: 'Accuracy Rate' },
              { number: "3T", label: 'High-Field Magnet' },
              { number: "0", label: 'Radiation Exposure' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <motion.div 
          className="flex border-b border-gray-200 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {['info', 'scans', 'faq'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <div className="mb-12">
          {/* Information Tab */}
          {activeTab === 'info' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4 text-blue-800">About MRI Scans</h2>
                <p className="text-gray-700 mb-6">
                  Magnetic Resonance Imaging (MRI) uses powerful magnets and radio waves to create detailed images of your organs and tissues. 
                  Unlike CT scans and X-rays, MRI doesn't use ionizing radiation.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <Info className="mr-2" /> Important Information
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Scan className="flex-shrink-0 mt-1 mr-2 text-blue-600" />
                      <span>Average scan duration: 30-60 minutes</span>
                    </li>
                    <li className="flex items-start">
                      <Clock className="flex-shrink-0 mt-1 mr-2 text-blue-600" />
                      <span>Results typically available in 2-3 days</span>
                    </li>
                  </ul>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              >
                <h3 className="font-bold text-lg mb-4 text-blue-800">Preparation Guide</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <AlertCircle className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Metal Objects</h4>
                      <p className="text-sm text-gray-600">Remove all jewelry and inform us about any implants</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Clock className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Fasting</h4>
                      <p className="text-sm text-gray-600">Required for abdominal scans (4 hours)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Scan className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Comfort</h4>
                      <p className="text-sm text-gray-600">Wear comfortable clothing without metal</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Scans Tab */}
          {activeTab === 'scans' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-8 text-blue-800">Available MRI Scans</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {scanTypes.map((scan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                  >
                    <div className="flex items-start mb-4">
                      {scan.icon}
                      <div className="ml-4">
                        <h3 className="text-xl font-bold">{scan.name}</h3>
                        <p className="text-gray-600">{scan.uses}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Duration:</p>
                        <p>{scan.duration}</p>
                      </div>
                      <div>
                        <p className="font-medium">Preparation:</p>
                        <p>{scan.prep}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-8 text-blue-800">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden shadow-sm"
                  >
                    <button
                      className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
                      onClick={() => toggleSection(index)}
                    >
                      <span className="font-medium">{faq.question}</span>
                      {expandedSection === index ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {expandedSection === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4 text-gray-700"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Safety Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-red-50 border-l-4 border-red-400 p-4 mb-12"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Metal restrictions:</strong> Certain implants may not be MRI-compatible. Please inform us about any metal in your body.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Information Section */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (info.action === 'tel') window.location.href = `tel:${info.details.replace(/\s/g, '')}`;
                  if (info.action === 'mail') window.location.href = `mailto:${info.details}`;
                  if (info.action === 'map') window.open(`https://maps.google.com?q=${encodeURIComponent(info.details)}`, '_blank');
                }}
                className={`bg-blue-800 rounded-xl p-6 text-center cursor-pointer ${info.action ? 'hover:bg-blue-700' : ''}`}
              >
                <div className="mb-3">
                  {info.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{info.title}</h3>
                <p>{info.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Clyde Children's Hospital</h3>
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

      {/* Booking Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-800">Book an MRI Scan</h2>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Scan Type *</label>
                    <select
                      name="scanType"
                      value={formData.scanType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="">Select scan type</option>
                      {scanTypes.map((scan, index) => (
                        <option key={index} value={scan.name}>{scan.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Preferred Time *</label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (8am-12pm)</option>
                      <option value="afternoon">Afternoon (12pm-4pm)</option>
                      <option value="evening">Evening (4pm-7pm)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Special Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      rows="3"
                      placeholder="Any metal implants, claustrophobia concerns..."
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Request MRI Appointment
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Mri;