import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import Footer from "./components/Footer";
import LocationDrawer from "./components/LocationDrawer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword"; // New Import
import Fruits from "./pages/Fruits";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Subscription from "./pages/Subscription";
import PlanCustomization from "./pages/PlanCustomization";
import ContactUs from "./pages/ContactUs";
import FruitShop from "./pages/FruitShop";
import CustomBowlPage from "./pages/CustomBowlPage";
import Dashboard from "./pages/UserDashboard/Dashboard";

function AppContent() {
  const [locationOpen, setLocationOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === "/user-dashboard";

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false,
      mirror: true,
      offset: 100,
    });
  }, []);

  const MainLayout = () => (
    <>
      <Outlet />
      <Footer />
    </>
  );

  return (
    <div className="w-full bg-[#FBF8F2] relative">
      {/* ===== Fixed Header ===== */}
      {!isDashboard && (
        <div className="fixed top-0 left-0 w-full z-40">
          <TopBar onOpen={() => setLocationOpen(true)} />
          <Navbar />
        </div>
      )}

      {/* ===== Location Drawer (Above Everything) ===== */}
      <LocationDrawer
        open={locationOpen}
        onClose={() => setLocationOpen(false)}
      />

      {/* ===== Page Content ===== */}
      <main className={`${!isDashboard ? "pt-[120px] lg:pt-[110px]" : ""} min-h-screen overflow-x-hidden`}>
        <Routes>
          {/* Routes with Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/fruits" element={<Fruits />} />
            <Route path="/shop" element={<FruitShop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/plancustomization" element={<PlanCustomization />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/customize" element={<CustomBowlPage />} />
            
          </Route>

          {/* Dashboard without Global Footer */}
          <Route path="/user-dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* Mobile Bottom Navbar */}
      {!isDashboard && (
        <div className="lg:hidden">
          <MobileNavbar />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
