import React, { useEffect, useState } from 'react';

const Videogames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('/api/games') 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setGames(data))
      .catch((error) => console.error('Error fetching games:', error));
  }, []);

  return (
  <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-64" style={{ backgroundImage: 'url(/assets/images/doctor_background.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <div className="text-center">
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded">Book an Appointment</button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded">Book an MRI Scan</button>
            <button className="bg-blue-500 text-white px-4 py-2 m-2 rounded">Book an X-Ray</button>
          </div>
        </div>
      </section>

      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Video Games Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className="bg-white shadow-md rounded-xl p-4 border-l-4 border-blue-500 hover:shadow-xl transition">
              <h2 className="text-xl font-semibold text-blue-600">{game.title}</h2>
              <p className="text-gray-700">Genre: {game.genre}</p>
              <p className="text-gray-700">Platform: {game.platform}</p>
              <p className="text-gray-500 text-sm">Released: {game.releaseDate}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No games available.</p>
        )}
      </div>
          {/* Contact Section */}
          <section className="p-8 bg-white">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="flex flex-wrap justify-center gap-6 mt-4">
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
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">LinkedIn</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default Videogames;
