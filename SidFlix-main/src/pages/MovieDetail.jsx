import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../Services/API";
import SearchingAnimation from "../components/SearchingAnimation";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const getMovie = async () => {
      setLoading(true);
      const data = await fetchMovieById(id);
      setMovie(data);
      setLoading(false);
    };
    getMovie();
  }, [id]);

  useEffect(() => {
  const getMovie = async () => {
    setLoading(true);
    const data = await fetchMovieById(id);
    setMovie(data);

    // ⭐ Save to LocalStorage
    const recent = JSON.parse(localStorage.getItem("recentlyWatched")) || [];
    const exists = recent.some((m) => m.id === data.id);

    if (!exists) {
      const newMovie = {
        id: data.id,
        title: data.title || data.Title,
        poster: data.poster_path
          ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
          : data.Poster,
      };

      recent.unshift(newMovie); // put as first item
      if (recent.length > 20) recent.pop(); // limit
      localStorage.setItem("recentlyWatched", JSON.stringify(recent));
    }

    setLoading(false);
  };
  getMovie();
}, [id]);


  if (loading) return <SearchingAnimation />;
  if (!movie) return <p style={{ color: "white" }}>Movie not found</p>;

  const posterUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.Poster && movie.Poster !== "N/A"
    ? movie.Poster
    : "https://via.placeholder.com/800x450?text=No+Image";

  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "white",
        minHeight: "100vh",
        backgroundImage: `url(${posterUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
          zIndex: 1,
        }}
      ></div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "50px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "20px", textAlign: "center" }}>
          {movie.Title || movie.title}
        </h1>
        <p style={{ maxWidth: "700px", fontSize: "1.2rem", marginBottom: "20px", textAlign: "center" }}>
          {movie.Plot || movie.overview}
        </p>

        {/* Play Button */}
        {movie.trailerKey && (
          <a
            href={`https://www.youtube.com/watch?v=${movie.trailerKey}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#e50914",
              color: "white",
              padding: "15px 30px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              borderRadius: "5px",
              textDecoration: "none",
              marginBottom: "30px",
            }}
          >
            Play Trailer
          </a>
        )}

        {/* Video player */}
        {movie.trailerKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=0&controls=1`}
            title={movie.Title || movie.title}
            style={{
              width: "80%",
              height: "450px",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(0,0,0,0.7)",
            }}
            frameBorder="0"
            allow="autoplay; fullscreen"
          ></iframe>
        ) : (
          <p>No trailer available</p>
        )}

        {/* Additional info */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>
            <strong>Language:</strong> {movie.Language || movie.original_language}
          </p>
          <p>
            <strong>Release Date:</strong> {movie.Released || movie.release_date}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre || movie.genre_ids?.join(", ")}
          </p>
          <p>
            <strong>IMDB Rating:</strong> {movie.imdbRating || movie.vote_average}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
