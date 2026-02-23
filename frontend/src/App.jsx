import { useEffect, useState } from "react";
import { BrowserRouter as Router,Routes,Route,useLocation,} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import Footer from "./components/Footer";
import LocationDrawer from "./components/LocationDrawer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import ForgotPassword from "./pages/ForgotPassword";
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
import { Navigate } from "react-router-dom";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// ❗ Add this if you really have CartPage
// import CartPage from "./pages/CartPage";
import AdminRoutes from "./admin/routes/AdminRoutes";
// ---------------- Layout Wrapper ----------------
function Layout({ children }) {
  const [locationOpen, setLocationOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isDashboard = location.pathname.startsWith("/dashboard");
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
      {!isAdmin && !isDashboard && (
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
          !isAdmin && !isDashboard ? "pt-[64px] lg:pt-[110px]" : ""
        }`}
      >
        {children}
      </main>
      {!isAdmin && !isDashboard &&(
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
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// ---------------- App ----------------
export default function App() {
  return (
    
    <Router>
      
      <Layout>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/fruits" element={<Fruits />} />
          <Route path="/shop" element={<FruitShop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/plancustomization" element={<PlanCustomization />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/customize" element={<CustomBowlPage />} />


      
          {/* Remove if not using CartPage */}
          {/* <Route path="/cart-page" element={<CartPage />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />


          {/* Admin */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Layout>
    </Router>
  );
}
