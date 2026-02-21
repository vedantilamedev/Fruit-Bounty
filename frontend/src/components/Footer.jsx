import { FaInstagram, FaGlobe, FaPhoneAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
function Footer() {
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-cover bg-center text-white overflow-hidden"
      style={{
        backgroundImage: "url('/images/footerbackground.png')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-green-950/85 backdrop-blur-sm"></div>

      <div
        className={`relative z-10 max-w-7xl mx-auto px-6 py-20 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand + Description */}
          <div>
            <img
              src="/images/footerlogo.png"
              alt="Fruit's Bounty"
              className="w-28 mb-4"
            />

            <h2 className="text-xl font-semibold mb-4">Fruit's Bounty</h2>

            <p className="text-white/80 leading-relaxed text-sm">
              Delivering farm-fresh, premium fruit bowls crafted with seasonal
              ingredients. Our mission is to make healthy eating convenient,
              delicious, and accessible for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>

            <ul className="space-y-3 text-white/80">
              {[
                "Home",
                "Our Bowls",
                "Customize Bowl",
                "Offers",
                "About Us",
              ].map((item, index) => (
                <li
                  key={index}
                  className="hover:text-[#C9C27A] transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Care</h3>

            <ul className="space-y-3 text-white/80">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#C9C27A]" />
                <span>+91 8955276223</span>
              </li>

              <li className="hover:text-[#C9C27A] transition cursor-pointer">
                Contact Us
              </li>
              <li>
              <Link  to="/privacy-policy" className="hover:text-[#C9C27A] transition cursor-pointer">
                Privacy Policy
                </Link>
              </li>
              <li>
              <Link
                  to="/terms-and-conditions" className="hover:text-[#C9C27A] transition cursor-pointer">
                Terms & Conditions
                  </Link>
              </li>
            </ul>

            {/* Only 2 Social Icons (Same as before) */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/fruitsbounty/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#C9C27A] text-green-900 hover:scale-110 transition duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="https://fruitbounty.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#C9C27A] text-green-900 hover:scale-110 transition duration-300"
              >
                <FaGlobe />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              Subscribe to Newsletter
            </h3>

            <p className="text-white/80 text-sm mb-4">
              Get updates on new bowls, offers, and seasonal specials.
            </p>

            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#C9C27A] text-white placeholder-white/60"
              />

              <button className="bg-gradient-to-r from-[#C9C27A] to-[#AFA855] text-green-900 font-semibold py-3 rounded-xl hover:scale-105 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-16 pt-6 text-center text-sm text-white/60">
          © {new Date().getFullYear()} Fruit's Bounty. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
