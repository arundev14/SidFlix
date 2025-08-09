import { useState, useEffect } from "react";
import MovieCard from "../components/moviecard";
import Navbar from "../components/Navbar";
import { fetchMoviesBySearch } from "../Services/API";
import SearchingAnimation from "../components/SearchingAnimation";

function Home() {
    const [movies, setMovies] = useState([]);
    const [filters, setFilters] = useState({ language: "", genre: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleSearch("Batman");
    }, []);

    const handleSearch = async (query) => {
        setLoading(true);
        setMovies([]); // clear current movies before search
        const fetchedMovies = await fetchMoviesBySearch(query);
        setMovies(fetchedMovies);
        setLoading(false);
    };

    const handleFilterChange = (updateFn) => {
        setFilters(updateFn);
    };

    const filteredMovies = movies.filter((movie) => {
        const matchesLanguage =
            filters.language === "" ||
            (movie.Language &&
                movie.Language.toLowerCase()
                    .split(',')
                    .map(lang => lang.trim())
                    .includes(filters.language.toLowerCase()));

        const matchesGenre =
            filters.genre === "" ||
            (movie.Genre &&
                movie.Genre.toLowerCase()
                    .split(',')
                    .map(genre => genre.trim())
                    .includes(filters.genre.toLowerCase()));

        return matchesLanguage && matchesGenre;
    });

    return (
        <>
            <Navbar onSearch={handleSearch} onFilterChange={handleFilterChange} />

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    justifyContent: "center",
                    marginTop: "20px",
                }}
            >
                {loading ? (
                    <SearchingAnimation />
                ) : filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <MovieCard movie={movie} key={movie.imdbID} />
                    ))
                ) : (
                    <p style={{ color: "white" }}>No movies found.</p>
                )}
            </div>
        </>
    );
}

export default Home;
