import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import DamageClaimForm from "./pages/DamageClaimForm";
import LoginPage from "./pages/LoginPage";
import Refund from "./pages/Refund";
import AddProductPage from "./pages/AddProductPage";
import RefundHistroty from "./pages/RefundHistroty";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/claimpage" element={<DamageClaimForm />} />
        <Route path="/refundtable" element={<Refund />} />
        <Route path="/addproduct" element={<AddProductPage />} />
        <Route path="/refundhistory" element={<RefundHistroty />} />
      </Routes>
    </Router>
  );
}

export default App;
