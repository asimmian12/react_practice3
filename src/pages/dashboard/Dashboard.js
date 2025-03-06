import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Dashboard = () => {
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
    <>
      <main className="flex h-full m-auto">
        <div className="flex flex-col flex-wrap items-center justify-evenly">
          <div className="font-[sans-serif] my-4">
            <div className="max-w-5xl max-lg:max-w-2xl mx-auto">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-6xl font-semibold text-center text-blue-600 mb-4">
                  Welcome, {userData.firstName} {userData.surname}!
                </h2>
                <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                  Welcome to your hospital portal! We're so happy you're here. This is your special space where you can find everything you need to know about your health and your visits. You’ll be able to see all your important details, explore fun activities, and get ready for your next adventure at the hospital. We're here to help you every step of the way—let's make sure you feel comfortable and excited!
                </p>
              </div>

              <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 justify-center mt-12">
                {/* First Card for Account Management */}
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex justify-end px-4 pt-4">
                    <button
                      id="dropdownButton"
                      data-dropdown-toggle="dropdown"
                      className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                      type="button"
                    >
                      <span className="sr-only">Open dropdown</span>
                      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col items-center pb-10">
                    <img
                      className="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src="./images/account2.png"
                      alt="User profile"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData.firstName} {userData.surname}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{userData.position}</span>
                    <div className="flex mt-4 md:mt-6">
                      {/* Use Link from react-router-dom for navigation */}
                      <Link
                        to="/account"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Manage Account Details
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Second Card for Games */}
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex justify-end px-4 pt-4">
                    <button
                      id="dropdownButton"
                      data-dropdown-toggle="dropdown"
                      className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                      type="button"
                    >
                      <span className="sr-only">Open dropdown</span>
                      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-col items-center pb-10">
                    <img
                      className="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src="./images/games/food-theif.png"
                      alt="Games"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Games</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Click here to enjoy fun and games!</span>
                    <div className="flex mt-4 md:mt-6">
                      {/* Use Link from react-router-dom for navigation */}
                      <Link
                        to="/games"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Go to Games
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
