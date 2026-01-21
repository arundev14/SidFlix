import axios from "axios";
import { useNavigate } from "react-router-dom";

function Subscription() {
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    try {
      const token = localStorage.getItem("token");

      // Instant upgrade
      const res = await axios.post(
        "http://localhost:5000/api/payment/upgrade", // existing backend route
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("🎉 You are now a Premium user!");
      navigate("/"); // redirect to home or wherever you want
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={{ marginBottom: "20px" }}>Upgrade to Premium</h1>
        <button style={styles.button} onClick={handleSubscribe}>
          Subscribe Now
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#141414",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  card: {
    backgroundColor: "#222",
    padding: "40px",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 0 20px rgba(0,0,0,0.7)",
  },
  button: {
    padding: "15px 30px",
    backgroundColor: "#e50914",
    border: "none",
    borderRadius: "5px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Subscription;
