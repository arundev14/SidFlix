import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import '../css/Navbar.css'

function Navbar({ onSearch, onFilterChange }) {
    return (
        <nav className="navbar">
            <h2 className="logo">
                <span>SIDFLIX</span>
                <span> - a movies app</span>
            </h2>

            <SearchBar onSearch={onSearch} />
            <FilterBar onFilterChange={onFilterChange} />
        </nav>
    );
}

export default Navbar;
