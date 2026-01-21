import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../Services/API";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else setEmailError("");

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    } else setPasswordError("");

    if (!valid) return;

    try {
      await API.post("/auth/signup", {
        name: email.split("@")[0],
        email,
        password,
      });

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert("User already exists");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: "15px" }}>Create Account</h2>

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p style={styles.error}>{emailError}</p>}

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p style={styles.error}>{passwordError}</p>}

        <button style={styles.button} onClick={handleSignup}>
          Sign Up
        </button>

        <p style={styles.text}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#000",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },

  card: {
    backgroundColor: "#141414",
    padding: "30px",
    borderRadius: "8px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 0 20px rgba(0,0,0,0.7)",
  },

  input: {
    width: "100%",
    marginBottom: "10px",
    padding: "12px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#222",
    color: "white",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#e50914",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },

  text: {
    marginTop: "12px",
    fontSize: "14px",
  },

  link: {
    color: "#e50914",
    cursor: "pointer",
    fontWeight: "bold",
  },

  error: {
    color: "#e50914",
    fontSize: "12px",
    marginBottom: "8px",
    textAlign: "left",
  },
};

export default Signup;
