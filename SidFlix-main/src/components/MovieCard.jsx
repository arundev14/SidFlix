import { useNavigate } from "react-router-dom";
import '../css/MovieCard.css';

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.Poster && movie.Poster !== "N/A"
    ? movie.Poster
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div
      className="movie-card"
      onClick={handleClick}
      style={{
        width: "200px",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        color: "white",
        transition: "transform 0.3s",
      }}
    >
      <img
        src={posterUrl}
        alt={movie.Title || movie.title}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          display: "block",
        }}
      />
      
      {/* Overlay details on hover */}
      <div className="overlay" style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.7)",
        opacity: 0,
        transition: "opacity 0.3s",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "10px",
      }}>
        <h3 style={{ fontSize: "16px", marginBottom: "5px" }}>{movie.Title || movie.title}</h3>
        <p style={{ fontSize: "12px", color: "#ccc", margin: 0 }}>
          {movie.release_date?.split("-")[0]} | {movie.original_language?.toUpperCase()}
        </p>
      </div>

      <style>
        {`
          .movie-card:hover {
            transform: scale(1.1);
            z-index: 10;
          }
          .movie-card:hover .overlay {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}

export default MovieCard;
