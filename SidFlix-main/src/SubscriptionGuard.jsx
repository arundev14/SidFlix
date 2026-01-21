import { Navigate } from "react-router-dom";

const SubscriptionGuard = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // If user is not logged in → redirect to login
  if (!user || !localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in but NOT subscribed → redirect to subscription page
  if (!user.subscription) {
    return <Navigate to="/subscription" replace />;
  }

  // User is subscribed → show page
  return children;
};

export default SubscriptionGuard;
