import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import Footer from "./components/Footer";
import LocationDrawer from "./components/LocationDrawer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Fruits from "./pages/Fruits";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import FruitShop from "./pages/FruitShop";
import CustomBowlPage from "./pages/CustomBowlPage";
import CartPage from "./pages/CartPage";
import Dashboard from "./pages/Dashboard/Dashboard";

import AdminRoutes from "./admin/routes/AdminRoutes";

// Layout wrapper to hide header/footer on admin routes
function Layout({ children }) {
  const location = useLocation();
  const [locationOpen, setLocationOpen] = useState(false);

  const isAdmin = location.pathname.startsWith("/admin");

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
    <div className="w-full bg-[#FBF8F2] relative">
      {!isAdmin && (
        <>
          <div className="fixed top-0 left-0 w-full z-40">
            <TopBar onOpen={() => setLocationOpen(true)} />
            <Navbar />
          </div>

          <LocationDrawer
            open={locationOpen}
            onClose={() => setLocationOpen(false)}
          />
        </>
      )}

      <main
        className={`min-h-screen overflow-x-hidden ${
          !isAdmin ? "pt-[120px] lg:pt-[110px]" : ""
        }`}
      >
        {children}
      </main>

      {!isAdmin && (
        <>
          <Footer />
          <div className="lg:hidden">
            <MobileNavbar />
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/shop" element={<FruitShop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/customize" element={<CustomBowlPage />} />
          <Route path="/cart-page" element={<CartPage />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Admin Panel */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
