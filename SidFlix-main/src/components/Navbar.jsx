import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser, CiSearch } from "react-icons/ci";

function Navbar() {
  const [hoverUser, setHoverUser] = useState(false);
  const [hoverSearch, setHoverSearch] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";


  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 25px",
        backgroundColor: "black",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      {/* Logo */}
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <img src="/sid.png" alt="Sidflix" style={{ height: 45 }} />
      </h2>

      {/* Right Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        
        {/* Search Icon */}
        <button
          onClick={() => navigate("/SearchPage")}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <CiSearch
            style={{
              color: hoverSearch ? "red" : "white",
              fontSize: "24px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={() => setHoverSearch(true)}
            onMouseLeave={() => setHoverSearch(false)}
          />
        </button>

        {/* Profile Icon → takes user to login/signup */}
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

      </div>
    </nav>
  );
}

export default Navbar;
