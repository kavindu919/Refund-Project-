import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import DamageClaimForm from "./pages/DamageClaimForm";
import LoginPage from "./pages/LoginPage";
import Refundtable from "./components/Refundtable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/claimpage" element={<DamageClaimForm />} />
        <Route path="/refundtable" element={<Refundtable />} />
      </Routes>
    </Router>
  );
}

export default App;
