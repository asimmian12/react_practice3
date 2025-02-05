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
    <div className="min-h-screen bg-gray-100 p-6">
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
    </div>
  );
};

export default Videogames;
