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
      <div>Show all games</div>
      <div className="games-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {games.map((game) => (
          <div key={game.id} className="game-card bg-white shadow rounded-lg overflow-hidden">
            <a href={game.game_url} target="_blank" rel="noopener noreferrer">
              <img
                src={game.game_img}
                alt={game.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "./images/fruit-ninja.png";
                }}
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
    </main>
  );
};

export default Games;