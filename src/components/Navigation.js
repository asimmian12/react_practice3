import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navigation = ({ isLoggedIn, handleLogout }) => {
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!isLoggedIn ? (
        <nav className="bg-gray-800 relative z-10">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">Clyde Children's Hospital</div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link to="/" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Home</Link>
                    <Link to="/map" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Map</Link>
                    <Link to="/login" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Login</Link>
                    <Link to="/register" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Register</Link>
                    <Link to="/Contact" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Contact</Link>
                    <Link to="/service" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Services</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="bg-[#2e2e48] h-screen mt-30 min-w-[260px] py-6 px-4 font-[sans-serif] flex flex-col overflow-auto">
          <div className="flex flex-wrap flex-col justify-center items-center cursor-pointer">
            <p className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center font-bold text-black text-xl">P</p>
            <div className="text-center mt-2">
              <p className="text-base text-white">{userData.firstName}</p>
              <p className="text-xs text-gray-300 mt-0.5">Patient Number: {userData.hospital_number}</p>
            </div>
          </div>
          <hr className="my-6 border-gray-400" />
          <ul className="space-y-3 flex-1">
            <li>
              <Link to="/dashboard" className="text-gray-300 hover:text-white text-sm flex items-center hover:bg-[#36336b] rounded px-4 py-3 transition-all">DASHBOARD</Link>
            </li>
            <li>
              <Link to="/account" className="text-gray-300 hover:text-white text-sm flex items-center hover:bg-[#36336b] rounded px-4 py-3 transition-all">ACCOUNT</Link>
            </li>
            <li>
              <Link to="/games" className="text-gray-300 hover:text-white text-sm flex items-center hover:bg-[#36336b] rounded px-4 py-3 transition-all">GAMES</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="text-gray-300 hover:text-white text-sm flex items-center hover:bg-[#36336b] rounded px-4 py-3 transition-all">LOGOUT</button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navigation;
