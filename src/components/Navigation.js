import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navigation = ({ isLoggedIn, handleLogout }) => {
  const [userData, setUserData] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <nav className="bg-blue-500 relative z-10">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8"> 
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center text-white font-bold text-xl"> 
                  Clyde Children's Hospital
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-6"> {/* Increased space between links */}
                    <Link to="/" className="px-4 py-3 text-lg text-white-300 hover:bg-white-700 hover:text-white rounded-md">Home</Link> {/* Increased padding and font size */}
                    <Link to="/About" className="px-4 py-3 text-lg text-white-300 hover:bg-white-700 hover:text-white rounded-md">About</Link>
                    <Link to="/login" className="px-4 py-3 text-lg text-white-300 hover:bg-white-700 hover:text-white rounded-md">Login</Link>
                    <Link to="/register" className="px-4 py-3 text-lg text-white-300 hover:bg-white-700 hover:text-white rounded-md">Register</Link>
                    <Link to="/Map" className="px-4 py-3 text-lg text-white-300 hover:bg-white-700 hover:text-white rounded-md">Map</Link>
                    <Link to="/Contact" className="px-4 py-3 text-lg text-white-300 hover:bg-white-700 hover:text-white rounded-md">Contact</Link>
                    <Link to="/Services" className="px-4 py-3 text-lg text-white-300 hover:bg-white-700 hover:text-white rounded-md">Services</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="flex flex-col items-center w-100 h-100 pb-4 border-gray-300 bg-blue-500 text-white"> 
          <div className="flex flex-col items-center">
            <p className="bg-gray-300 w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-2xl"> 
              P
            </p>
            <div className="text-center mt-2">
              <p className="text-lg">{userData?.firstName}</p> {/* Increased font size */}
              <p className="text-xs text-white-500">Patient Number: {userData?.hospital_number}</p>
            </div>
          </div>

          <hr className="my-6 border-gray-400" />

          <ul className="space-y-4"> {/* Increased space between items */}
            <li><Link to="/dashboard" className="hover:bg-[#36336b] px-4 py-3 text-lg rounded-md block">Dashboard</Link></li>
            <li><Link to="/account" className="hover:bg-[#36336b] px-4 py-3 text-lg rounded-md block">Account</Link></li>
            <li><Link to="/About" className="hover:bg-[#36336b] px-4 py-3 text-lg rounded-md block">About</Link></li>
            <li><Link to="/games" className="hover:bg-[#36336b] px-4 py-3 text-lg rounded-md block">Games</Link></li>
            <li><Link to="/Map" className="hover:bg-[#36336b] px-4 py-3 text-lg rounded-md block">Map</Link></li>
            <li><Link to="/Appointment" className="hover:bg-[#36336b] px-4 py-3 text-lg rounded-md block">Appointment</Link></li>
            <li><Link to="/Doctor" className="hover:bg-[#36336b] px-4 py-3 text-lg rounded-md block">Doctor</Link></li>
            <li><Link to="/Services" className="hover:bg-[#36336b] px-4 py-3 text-lg rounded-md block">Services</Link></li>
            <li><Link to="/Contact" className="hover:bg-[#36336b] px-4 py-3 text-lg rounded-md block">Contact</Link></li>

            {/* PROFILE DROPDOWN */}
            <li>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="hover:bg-[#36336b] px-4 py-3 text-lg rounded-md w-full text-left flex items-center justify-between"
              >
                Profile
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProfileOpen && (
                <ul className="ml-4 space-y-2"> {/* Increased space for profile items */}
                  <li><Link to="/Profile" className="block hover:bg-[#4a4a6a] px-4 py-2 text-lg rounded">Profile Overview</Link></li>
                  <li><Link to="/Mri" className="block hover:bg-[#4a4a6a] px-4 py-2 text-lg rounded">MRI</Link></li>
                  <li><Link to="/Xray" className="block hover:bg-[#4a4a6a] px-4 py-2 text-lg rounded">X-Ray</Link></li>
                </ul>
              )}
            </li>

            <li><button onClick={handleLogout} className="hover:bg-[#36336b] px-4 py-3 text-lg rounded-md w-full text-left">Logout</button></li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navigation;
