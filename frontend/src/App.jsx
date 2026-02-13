import { useEffect } from "react";
import Navbar from "./components/HomePage/Navbar";
import MobileNavbar from "./components/HomePage/MobileNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: false, // allows animation to repeat
      mirror: true, // animates again on scroll up
      offset: 100,
    });
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Desktop Navbar */}
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <main>
        <Home />
      </main>

      <Footer />

      {/* Mobile Bottom Navbar */}
      <div className="lg:hidden">
        <MobileNavbar />
      </div>
    </div>
  );
}

export default App;
