import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

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
    <div className="w-full overflow-x-hidden bg-[#FBF8F2]">
      {/* ===== Desktop Top Section ===== */}
      <div className="hidden lg:block fixed top-0 left-0 w-full z-50">
        <TopBar />
        <Navbar />
      </div>

      {/* ===== Page Content ===== */}
      <main className="pt-[140px] lg:pt-[160px]">
        <Home />
      </main>

      <Footer />

      {/* ===== Mobile Bottom Navbar ===== */}
      <div className="lg:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
}

export default App;
