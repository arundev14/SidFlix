import { useNavigate } from "react-router-dom";

function Subscribe() {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    localStorage.setItem("isSubscribed", "true");
    alert("Subscription activated!");
    navigate(-1); // back to movie page
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Get Premium</h1>
        <p style={{ color: "#ccc" }}>
          Subscribe to watch movie trailers in HD.
        </p>

        <button style={styles.button} onClick={handleSubscribe}>
          Subscribe ₹149 / month
        </button>

        <button style={styles.back} onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "black",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#141414",
    padding: "40px",
    borderRadius: "8px",
    width: "350px",
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#e50914",
    border: "none",
    borderRadius: "4px",
    marginTop: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "white",
  },
  back: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "none",
    border: "1px solid #777",
    color: "#ccc",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Subscribe;
