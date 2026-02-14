import { FaInstagram, FaGlobe } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="relative bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/images/footerbackground.png')",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-green-900/85"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <img
              src="/images/footerlogo.png"
              alt="Fruit's Bounty"
              className="w-28 mb-4"
            />

            <h2 className="text-xl font-semibold mb-6">Fruit's Bounty</h2>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/fruitsbounty/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#C9C27A] text-green-900 hover:scale-110 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://fruitbounty.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#C9C27A] text-green-900 hover:scale-110 transition"
              >
                <FaGlobe />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>

            <ul className="space-y-3 text-white/90">
              <li className="hover:text-[#C9C27A] cursor-pointer">Home</li>
              <li className="hover:text-[#C9C27A] cursor-pointer">Our Bowls</li>
              <li className="hover:text-[#C9C27A] cursor-pointer">
                Customize Bowl
              </li>
              <li className="hover:text-[#C9C27A] cursor-pointer">Offers</li>
              <li className="hover:text-[#C9C27A] cursor-pointer">About Us</li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Care</h3>

            <ul className="space-y-3 text-white/90">
              <li className="hover:text-[#C9C27A] cursor-pointer">
                Contact Us
              </li>
              <li className="hover:text-[#C9C27A] cursor-pointer">Map</li>
              <li className="hover:text-[#C9C27A] cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-[#C9C27A] cursor-pointer">
                Terms & Conditions
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-white/70">
          © {new Date().getFullYear()} Fruit's Bounty. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
