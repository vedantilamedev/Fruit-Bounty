import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login"; // Ensure you have created this file
import Register from "./pages/Register"; // Ensure you have created this file
import Fruits from "./pages/Fruits";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import FruitShop from "./pages/FruitShop";
import CustomBowlPage from "./pages/CustomBowlPage";
import CartPage from "./pages/CartPage";





function App() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      mirror: true,
      offset: 100,
    });
  }, []);

  return (
    <Router>
      <div className="w-full overflow-x-hidden bg-[#FBF8F2]">
        {/* ===== Desktop Top Section ===== */}
        <div className="hidden lg:block fixed top-0 left-0 w-full z-50">
          <TopBar />
          <Navbar />
        </div>

        {/* ===== Page Content ===== */}
        {/* The padding-top ensures content isn't hidden behind the fixed Navbar */}
        <main className="pt-[140px] lg:pt-[160px] min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Shopping Pages */}
            <Route path="/fruits" element={<Fruits />} />
            <Route path="/shop" element={<FruitShop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/customize" element={<CustomBowlPage />} />
            <Route path="/cart" element={<CartPage />} />


          </Routes>

        </main>

        <Footer />

        {/* ===== Mobile Bottom Navbar ===== */}
        <div className="lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </Router>
  );
}

export default App;