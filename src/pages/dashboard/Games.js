import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Games = () => {
  const [games, setGames] = useState([]); // State to hold games data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch the games from the backend API
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/games"); 
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        const data = await response.json();
        setGames(data); // Store the games data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <p>Loading games...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const contactInfo = [
    { title: 'EMERGENCY', details: '0141 201 1100' },
    { title: 'LOCATION', details: '1345 Govan Road, G51 4TF Glasgow UK' },
    { title: 'EMAIL', details: 'info.qeht@nhs.net' },
    { title: 'WORKING HOURS', details: 'Mon-Sat 09:00-20:00, Sunday Emergency only' },
  ];

  return (
    <main className="flex flex-col h-full">
      <div>Show all games</div>
      <div className="games-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {games.map((game) => (
          <div key={game.id} className="game-card bg-white shadow rounded-lg overflow-hidden">
            {/* we don't use link for external URL's, <Link>is for internal routing */}
            <a href={game.game_url} target="_blank" rel="noopener noreferrer">
              <img
                src={game.game_img}
                alt={game.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{game.name}</h3>
                <p className="text-gray-700 text-sm mt-2">{game.details}</p>
                <p className="text-gray-500 text-sm mt-2">
                  Age Restriction: {game.age_restriction}+
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>

      <section className="bg-white-100 p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-blue-400 text-white p-4 rounded-lg text-center">
              <h3 className="font-bold text-lg">{info.title}</h3>
              <p>{info.details}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-blue-500 text-white p-6 text-center">
        <p>&copy; 2025 ASIM MIAN</p>
        <div className="flex justify-center gap-4 mt-2">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100"
          >
            LinkedIn
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100"
          >
            Instagram
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Games;
