import { useState } from "react";
import '../css/Searchbar.css';

function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            onSearch(searchQuery);
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for movies"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
