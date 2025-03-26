import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Heart, Filter, Search, X, Star, Loader } from "lucide-react";

const Games = () => {
  const [games, setGames] = useState([]);
  const [displayedGames, setDisplayedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleGames, setVisibleGames] = useState(8);
  const [hoveredGame, setHoveredGame] = useState(null);
  const [tappedGame, setTappedGame] = useState(null);

  // Fetch games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/games");
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const data = await response.json();
        if (Array.isArray(data)) {
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

  // Debounce search
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // Filter games
  useEffect(() => {
    let filtered = games;
    if (debouncedSearchTerm) {
      filtered = filtered.filter(game => 
        game.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }
    if (ageFilter) {
      filtered = filtered.filter(game => 
        game.age_groups.split(',').includes(ageFilter.toString())
      );
    }
    setDisplayedGames(filtered);
    setVisibleGames(8); // Reset pagination on filter change
  }, [debouncedSearchTerm, ageFilter, games]);

  const handleCardClick = (gameUrl) => {
    setConfetti(true);
    setTimeout(() => {
      setConfetti(false);
      window.location.href = gameUrl;
    }, 2000);
  };

  const toggleFavorite = (gameId) => {
    setFavorites(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId) 
        : [...prev, gameId]
    );
  };

  const loadMoreGames = () => setVisibleGames(prev => prev + 4);
  const clearFilters = () => {
    setSearchTerm("");
    setAgeFilter(null);
    setShowFilters(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin text-blue-500" size={48} />
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-4 my-8">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{error}</span>
    </div>
  );

  return (
    <main className="container mx-auto px-4 py-8">
      {confetti && <Confetti recycle={false} numberOfPieces={200} />}

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search games..."
            aria-label="Search games"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border-2 border-blue-100 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-label="Toggle filters"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center transition"
          >
            <Filter size={20} className="mr-2" /> 
            Filters
          </button>

          {(searchTerm || ageFilter) && (
            <button 
              onClick={clearFilters}
              aria-label="Clear filters"
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg flex items-center transition"
            >
              <X size={20} className="mr-2" /> 
              Clear
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium mb-3 text-blue-800">Filter by Age Group</h3>
          <div className="flex flex-wrap gap-2">
            {[2, 5, 10, 16, 18].map(age => (
              <button
                key={age}
                onClick={() => setAgeFilter(age === ageFilter ? null : age)}
                aria-pressed={ageFilter === age}
                className={`px-4 py-2 rounded-lg transition ${
                  ageFilter === age 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {age === 2 ? '2-5' : age === 5 ? '5-10' : age === 10 ? '10-16' : '16-18'}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedGames.slice(0, visibleGames).map((game) => (
          <div 
            key={game.id}
            onMouseEnter={() => setHoveredGame(game.id)}
            onMouseLeave={() => setHoveredGame(null)}
            onTouchStart={() => setTappedGame(game.id)}
            onTouchEnd={() => {
              setTappedGame(null);
              handleCardClick(game.game_url);
            }}
            className={`relative bg-white border-2 rounded-xl shadow-sm overflow-hidden group transition-all duration-300 ${
              hoveredGame === game.id ? 'transform -translate-y-2 shadow-lg' : ''
            } ${
              tappedGame === game.id ? 'scale-95' : ''
            }`}
            style={{
              borderColor: hoveredGame === game.id ? '#4BAEE9' : '#e5e7eb'
            }}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(game.id);
              }}
              aria-label={favorites.includes(game.id) ? "Remove from favorites" : "Add to favorites"}
              className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1 backdrop-blur-sm hover:bg-white"
            >
              <Heart 
                size={24} 
                fill={favorites.includes(game.id) ? 'red' : 'none'}
                stroke={favorites.includes(game.id) ? 'red' : 'currentColor'}
                className="text-gray-700 hover:text-red-500 transition"
              />
            </button>

            <div 
              onClick={() => handleCardClick(game.game_url)}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(game.game_url)}
              role="button"
              tabIndex="0"
              className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
            >
              <div className="relative pt-[56.25%] overflow-hidden">
                <img
                  src={game.game_img}
                  alt={game.name}
                  loading="lazy"
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "./images/game-placeholder.png";
                  }}
                />
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate flex items-center">
                  {game.name}
                  {favorites.includes(game.id) && (
                    <Star size={16} fill="gold" stroke="gold" className="ml-2" />
                  )}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {game.details}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                    Age: {game.age_restriction}+
                  </span>
                  <span className="text-xs bg-green-100 text-green-800 rounded-full px-3 py-1">
                    {game.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleGames < displayedGames.length && (
        <div className="text-center mt-8">
          <button 
            onClick={loadMoreGames}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg"
          >
            Load More Games
          </button>
        </div>
      )}

      {displayedGames.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No games found</div>
          <button 
            onClick={clearFilters}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </main>
  );
};

export default Games;