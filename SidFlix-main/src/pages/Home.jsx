import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { fetchTrendingMovies, fetchMoviesByGenre, fetchMovieById } from "../Services/API";
import SearchingAnimation from "../components/SearchingAnimation";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [featured, setFeatured] = useState(null);
  const [trending, setTrending] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentlyWatched, setRecentlyWatched] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch trending
      const trendingMovies = await fetchTrendingMovies();
      setTrending(trendingMovies.slice(0, 10));

      // Genres
      const actions = await fetchMoviesByGenre("Action");
      setActionMovies(actions.slice(0, 10));

      const comedies = await fetchMoviesByGenre("Comedy");
      setComedyMovies(comedies.slice(0, 10));

      // Featured + trailer
      if (trendingMovies.length > 0) {
        setFeatured(trendingMovies[0]);

        const fullFeatured = await fetchMovieById(trendingMovies[0].id);
        setTrailerKey(fullFeatured.trailerKey);
      }

      setLoading(false);
    };

    fetchData();

    // Load Continue Watching
    const stored = JSON.parse(localStorage.getItem("recentlyWatched")) || [];
    setRecentlyWatched(stored);
  }, []);

  const handlePlay = (id) => {
    navigate(`/movie/${id}`);
  };

  const renderCarousel = (movies) => (
    <div style={{ display: "flex", overflowX: "auto", gap: "15px", paddingBottom: "10px" }}>
      {movies.map((m) => (
        <div
          key={m.id}
          style={{ cursor: "pointer" }}
          onClick={() => handlePlay(m.id)}
        >
          <MovieCard
            movie={{
              Title: m.title,
              Poster: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
              Year: m.release_date?.split("-")[0],
            }}
          />
        </div>
      ))}
    </div>
  );

  if (loading) return <SearchingAnimation />;

  return (
    <div style={{ backgroundColor: "#111", minHeight: "100vh", color: "white" }}>
      <Navbar />

      {/* HERO SECTION */}
      {featured && (
        <div style={{ position: "relative", height: "70vh", overflow: "hidden" }}>
          {trailerKey ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=1&loop=1&playlist=${trailerKey}`}
              title={featured.title}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              frameBorder="0"
              allow="autoplay; fullscreen"
            ></iframe>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
              alt={featured.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}

          {/* Overlay text */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              padding: "40px",
              background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
            }}
          >
            <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>{featured.title}</h1>
            <p style={{ maxWidth: "600px", fontSize: "1.2rem", marginBottom: "20px" }}>
              {featured.overview}
            </p>

            <button
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                backgroundColor: "#e50914",
                border: "none",
                color: "white",
                cursor: "pointer",
                borderRadius: "4px",
              }}
              onClick={() => handlePlay(featured.id)}
            >
              Play
            </button>

            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "rgba(109,109,110,0.7)",
                border: "none",
                color: "white",
                cursor: "pointer",
                borderRadius: "4px",
              }}
              onClick={() => handlePlay(featured.id)}
            >
              More Info
            </button>
          </div>
        </div>
      )}

      {/* CONTENT SECTIONS */}
      <div style={{ margin: "20px" }}>

        {/* Continue Watching */}
        {recentlyWatched.length > 0 && (
          <>
            <h2 style={{ marginBottom: "10px" }}>Continue Watching</h2>
            <div style={{ display: "flex", overflowX: "auto", gap: "15px", paddingBottom: "10px" }}>
              {recentlyWatched.map((m) => (
                <div
                  key={m.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePlay(m.id)}
                >
                  <MovieCard
                    movie={{
                      Title: m.title,
                      Poster: m.poster,
                      Year: "",
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <h2 style={{ marginBottom: "10px" }}>Trending Now</h2>
        {renderCarousel(trending)}

        <h2 style={{ marginBottom: "10px" }}>Trending in Action</h2>
        {renderCarousel(actionMovies)}

        <h2 style={{ marginBottom: "10px" }}>Trending in Comedy</h2>
        {renderCarousel(comedyMovies)}
      </div>
    </div>
  );
}

export default HomePage;
