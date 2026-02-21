import { FaInstagram, FaGlobe, FaPhoneAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="w-full">
      {/* - Extra border hata di gayi hai taaki original image border dikhe.
         - md:aspect-[1920/800] maintain karta hai image ke original proportions ko.
         - items-center content ko vertically center rakhta hai.
      */}
      <div
        ref={footerRef}
        className="relative w-full overflow-hidden bg-no-repeat bg-cover bg-center md:aspect-[1920/800] min-h-[650px] md:min-h-[500px] flex items-center"
        style={{
          backgroundImage: "url('/public/images/footer-background.png')",
        }}
      >
        {/* Subtle overlay to make text pop without hiding the Hawa Mahal graphic */}
        <div className="absolute inset-0 bg-green-950/70 md:bg-green-950/50"></div>

        {/* Content Wrapper */}
        <div
          className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-10 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-white items-start">
            
            {/* 1. Brand Identity */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
              <div className="w-28 md:w-32">
                <img
                  src="/public/images/footerlogo.png"
                  alt="Fruit's Bounty"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#C9C27A]">Fruit's Bounty</h2>
                <p className="text-sm opacity-90 leading-relaxed max-w-[280px]">
                  Delivering farm-fresh, premium fruit bowls crafted with seasonal ingredients.
                </p>
              </div>
              
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/fruitsbounty/" 
                  className="w-10 h-10 rounded-full bg-[#C9C27A] text-green-900 flex items-center justify-center hover:bg-white transition shadow-lg"
                >
                  <FaInstagram size={18} />
                </a>
                <a 
                  href="https://fruitbounty.com/" 
                  className="w-10 h-10 rounded-full bg-[#C9C27A] text-green-900 flex items-center justify-center hover:bg-white transition shadow-lg"
                >
                  <FaGlobe size={18} />
                </a>
              </div>
            </div>

            {/* 2. Navigation */}
            <div className="flex flex-col items-center md:items-start space-y-3">
              <h3 className="text-lg font-bold text-[#C9C27A] uppercase tracking-wider mb-2">Explore</h3>
              {["Home", "Our Bowls", "Customize Bowl", "Offers", "About Us"].map((link) => (
                <a key={link} href="#" className="text-sm md:text-base font-medium hover:text-[#C9C27A] transition-colors w-fit">
                  {link}
                </a>
              ))}
            </div>

            {/* 3. Customer Care & Policies */}
            <div className="flex flex-col items-center md:items-start space-y-3">
              <h3 className="text-lg font-bold text-[#C9C27A] uppercase tracking-wider mb-2">Customer Care</h3>
              <a href="#" className="text-sm md:text-base font-medium hover:text-[#C9C27A] transition-colors w-fit">Contact Us</a>
              <Link to="/terms-and-conditions" className="text-sm md:text-base font-medium hover:text-[#C9C27A] transition-colors w-fit">Terms & Conditions</Link>
              <Link to="/privacy-policy" className="text-sm md:text-base font-medium hover:text-[#C9C27A] transition-colors w-fit">Privacy Policy</Link>
              <div className="flex items-center gap-2 pt-4 text-[#C9C27A]">
                  <FaPhoneAlt size={14} />
                  <span className="font-bold text-white text-base md:text-lg">+91 8955276223</span>
              </div>
            </div>

            {/* 4. Spacer Column (Keeps the Hawa Mahal graphic visible on the right) */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Copyright - Pure white and bold for maximum visibility */}
          <div className="w-full text-center mt-12 md:mt-20">
            <p className="text-[11px] md:text-sm text-[#C9C27A] tracking-[0.3em] font-bold uppercase drop-shadow-lg">
              © 2026 FRUIT'S BOUNTY. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;