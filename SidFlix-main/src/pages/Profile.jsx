import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../Services/API";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (!u) return navigate("/login");
    setUser(u);
    setName(u.name);
  }, []);

  const handleSave = async () => {
    try {
      const res = await API.put(
        "/auth/profile", // 🔥 must match backend
        { name, password },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Profile update failed!");
    }
  };

 const logout = () => {
  localStorage.clear();
  navigate("/", { replace: true }); // 🔥 go to Home
};


  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ background: "#111", padding: 30, width: 320, color: "#fff", borderRadius: 8, textAlign: "center" }}>
        <h2>My Profile</h2>

        <input
          style={{ width: "100%", padding: 10, margin: 8, background: "#333", border: "none", color: "#fff" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <input
          style={{ width: "100%", padding: 10, margin: 8, background: "#333", border: "none", color: "#fff" }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
        />

        <div style={{ background: "#000", padding: 10, marginTop: 10, borderRadius: 5 }}>
          <p>Plan: <b>{user.subscription?.plan || "Free"}</b></p>
          <p>Status: <b>{user.subscription ? "Active" : "Inactive"}</b></p>
        </div>

        <button style={{ width: "100%", padding: 10, background: "red", border: "none", color: "#fff", marginTop: 10 }} onClick={handleSave}>Save</button>
        <button style={{ width: "100%", padding: 10, background: "#333", border: "none", color: "#fff", marginTop: 8 }} onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Profile;
