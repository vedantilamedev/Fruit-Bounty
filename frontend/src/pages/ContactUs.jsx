import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Instagram, 
  Youtube, 
  Phone, 
  Mail, 
  ArrowLeft,
  Sparkles,
  Send
} from "lucide-react"; 
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen font-sans bg-[#faf9f6] text-gray-900 relative selection:bg-[#C9C27A]/30">
      {/* BACKGROUND LAYER - Replicated from Cart.jsx */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage: "url('/images/main-background.webp')",
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f3f8f2]/65 via-transparent to-[#faf9f6]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pb-16">
        {/* HEADER SECTION */}
        <div className="pt-10 md:pt-12 pb-8">
          <div className="flex justify-start">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex w-fit items-center gap-2 leading-none text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 hover:text-[#C9C27A] transition-colors"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>

          <div className="text-center mt-7">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              Get In <span className="text-[#C9C27A]">Touch</span>{" "}
              <Sparkles className="inline text-[#C9C27A]" size={30} />
            </h1>
            <p className="text-gray-500 mt-3 font-black uppercase tracking-widest text-[10px]">
              We'd Love To Hear From You
            </p>
          </div>
        </div>

        {/* MAP SECTION - Responsive height and matching border */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-[350px] md:h-[450px] mb-8 rounded-[2.5rem] overflow-hidden shadow-2xl border-[3px] border-[#C9C27A]"
        >
          <iframe 
            title="location"
            width="100%" 
            height="100%" 
            frameBorder="0" 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.382562445!2d75.70626348165333!3d26.88544791796718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63d0cf22e0a1!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000"
            style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1)' }} 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </motion.div>

        {/* MAIN CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SIDE: CONTACT INFO - Dark Green (Matching Order Summary) */}
          <aside className="lg:col-span-5">
            <div className="bg-green-950 rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-[3px] border-[#C9C27A] h-full flex flex-col justify-between">
              <div>
                <h2 className="text-white font-black uppercase tracking-widest text-xl mb-8 border-b border-white/10 pb-4">
                  Contact Details
                </h2>
                
                <div className="space-y-6">
                  <ContactItem 
                    icon={<MapPin size={20}/>} 
                    label="Location" 
                    val="Jaipur - Pink City" 
                    link="https://maps.app.goo.gl/YourLocationLink"
                  />
                  <ContactItem 
                    icon={<Instagram size={20}/>} 
                    label="Instagram" 
                    val="@fruitsbounty" 
                    link="https://instagram.com/fruitsbounty"
                  />
                  <ContactItem 
                    icon={<Youtube size={20}/>} 
                    label="YouTube" 
                    val="@fruitsbounty" 
                    link="https://youtube.com/@fruitsbounty"
                  />
                  <ContactItem 
                    icon={<Phone size={20}/>} 
                    label="Call Us" 
                    val="+91 8955276223" 
                    link="+91 8955276223"
                  />
                  <ContactItem 
                    icon={<Mail size={20}/>} 
                    label="Email" 
                    val="Fruitsbounty@gmail.com" 
                    link="mailto:Fruitsbounty@gmail.com"
                  />
                </div>
              </div>

              <div className="mt-10 p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9C27A] opacity-80">
                  Business Hours
                </p>
                <p className="text-white/70 text-xs font-medium mt-1 uppercase">
                  Mon - Sat: 9:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE: FORM - White Card (Matching Cart Items) */}
          <section className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border-[3px] border-[#C9C27A] h-full">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-6">
                Send A <span className="text-green-800">Message</span>
              </h2>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-5">
                  <InputField label="Your Name" placeholder="John Doe" type="text" />
                  <InputField label="Email Address" placeholder="john@example.com" type="email" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                    Your Message
                  </label>
                  <textarea 
                    rows="4" 
                    placeholder="How can we help you?"
                    className="w-full bg-[#faf9f6] rounded-2xl p-4 border border-gray-100 focus:border-[#C9C27A] focus:ring-0 transition-all outline-none font-medium text-sm"
                  ></textarea>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.01 }} 
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-green-900 text-white flex justify-between items-center p-5 rounded-2xl shadow-xl hover:bg-green-800 transition-all group"
                >
                  <div className="text-left">
                    <p className="text-[9px] uppercase font-black tracking-[0.2em] opacity-70">
                      Submit Query
                    </p>
                    <p className="text-lg font-black uppercase tracking-tight">
                      Send Message
                    </p>
                  </div>
                  <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Sub-component for Clickable Contact Items
const ContactItem = ({ icon, label, val, link }) => (
  <div className="flex items-center gap-4 group/item">
    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-[#C9C27A] border border-white/5 group-hover/item:bg-[#C9C27A] group-hover/item:text-green-950 transition-all duration-300">
      {icon}
    </div>
    <div className="flex flex-col">
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#C9C27A] opacity-80">{label}</p>
      <a 
        href={link} 
        target={link.startsWith('http') ? "_blank" : "_self"} 
        rel="noopener noreferrer"
        className="text-white font-bold text-sm tracking-wide hover:text-[#C9C27A] transition-colors underline-offset-4 hover:underline"
      >
        {val}
      </a>
    </div>
  </div>
);

// Sub-component for Form Inputs
const InputField = ({ label, placeholder, type }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
      {label}
    </label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full bg-[#faf9f6] rounded-2xl p-4 border border-gray-100 focus:border-[#C9C27A] focus:ring-0 transition-all outline-none font-medium text-sm"
    />
  </div>
);

export default ContactUs;