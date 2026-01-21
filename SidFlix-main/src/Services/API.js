import axios from "axios";




export const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


const TMDB_API_KEY = "1cf242978fe90d0224b997a532929a30";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Search movies for main results or suggestions
export const fetchMoviesBySearch = async (query, isSuggestion = false) => {
  try {
    const res = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        language: "en-US",
      },
    });

    const movies = res.data.results || [];
    if (isSuggestion) {
      return movies.slice(0, 6).map((m) => ({
        Title: m.title,
        Poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : "",
        Year: m.release_date ? m.release_date.split("-")[0] : "",
        id: m.id,
      }));
    }

    return movies.map((m) => ({
      id: m.id,
      Title: m.title,
      Poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : "",
      Year: m.release_date ? m.release_date.split("-")[0] : "",
      Language: m.original_language,
      overview: m.overview,
      genre_ids: m.genre_ids,
    }));
  } catch (err) {
    console.error("Error searching movies:", err);
    return [];
  }
};

// Fetch full movie details + trailer
export const fetchMovieById = async (id) => {
  try {
    const movieRes = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });
    const movie = movieRes.data;

    const videosRes = await axios.get(`${TMDB_BASE_URL}/movie/${id}/videos`, {
      params: { api_key: TMDB_API_KEY, language: "en-US" },
    });

    const trailer = videosRes.data.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    return {
      ...movie,
      trailerKey: trailer ? trailer.key : null,
    };
  } catch (err) {
    console.error("Error fetching movie details:", err);
    return null;
  }
};

// Trending movies (weekly) optional language
export const fetchTrendingMovies = async (language = "en") => {
  try {
    const res = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: { api_key: TMDB_API_KEY, language },
    });
    return res.data.results || [];
  } catch (err) {
    console.error("Error fetching trending movies:", err);
    return [];
  }
};

// Fetch movies by genre
export const fetchMoviesByGenre = async (genreName) => {
  try {
    const genreMap = {
      Action: 28,
      Comedy: 35,
      Crime: 80,
      Drama: 18,
      Thriller: 53,
    };
    const genreId = genreMap[genreName];
    if (!genreId) return [];

    const res = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        with_genres: genreId,
        sort_by: "popularity.desc",
        language: "en-US",
      },
    });
    return res.data.results || [];
  } catch (err) {
    console.error("Error fetching genre movies:", err);
    return [];
  }
};
