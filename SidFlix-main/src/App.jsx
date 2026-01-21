import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Subscription from "./pages/Subscription";
import SubscriptionGuard from "./SubscriptionGuard";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route path="/Profile" element={<Profile/>} />
        
    
    
        <Route
  path="/movie/:id"
  element={
    <SubscriptionGuard>
      <MovieDetail />
    </SubscriptionGuard>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;
