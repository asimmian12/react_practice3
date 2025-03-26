import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaClock, 
  FaUser, 
  FaSpinner 
} from 'react-icons/fa';

const contactInfo = [
  { title: 'EMERGENCY', details: '0141 201 1100', icon: FaPhone, action: 'tel' },
  { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK', icon: FaMapMarkerAlt, action: 'map' },
  { title: 'EMAIL', details: 'info.qeht@nhs.net', icon: FaEnvelope, action: 'mail' },
  { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only', icon: FaClock, action: null }
];

function Contact() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form and show success
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Animation */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-cover bg-center h-72" 
        style={{ backgroundImage: 'url(./images/doctor_background.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-60"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 m-2 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md"
            >
              <a href="/appointment">Book an Appointment</a>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 m-2 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md"
            >
              <a href="/Mri">Book an MRI Scan</a>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 m-2 rounded-lg hover:bg-blue-100 transition duration-300 shadow-md"
            >
              <a href="/Xray">Book an X-Ray</a>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="container mx-auto py-10 px-4"
      >
        <motion.h1 
          whileHover={{ scale: 1.02 }}
          className="text-3xl font-bold text-center text-blue-700 mb-8"
        >
          Contact Us
        </motion.h1>

        {/* Loading Overlay */}
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
              <FaSpinner className="animate-spin text-blue-600 text-4xl mx-auto mb-4" />
              <p className="text-lg">Submitting your message...</p>
            </div>
          </motion.div>
        )}

        <motion.form 
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl"
        >
          {/* Name Input */}
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Your Name"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Your Email"
                required
              />
            </div>
          </div>

          {/* Message Input */}
          <div className="mb-5">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your Message"
              required
            ></textarea>
          </div>

          {/* Submit Status */}
          {submitStatus === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700"
            >
              <p>Your message has been sent successfully!</p>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700"
            >
              <p>Failed to send message. Please try again.</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isSubmitting ? 'opacity-75' : ''}`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>
      </motion.section>

      {/* Contact Information Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white p-8"
      >
        <motion.h2 
          whileHover={{ scale: 1.02 }}
          className="text-2xl font-bold text-center text-blue-800 mb-6"
        >
          Contact 
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (info.action === 'tel') window.location.href = `tel:${info.details.replace(/\s/g, '')}`;
                if (info.action === 'mail') window.location.href = `mailto:${info.details}`;
                if (info.action === 'map') window.open(`https://maps.google.com?q=${encodeURIComponent(info.details)}`, '_blank');
              }}
              className={`bg-blue-400 text-white p-4 rounded-lg text-center cursor-pointer ${info.action ? 'hover:bg-blue-500' : ''}`}
            >
              <div className="text-2xl mb-2 flex justify-center">
                <info.icon />
              </div>
              <h3 className="font-bold">{info.title}</h3>
              <p>{info.details}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-blue-500 text-white p-6 text-center"
      >
        <p>&copy; 2025 ASIM MIAN</p>
        <div className="flex justify-center gap-4 mt-4">
          <motion.a
            whileHover={{ y: -3 }}
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100 transition"
          >
            LinkedIn
          </motion.a>
          <motion.a
            whileHover={{ y: -3 }}
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100 transition"
          >
            Facebook
          </motion.a>
          <motion.a
            whileHover={{ y: -3 }}
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100 transition"
          >
            Instagram
          </motion.a>
        </div>
      </motion.footer>
    </div>
  );
}

export default Contact;