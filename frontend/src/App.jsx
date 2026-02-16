import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; // Added useLocation
import AOS from "aos";
import "aos/dist/aos.css";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import Footer from "./components/Footer";
import LocationDrawer from "./components/LocationDrawer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Fruits from "./pages/Fruits";
import FruitShop from "./pages/FruitShop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import CustomBowlPage from "./pages/CustomBowlPage";
import CartPage from "./pages/CartPage";
import Dashboard from "./pages/Dashboard/Dashboard";

// Helper component to access useLocation
function AppContent() {
  const [locationOpen, setLocationOpen] = useState(false);
  const location = useLocation();

  // Define routes where Header and Footer should be hidden
  const hideLayout = location.pathname === "/login" 

  return (
    <div className="w-full bg-[#FBF8F2] relative">
      {/* ===== Fixed Header (Hidden on Login/Register) ===== */}
      {!hideLayout && (
        <div className="fixed top-0 left-0 w-full z-40">
          <TopBar onOpen={() => setLocationOpen(true)} />
          <Navbar />
        </div>
      )}

      {/* ===== Location Drawer ===== */}
      <LocationDrawer
        open={locationOpen}
        onClose={() => setLocationOpen(false)}
      />

      {/* ===== Page Content (Padding removed if Layout is hidden) ===== */}
      <main className={`${!hideLayout ? "pt-[120px] lg:pt-[110px]" : ""} min-h-screen overflow-x-hidden`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/shop" element={<FruitShop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/customize" element={<CustomBowlPage />} />
          <Route path="/cart-page" element={<CartPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* Footer (Hidden on Login/Register) */}
      {!hideLayout && <Footer />}

      {/* Mobile Bottom Navbar (Hidden on Login/Register) */}
      {!hideLayout && (
        <div className="lg:hidden">
          <MobileNavbar />
        </div>
      )}
    </div>
  );
}

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
      <AppContent />
    </Router>
  );
}

export default App;