import '../css/Filterbar.css'
function FilterBar({ onFilterChange }) {
    const handleLanguageChange = (e) => {
        onFilterChange(prev => ({ ...prev, language: e.target.value }));
    };

    const handleGenreChange = (e) => {
        onFilterChange(prev => ({ ...prev, genre: e.target.value }));
    };

    return (
        <div className="filter-bar">
            <select onChange={handleLanguageChange} defaultValue="">
                <option value="">All Languages</option>
                <option value="Tamil">Tamil</option>
                <option value="english">English</option>
                
                <option value="french">French</option>
                <option value="spanish">Spanish</option>
            </select>

            <select onChange={handleGenreChange} defaultValue="">
                <option value="">All Genres</option>
                <option value="action">Action</option>
                <option value="adventure">Adventure</option>
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="horror">Horror</option>
            </select>
        </div>
    );
}

export default FilterBar;
