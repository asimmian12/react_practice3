import React, { useEffect, useState } from "react";

const Games = () => {
  const [games, setGames] = useState([]); // State to hold games data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch the games from the backend API
    const fetchGames = async () => {
      try {
        console.log("Attempting to fetch games from: http://localhost:5000/api/games");
        const response = await fetch("http://localhost:5000/api/games");

        // Log the response status
        console.log("Response status:", response.status);
        console.log("Response headers:", [...response.headers.entries()]);

        // Check if the response is OK
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response body:", errorText);
          throw new Error(`Failed to fetch games: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Games data received:", data);
        console.log("Type of data:", typeof data);
        console.log("Is array:", Array.isArray(data));
        console.log("Data length:", data ? data.length : 0);

        // Check if data is an array
        if (Array.isArray(data) && data.length > 0) {
          setGames(data); // Store the games data if it's valid
        } else {
          console.warn("Data is not an array or is empty:", data);
          setGames([]); // If the data is not an array or is empty, clear the games state
        }
      } catch (err) {
        console.error("Error fetching games:", err);
        setError(err.message); // Set the error state if something goes wrong
        
        // Fallback to alternative endpoint
        try {
          console.log("Attempting fallback fetch from: http://localhost:5000/api/games-file");
          const fallbackResponse = await fetch("http://localhost:5000/api/games-file");
          
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            console.log("Fallback data received:", fallbackData);
            
            if (Array.isArray(fallbackData) && fallbackData.length > 0) {
              setGames(fallbackData);
              setError(null); // Clear error if fallback succeeds
            }
          }
        } catch (fallbackErr) {
          console.error("Fallback fetch also failed:", fallbackErr);
        }
      } finally {
        setLoading(false); // Stop loading once the data is fetched or error occurred
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

  if (games.length === 0) {
    return <p>No games available. Please check the server configuration.</p>;
  }

  return (
    <main className="flex flex-col h-full">
      <div className="games-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.175,_0.885,_0.32,_1.275)] hover:scale-105"
          >
            <a href={game.game_url} target="_blank" rel="noopener noreferrer">
              <img
                src={game.game_img}
                alt={game.name}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "./images/fruit-ninja.png";
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white-900 dark:text-white truncate">{game.name}</h3>
                <p className="text-white truncate text-sm mt-2">{game.details}</p>
                <p className="text-white truncate text-sm mt-2">
                  Age Restriction: {game.age_restriction}+
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
      <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-6 w-auto mx-auto" onClick={() => { console.log("Show all games button clicked"); }}>Show all games</button>
    </main>
  );
};

export default Games;
