import '../css/MovieCard.css'

function MovieCard({ movie }) {
    return (
        <div
            className="movie-card"
            style={{
                width: "200px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                textAlign: "center",
                background: "#f9f9f9"
            }}
        >
            <div className="movie-poster">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image"}
                    alt={movie.Title}
                    style={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
            </div>
            <div style={{ padding: "10px" }}>
                <h3 style={{ fontSize: "16px", color: "#555" }}>{movie.Title}</h3>
                <h4 style={{ color: "#555" }}>{movie.Year}</h4>
                <p style={{ fontSize: "12px", color: "#777" }}>{movie.Genre}</p>
                <p style={{ fontSize: "12px", color: "#777" }}>{movie.Language}</p>
            </div>
        </div>
    );
}

export default MovieCard;
