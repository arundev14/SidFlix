import { useState } from "react";
import SearchBar from "./SearchBar";
import '../css/Navbar.css';
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function SearchNavbar({ onSearch }) {
  const [hoverUser, setHoverUser] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <h2 className="logo">
        <img src="/sid.png" alt="Sidflix" style={{ height: 45 }} />
      </h2>

      <SearchBar onSearch={onSearch} />

       <button
          onClick={() =>
    isLoggedIn ? navigate("/profile") : navigate("/login", { replace: true })

  }
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <CiUser
            style={{
              color: hoverUser ? "red" : "white",
              fontSize: "24px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={() => setHoverUser(true)}
            onMouseLeave={() => setHoverUser(false)}
          />
        </button>
    </nav>
  );
}

export default SearchNavbar;
