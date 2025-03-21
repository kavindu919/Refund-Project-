import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import DamageClaimForm from "./pages/DamageClaimForm";
import LoginPage from "./pages/LoginPage";
import Refund from "./pages/Refund";
import AddProductPage from "./pages/AddProductPage";
import RefundHistroty from "./pages/RefundHistroty";
import FinancialPage from "./pages/FinancialPage";
import BalanceSheetPage from "./pages/BalanceSheet";
import ProductListPage from "./pages/ProductListPage";
import OrderPage from "./pages/OrderPage";
import NetProfitPage from "./pages/NetProfitPage";
import StockPage from "./pages/StockPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/claimpage" element={<DamageClaimForm />} />
        <Route path="/refundtable" element={<Refund />} />
        <Route path="/addproduct" element={<AddProductPage />} />
        <Route path="/refundhistory" element={<RefundHistroty />} />
        <Route path="/finance" element={<FinancialPage />} />
        <Route path="/balancesheet" element={<BalanceSheetPage />} />
        <Route path="/productlist" element={<ProductListPage />} />
        <Route path="/orderpage" element={<OrderPage />} />
        <Route path="/netprofit" element={<NetProfitPage />} />
        <Route path="/stocks" element={<StockPage />} />
      </Routes>
    </Router>
  );
}

export default App;
