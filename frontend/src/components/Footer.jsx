import { FaInstagram, FaGlobe, FaPhoneAlt, FaYoutube, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="w-full">
      <div
        ref={footerRef}
        className="relative w-full overflow-hidden bg-no-repeat bg-cover bg-center border-t-[3px] border-[#C9C27A] flex items-center min-h-[450px] py-12 md:py-16"
        style={{ backgroundImage: "url('/images/footer-background.webp')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-green-950/90 md:bg-green-950/85"></div>

        {/* Content */}
        <div
          className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 text-white items-start">

            {/* 1. Brand & Socials */}
            <div className="flex flex-col items-start space-y-5">
              <div className="w-28 md:w-32">
                <img
                  src="/images/footerlogo.webp"
                  alt="Fruit's Bounty"
                  className="w-full object-contain brightness-125"
                />
              </div>

              <div>
                <h2 className="text-xl font-black tracking-tighter text-[#C9C27A] uppercase">
                  Fruit's Bounty
                </h2>
                <p className="text-[11px] font-medium opacity-90 leading-relaxed max-w-[260px] uppercase tracking-wider">
                  Fresh fruit salads delivered to your doorstep in Jaipur. From Chitrakoot Stadium to home delivery.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <a href="https://www.instagram.com/fruitsbounty/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[#C9C27A] text-green-950 flex items-center justify-center hover:bg-white transition-all shadow-lg hover:-translate-y-1">
                  <FaInstagram size={18} />
                </a>
                {/* Added YouTube Link */}
                <a href="https://www.youtube.com/@fruitsbounty" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[#C9C27A] text-green-950 flex items-center justify-center hover:bg-white transition-all shadow-lg hover:-translate-y-1">
                  <FaYoutube size={18} />
                </a>
                <a href="https://fruitsbounty.shop" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-[#C9C27A] text-green-950 flex items-center justify-center hover:bg-white transition-all shadow-lg hover:-translate-y-1">
                  <FaGlobe size={18} />
                </a>
              </div>
            </div>

            {/* 2. Navigation - All Links Retained */}
            <div className="flex flex-col items-start space-y-4">
              <h3 className="text-xs font-black text-[#C9C27A] uppercase tracking-widest mb-2 border-b border-[#C9C27A]/30 pb-1">
                Explore
              </h3>
              <div className="flex flex-col items-start space-y-3">
                {[
                  { label: "Home", to: "/" },
                  { label: "Our Bowls", to: "/shop" },
                  { label: "Customize Bowl", to: "/customize" },
                  { label: "About Us", to: "/about-us" },
                ].map((link) => (
                  <Link key={link.label} to={link.to} className="text-[12px] font-bold uppercase tracking-widest hover:text-[#C9C27A] transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Support & Contact Alignment */}
            <div className="flex flex-col items-start space-y-4">
              <h3 className="text-xs font-black text-[#C9C27A] uppercase tracking-widest mb-2 border-b border-[#C9C27A]/30 pb-1">
                Reach Us
              </h3>

              <div className="flex flex-col items-start space-y-4">
                <Link to="/contactus" className="text-[12px] font-bold uppercase tracking-widest hover:text-[#C9C27A] transition-colors">
                  Contact Us
                </Link>

                {/* Phone Alignment Fixed */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C9C27A]/20 flex items-center justify-center text-[#C9C27A]">
                    <FaPhoneAlt size={14} />
                  </div>
                  <a href="tel:+918955276223" className="font-black text-white text-sm hover:text-[#C9C27A]">
                    +91 8955276223
                  </a>
                </div>

                {/* Google Maps Link Added */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C9C27A]/20 flex items-center justify-center text-[#C9C27A] mt-1">
                    <FaMapMarkerAlt size={14} />
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Chitrakoot+Stadium+Jaipur" 
                    target="_blank" 
                    rel="noreferrer"
                    className="font-bold text-white text-[11px] leading-tight uppercase tracking-wider hover:text-[#C9C27A]"
                  >
                    Chitrakoot Stadium, <br /> Vaishali Nagar, Jaipur
                  </a>
                </div>
              </div>
            </div>

            {/* 4. Policy & Quality */}
            <div className="flex flex-col items-start space-y-4">
              <h3 className="text-xs font-black text-[#C9C27A] uppercase tracking-widest mb-2 border-b border-[#C9C27A]/30 pb-1">
                Policies
              </h3>
              <div className="flex flex-col items-start space-y-3 mb-4">
                <Link to="/terms-and-conditions" className="text-[12px] font-bold uppercase tracking-widest hover:text-[#C9C27A]">Terms</Link>
                <Link to="/privacy-policy" className="text-[12px] font-bold uppercase tracking-widest hover:text-[#C9C27A]">Privacy</Link>
              </div>

              <p className="text-[10px] text-white font-black uppercase tracking-[0.2em] leading-relaxed border-t border-[#C9C27A]/20 pt-4">
                Freshness Delivered Daily <br /> 6:00 AM TO 11:00 AM
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="w-full text-center mt-12 pt-8 border-t border-white/20">
            <p className="text-[10px] text-[#C9C27A] tracking-[0.2em] md:tracking-[0.4em] font-black uppercase opacity-80">
              © 2026 FRUIT'S BOUNTY. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;