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
      {/* - Height reduced from min-h-[650px] to min-h-[400px]
         - Aspect ratio updated to [1920/600] for a slimmer profile
         - Enhanced background overlay with deeper green (green-950)
      */}
      <div
        ref={footerRef}
        className="relative w-full overflow-hidden bg-no-repeat bg-cover bg-center aspect-[16/9] md:aspect-[1920/600] min-h-[400px] flex items-center border-t-[3px] border-[#C9C27A]"
        style={{
          backgroundImage: "url('/images/footer-background.png')",
        }}
      >
        {/* Enhanced Green Overlay (Deeper for consistency) */}
        <div className="absolute inset-0 bg-green-950/85 md:bg-green-950/75"></div>

        {/* Content Wrapper */}
        <div
          className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-8 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-white items-start">
            
            {/* 1. Brand Identity */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
              <div className="w-24 md:w-28">
                <img
                  src="/images/footerlogo.png"
                  alt="Fruit's Bounty"
                  className="w-full h-auto object-contain brightness-110"
                />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tighter text-[#C9C27A] uppercase">Fruit's Bounty</h2>
                <p className="text-[11px] md:text-xs font-medium opacity-80 leading-relaxed max-w-[240px] uppercase tracking-wider">
                  Premium fruit bowls crafted with seasonal ingredients.
                </p>
              </div>
              
              <div className="flex gap-3 pt-2">
                <a href="https://www.instagram.com/fruitsbounty/" className="w-8 h-8 rounded-lg bg-[#C9C27A] text-green-950 flex items-center justify-center hover:bg-white transition-all shadow-lg hover:-translate-y-1">
                  <FaInstagram size={16} />
                </a>
                <a href="https://fruitbounty.com/" className="w-8 h-8 rounded-lg bg-[#C9C27A] text-green-950 flex items-center justify-center hover:bg-white transition-all shadow-lg hover:-translate-y-1">
                  <FaGlobe size={16} />
                </a>
              </div>
            </div>

            {/* 2. Navigation */}
            <div className="flex flex-col items-center md:items-start space-y-2">
              <h3 className="text-xs font-black text-[#C9C27A] uppercase tracking-widest mb-2">Explore</h3>
              {["Home", "Our Bowls", "Customize Bowl", "About Us"].map((link) => (
                <a key={link} href="#" className="text-[11px] font-bold uppercase tracking-widest hover:text-[#C9C27A] transition-colors">
                  {link}
                </a>
              ))}
            </div>

            {/* 3. Customer Care & Policies */}
            <div className="flex flex-col items-center md:items-start space-y-2">
              <h3 className="text-xs font-black text-[#C9C27A] uppercase tracking-widest mb-2">Support</h3>
              <a href="#" className="text-[11px] font-bold uppercase tracking-widest hover:text-[#C9C27A] transition-colors">Contact Us</a>
              <Link to="/terms-and-conditions" className="text-[11px] font-bold uppercase tracking-widest hover:text-[#C9C27A] transition-colors">Terms</Link>
              <Link to="/privacy-policy" className="text-[11px] font-bold uppercase tracking-widest hover:text-[#C9C27A] transition-colors">Privacy</Link>
              <div className="flex items-center gap-2 pt-2 text-[#C9C27A]">
                  <FaPhoneAlt size={12} />
                  <span className="font-black text-white text-sm ">+91 8955276223</span>
              </div>
            </div>

            {/* 4. Spacer Column (Keeps the Hawa Mahal graphic visible on the right) */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Copyright Section */}
          <div className="w-full text-center mt-10 md:mt-12 pt-6 border-t border-white/10">
            <p className="text-[9px] md:text-[10px] text-[#C9C27A] tracking-[0.4em] font-black uppercase opacity-60">
              © 2026 FRUIT'S BOUNTY. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;