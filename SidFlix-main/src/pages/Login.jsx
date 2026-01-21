import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../Services/API";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("isLoggedIn", "true");

      if (!res.data.user.subscription) {
        return navigate("/subscription", { replace: true });
;
      }

      navigate("/");
    } catch {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: "15px" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.text}>
          New user?{" "}
          <span style={styles.link} onClick={() => navigate("/signup")}>
            Create account
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
    boxShadow: "0 0 20px rgba(0,0,0,0.7)"
  },

  input: {
    width: "100%",
    marginBottom: "15px",
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
};

export default Login;
