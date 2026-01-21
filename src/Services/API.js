const API_KEY = "d1e3af61";
const BASE_URL = "https://www.omdbapi.com/";


export const fetchMoviesBySearch = async (query) => {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    const data = await response.json();
    if (data.Search) {
        
        const detailedMovies = await Promise.all(
            data.Search.map(async (movie) => {
                const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}`);
                const details = await res.json();
                return details;
            })
        );
        return detailedMovies;
    } else {
        return [];
    }
};
