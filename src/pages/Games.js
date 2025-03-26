import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Heart, Filter, Search, X, Star } from "lucide-react";

const Games = () => {
  const [games, setGames] = useState([]); // Original games data
  const [displayedGames, setDisplayedGames] = useState([]); // Games to display
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confetti, setConfetti] = useState(false);
  
  // New interactive state
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleGames, setVisibleGames] = useState(8); // Pagination

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/games");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch games: ${response.status}`);
        }

        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setGames(data);
          setDisplayedGames(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Interactive game card click handler
  const handleCardClick = (event, gameUrl) => {
    event.preventDefault();
    setConfetti(true);

    setTimeout(() => {
      setConfetti(false);
      window.location.href = gameUrl;
    }, 2000);
  };

  // Favorite toggle handler
  const toggleFavorite = (gameId) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(gameId)
        ? prevFavorites.filter(id => id !== gameId)
        : [...prevFavorites, gameId]
    );
  };

  // Search and filter logic
  useEffect(() => {
    let filtered = games;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(game => 
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Age restriction filter
    if (ageFilter) {
      filtered = filtered.filter(game => 
        parseInt(game.age_restriction) <= ageFilter
      );
    }

    setDisplayedGames(filtered);
  }, [searchTerm, ageFilter, games]);

  // Load more games
  const loadMoreGames = () => {
    setVisibleGames(prev => prev + 4);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setAgeFilter(null);
    setShowFilters(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Oops! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Confetti Animation */}
      {confetti && <Confetti recycle={false} numberOfPieces={200} />}

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Search games..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-8 border rounded-lg"
          />
          <Search className="absolute left-2 top-3 text-gray-400" size={20} />
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="bg-blue-500 text-white p-2 rounded-lg flex items-center"
          >
            <Filter size={20} className="mr-2" /> 
            Filters
          </button>

          {(searchTerm || ageFilter) && (
            <button 
              onClick={clearFilters}
              className="bg-red-500 text-white p-2 rounded-lg flex items-center"
            >
              <X size={20} className="mr-2" /> 
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Age Filter Dropdown */}
      {showFilters && (
        <div className="mb-6 flex items-center gap-4">
          <label>Max Age Restriction:</label>
          {[12, 16, 18].map(age => (
            <button
              key={age}
              onClick={() => setAgeFilter(age)}
              className={`
                px-4 py-2 rounded-lg 
                ${ageFilter === age 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'}
              `}
            >
              {age}+
            </button>
          ))}
        </div>
      )}

      {/* Games Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedGames.slice(0, visibleGames).map((game) => (
          <div 
            key={game.id} 
            className="relative bg-white border rounded-lg shadow-md overflow-hidden group"
          >
            {/* Favorite Button */}
            <button 
              onClick={() => toggleFavorite(game.id)}
              className="absolute top-2 right-2 z-10 bg-white/70 rounded-full p-1"
            >
              <Heart 
                size={24} 
                fill={favorites.includes(game.id) ? 'red' : 'none'}
                stroke={favorites.includes(game.id) ? 'red' : 'black'}
              />
            </button>

            <div 
              onClick={(e) => handleCardClick(e, game.game_url)}
              className="cursor-pointer"
            >
              <img
                src={game.game_img}
                alt={game.name}
                className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "./images/fruit-ninja.png";
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate flex items-center">
                  {game.name}
                  {favorites.includes(game.id) && (
                    <Star size={16} fill="gold" className="ml-2" />
                  )}
                </h3>
                <p className="text-gray-600 truncate text-sm mt-2">
                  {game.details}
                </p>
                <p className="text-sm mt-2 bg-blue-100 rounded px-2 py-1 inline-block">
                  Age: {game.age_restriction}+
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleGames < displayedGames.length && (
        <div className="text-center mt-8">
          <button 
            onClick={loadMoreGames}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Load More Games
          </button>
        </div>
      )}

      {/* No Results Message */}
      {displayedGames.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No games found. Try adjusting your search or filters.
        </div>
      )}
    </main>
  );
};

export default Games;