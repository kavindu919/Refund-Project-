import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import DamageClaimForm from "./pages/DamageClaimForm";
import LoginPage from "./pages/LoginPage";
import Refund from "./pages/Refund";
import AddProductPage from "./pages/AddProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/claimpage" element={<DamageClaimForm />} />
        <Route path="/refundtable" element={<Refund />} />
        <Route path="/addproduct" element={<AddProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
