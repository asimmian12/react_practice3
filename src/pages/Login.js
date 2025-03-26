import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaEye, FaEyeSlash, FaUserAlt, FaLock, FaPhone, 
  FaMapMarkerAlt, FaEnvelope, FaClock, FaSpinner,
  FaShieldAlt, FaQrcode, FaKey
} from 'react-icons/fa';
import { motion } from 'framer-motion';

function Login({ setIsLoggedIn }) {
  const [hospitalNumber, setHospitalNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [twoFactorToken, setTwoFactorToken] = useState('');
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [backupCodes, setBackupCodes] = useState([]);
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [backupCode, setBackupCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/login', {
        hospital_number: hospitalNumber,
        password: password,
        token: twoFactorRequired ? twoFactorToken : undefined
      });

      if (response.status === 206 && response.data.twoFactorRequired) {
        // 2FA required but token not provided yet
        setTwoFactorRequired(true);
        setIsLoading(false);
        return;
      }

      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
        
        // Animate before redirect
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Authentication failed');
      } else {
        setError('Network error. Please try again.');
      }
      
      // Shake animation on error
      document.getElementById('loginForm').classList.add('animate-shake');
      setTimeout(() => {
        document.getElementById('loginForm').classList.remove('animate-shake');
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetup2FA = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login/enable-2fa', {
        userId: JSON.parse(localStorage.getItem('user')).id
      });
      
      setQrCodeUrl(response.data.qrCodeUrl);
      setBackupCodes(response.data.backupCodes);
      setShow2FASetup(true);
    } catch (err) {
      setError('Failed to setup 2FA. Please try again.');
    }
  };

  const handleVerify2FASetup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login/verify-2fa', {
        userId: JSON.parse(localStorage.getItem('user')).id,
        token: twoFactorToken
      });
      
      setShow2FASetup(false);
      setTwoFactorToken('');
      alert('2FA has been enabled successfully. Please login again.');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    }
  };

  const handleVerifyBackupCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login/verify-backup-code', {
        userId: JSON.parse(localStorage.getItem('user')).id,
        code: backupCode
      });
      
      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoggedIn(true);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid backup code. Please try again.');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    // Calculate password strength
    let strength = 0;
    if (value.length > 0) strength++;
    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-blue-500';
      case 5: return 'bg-green-500';
      default: return 'bg-gray-200';
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

      {/* Login Form */}
      <div className="min-h-screen bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-md mx-auto px-4 py-8"
        >
          <motion.h1 
            whileHover={{ scale: 1.02 }}
            className="text-3xl font-bold text-center text-blue-700 mb-6"
          >
            {show2FASetup ? 'Set Up 2FA' : twoFactorRequired ? 'Two-Factor Authentication' : 'Login'}
          </motion.h1>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <FaSpinner className="animate-spin text-blue-600 text-4xl mx-auto mb-4" />
                <p className="text-lg">Authenticating...</p>
              </div>
            </motion.div>
          )}

          {show2FASetup ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="mb-6 text-center">
                <h3 className="text-lg font-bold mb-4">Scan QR Code</h3>
                <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4 w-48 h-48" />
                <p className="mb-4">Use an authenticator app like Google Authenticator or Authy to scan this QR code</p>
                
                <div className="mb-6">
                  <label htmlFor="twoFactorToken" className="block mb-2 text-sm font-medium text-gray-700">
                    Enter Verification Code
                  </label>
                  <input
                    type="text"
                    id="twoFactorToken"
                    value={twoFactorToken}
                    onChange={(e) => setTwoFactorToken(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="6-digit code"
                  />
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-2">Backup Codes</h4>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {backupCodes.map((code, index) => (
                      <div key={index} className="bg-gray-100 p-2 rounded text-center font-mono">
                        {code}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Save these backup codes in a secure place. Each code can be used only once.
                  </p>
                </div>

                <button
                  onClick={handleVerify2FASetup}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Complete Setup
                </button>
              </div>
            </motion.div>
          ) : twoFactorRequired ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              {!useBackupCode ? (
                <>
                  <div className="mb-6">
                    <label htmlFor="twoFactorToken" className="block mb-2 text-sm font-medium text-gray-700">
                      Two-Factor Authentication Code
                      <FaShieldAlt className="inline ml-2" />
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="twoFactorToken"
                        value={twoFactorToken}
                        onChange={(e) => setTwoFactorToken(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter 6-digit code from your app"
                        required
                      />
                    </div>
                    <p className="text-xs mt-2 text-gray-500">
                      Open your authenticator app and enter the current code
                    </p>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mb-4"
                  >
                    Verify and Login
                  </button>

                  <button
                    onClick={() => setUseBackupCode(true)}
                    className="w-full text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2"
                  >
                    <FaKey /> Use Backup Code Instead
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <label htmlFor="backupCode" className="block mb-2 text-sm font-medium text-gray-700">
                      Backup Code
                      <FaKey className="inline ml-2" />
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="backupCode"
                        value={backupCode}
                        onChange={(e) => setBackupCode(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Enter your backup code"
                        required
                      />
                    </div>
                    <p className="text-xs mt-2 text-gray-500">
                      Use one of your saved backup codes
                    </p>
                  </div>

                  <button
                    onClick={handleVerifyBackupCode}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mb-4"
                  >
                    Verify Backup Code
                  </button>

                  <button
                    onClick={() => setUseBackupCode(false)}
                    className="w-full text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2"
                  >
                    <FaShieldAlt /> Use Authenticator Code Instead
                  </button>
                </>
              )}
            </motion.div>
          ) : (
            <motion.form 
              id="loginForm"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="mb-6">
                <label htmlFor="hospitalNumber" className="block mb-2 text-sm font-medium text-gray-700">
                  Hospital Number CHI
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUserAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="hospitalNumber"
                    value={hospitalNumber}
                    onChange={(e) => setHospitalNumber(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    placeholder="Enter your hospital number"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 p-2.5"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`} 
                        style={{ width: `${passwordStrength * 20}%` }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1 text-gray-500">
                      Password strength: {['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'][passwordStrength - 1] || ''}
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700"
                >
                  <p>{error}</p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isLoading ? 'opacity-75' : ''}`}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </motion.button>

              <div className="mt-4 text-center">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  href="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </motion.a>
              </div>

              {localStorage.getItem('user') && (
                <div className="mt-4 text-center">
                  <motion.button
                    type="button"
                    onClick={handleSetup2FA}
                    whileHover={{ scale: 1.05 }}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2 mx-auto"
                  >
                    <FaQrcode /> Set Up Two-Factor Authentication
                  </motion.button>
                </div>
              )}
            </motion.form>
          )}
        </motion.div>

        {/* Contact Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-8 bg-white"
        >
          <motion.h2 
            whileHover={{ scale: 1.02 }}
            className="text-2xl font-bold text-center text-blue-800 mb-6"
          >
            Contact
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'EMERGENCY', detail: '0141 201 1100', icon: <FaPhone />, action: 'tel' },
              { title: 'LOCATION', detail: '1345 Govan Road, G51 4TF Glasgow UK', icon: <FaMapMarkerAlt />, action: 'map' },
              { title: 'EMAIL', detail: 'info.qeht@nhs.net', icon: <FaEnvelope />, action: 'mail' },
              { title: 'WORKING HOURS', detail: 'Mon-Sat 09:00-20:00, Sunday Emergency only', icon: <FaClock />, action: null }
            ].map((info, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (info.action === 'tel') window.location.href = `tel:${info.detail.replace(/\s/g, '')}`;
                  if (info.action === 'mail') window.location.href = `mailto:${info.detail}`;
                  if (info.action === 'map') window.open(`https://maps.google.com?q=${encodeURIComponent(info.detail)}`, '_blank');
                }}
                className={`bg-blue-400 text-white p-4 rounded-lg text-center cursor-pointer ${info.action ? 'hover:bg-blue-500' : ''}`}
              >
                <div className="text-2xl mb-2">{info.icon}</div>
                <h3 className="font-bold">{info.title}</h3>
                <p>{info.detail}</p>
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

      {/* Add CSS for shake animation */}
      <style jsx>{`
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}

export default Login;