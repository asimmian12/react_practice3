import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navigation = ({ isLoggedIn, handleLogout }) => {
  const [userData, setUserData] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // For dropdown toggle

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <nav className="bg-gray-800 relative z-10">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center text-white font-bold">
                  Clyde Children's Hospital
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link to="/" className="px-3 py-2 text-sm text-white hover:bg-gray-700 rounded-md">Home</Link>
                    <Link to="/map" className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Map</Link>
                    <Link to="/login" className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Login</Link>
                    <Link to="/register" className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Register</Link>
                    <Link to="/Contact" className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Contact</Link>
                    <Link to="/Services" className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Services</Link>
                    <Link to="/Appointment" className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Appointment</Link>
                    <Link to="/Doctor" className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Doctor</Link>
                    <Link to="/About" className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">About</Link>
                    <Link to="/Videogames" className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">Video Games</Link>

                    {/* PROFILE DROPDOWN */}
                    <div className="relative">
                      <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md flex items-center"
                      >
                        Profile
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isProfileOpen && (
                        <ul className="absolute mt-2 bg-gray-700 rounded-md shadow-lg w-40">
                          <li>
                            <Link
                              to="/Profile"
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              Profile Overview
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/Mri"
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              MRI
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/Xray"
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              X-Ray
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  <button className="appointment"><a href="/appointment">Appointment</a></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="bg-[#2e2e48] h-screen min-w-[260px] py-6 px-4 text-white">
          <div className="flex flex-col items-center">
            <p className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center font-bold text-black text-xl">P</p>
            <div className="text-center mt-2">
              <p>{userData?.firstName}</p>
              <p className="text-xs text-gray-300">Patient Number: {userData?.hospital_number}</p>
            </div>
          </div>

          <hr className="my-6 border-gray-400" />

          <ul className="space-y-3">
            <li><Link to="/dashboard" className="hover:bg-[#36336b] px-4 py-3 rounded-md block">Dashboard</Link></li>
            <li><Link to="/account" className="hover:bg-[#36336b] px-4 py-3 rounded-md block">Account</Link></li>
            <li><Link to="/games" className="hover:bg-[#36336b] px-4 py-3 rounded-md block">Games</Link></li>
            <li><Link to="/Appointment" className="hover:bg-[#36336b] px-4 py-3 rounded-md block">Appointment</Link></li>
            <li><Link to="/Doctor" className="hover:bg-[#36336b] px-4 py-3 rounded-md block">Doctor</Link></li>

            {/* PROFILE DROPDOWN */}
            <li>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="hover:bg-[#36336b] px-4 py-3 rounded-md w-full text-left flex items-center justify-between"
              >
                Profile
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProfileOpen && (
                <ul className="ml-4 space-y-1">
                  <li><Link to="/Profile" className="block hover:bg-[#4a4a6a] px-4 py-2 rounded">Profile Overview</Link></li>
                  <li><Link to="/Mri" className="block hover:bg-[#4a4a6a] px-4 py-2 rounded">MRI</Link></li>
                  <li><Link to="/Xray" className="block hover:bg-[#4a4a6a] px-4 py-2 rounded">X-Ray</Link></li>
                </ul>
              )}
            </li>

            <li><button onClick={handleLogout} className="hover:bg-[#36336b] px-4 py-3 rounded-md w-full text-left">Logout</button></li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navigation;
