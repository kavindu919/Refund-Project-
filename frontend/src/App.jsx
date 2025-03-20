import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import DamageClaimForm from "./pages/DamageClaimForm";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/claimpage" element={<DamageClaimForm />} />
      </Routes>
    </Router>
  );
}

export default App;
