import "../css/Filterbar.css";

function FilterBar({ onFilterChange }) {
  const handleLanguageChange = (e) => {
    onFilterChange((prev) => ({ ...prev, language: e.target.value }));
  };

  const handleGenreChange = (e) => {
    onFilterChange((prev) => ({ ...prev, genre: e.target.value }));
  };

  return (
    <div className="filter-bar">
      <select onChange={handleLanguageChange} defaultValue="">
        <option value="">All Languages</option>
        <option value="Tamil">Tamil</option>
        <option value="English">English</option>
        <option value="French">French</option>
        <option value="Spanish">Spanish</option>
      </select>

      <select onChange={handleGenreChange} defaultValue="">
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Horror">Horror</option>
      </select>
    </div>
  );
}

export default FilterBar;
