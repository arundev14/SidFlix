import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Searchbar.css";
import { fetchMoviesBySearch } from "../Services/API";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  // Fetch live suggestions as user types (debounced)
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (searchQuery.trim() !== "") {
        const results = await fetchMoviesBySearch(searchQuery, true); // isSuggestion = true
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  // Submit search
  const handleSearch = async (query) => {
    const q = query || searchQuery;
    if (q.trim() !== "") {
      await onSearch(q);
      setSuggestions([]);
      setSearchQuery(q);
    }
  };

  // Click on suggestion → navigate to TMDb movie detail page
  const handleSelect = (movie) => {
    setSearchQuery(movie.Title);
    setSuggestions([]);
    if (movie.id) {
      navigate(`/movie/${movie.id}`);
    }
  };

  return (
    <div className="search-container">
      <div className={`search-bar ${isFocused ? "focused" : ""}`}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // allow click
        />
        <button onClick={() => handleSearch()}>Search</button>
      </div>

      {isFocused && suggestions.length > 0 && (
        <div className="suggestion-box">
          {suggestions.map((movie) => (
            <div
              key={movie.id}
              className="suggestion-item"
              onMouseDown={() => handleSelect(movie)} // fix click issue
            >
              <img
                src={
                  movie.Poster
                    ? movie.Poster
                    : "https://via.placeholder.com/80x120?text=No+Image"
                }
                alt={movie.Title}
              />
              <div className="suggestion-info">
                <h4>{movie.Title}</h4>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
