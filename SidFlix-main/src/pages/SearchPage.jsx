import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import SearchNavbar from "../components/SearchNavbar";
import { fetchMoviesBySearch } from "../Services/API";
import SearchingAnimation from "../components/SearchingAnimation";

function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSearch("Batman"); // default search
  }, []);

  // 🔍 Search function
  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const fetchedMovies = await fetchMoviesBySearch(query);
      setMovies(fetchedMovies);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchNavbar onSearch={handleSearch} />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          marginTop: "20px",
          padding: "20px",
        }}
      >
        {loading ? (
          <SearchingAnimation />
        ) : movies.length > 0 ? (
          movies.map((movie) => <MovieCard movie={movie} key={movie.imdbID} />)
        ) : (
          <p style={{ color: "white", fontSize: "18px" }}>No movies found.</p>
        )}
      </div>
    </>
  );
}

export default SearchPage;
