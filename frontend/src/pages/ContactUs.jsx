import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LocationOn, 
  Instagram, 
  YouTube, 
  Phone, 
  Email, 
  ArrowBack 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();

  // The deep green hex code from your provided image
  const brandGreen = '#3C7E44';

  useEffect(() => {
   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#f9fbf9', 
      fontFamily: "'Poppins', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box',
    },
    backButton: {
      position: 'fixed',
      top: '130px',      
      left: '20px',
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      backgroundColor: brandGreen, // Updated
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#FFFFFF',
      border: 'none',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      zIndex: 50,
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    mapContainer: {
        width: '100%',
        maxWidth: '1100px',
        height: '400px',
        marginBottom: '40px',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        border: '1px solid #e0e0e0'
    },
    mainCard: {
      display: 'flex',
      width: '100%',
      maxWidth: '1100px',
      backgroundColor: '#fff',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
      flexWrap: 'wrap', 
      marginBottom: '50px'
    },
    infoSide: {
      flex: '1',
      minWidth: '350px',
      padding: '50px',
    backgroundColor: "#1a5a3a",
borderLeft: "3px solid #C9C27A",
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    },
    formSide: {
      flex: '1.2',
      minWidth: '350px',
      padding: '50px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '30px',
      zIndex: 2
    },
    iconBox: {
      width: '45px',
      height: '45px',
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: '100%',
      padding: '15px',
      borderRadius: '12px',
      border: '1px solid #ddd',
      fontSize: '1rem',
      marginTop: '5px',
      outline: 'none',
      fontFamily: 'inherit'
    },
    submitBtn: {
      backgroundColor: brandGreen, // Updated
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.container}>
      <motion.button 
        whileHover={{ scale: 1.1, x: -5 }}
        style={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <ArrowBack />
      </motion.button>

      <div style={styles.header}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '2.5rem', color: brandGreen, margin: 0 }} // Updated
        >
          Contact Us
        </motion.h1>
        <p style={{ color: '#666' }}>Find us on the map or drop a message!</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={styles.mapContainer}
      >
        <iframe 
          title="location"
          width="100%" 
          height="100%" 
          frameBorder="0" 
          src="https://maps.google.com/maps?q=Jaipur&t=&z=13&ie=UTF8&iwloc=&output=embed"
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={styles.mainCard}
      >
        <div style={styles.infoSide}>
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '40px' }}>Contact Details</h2>
            <div style={styles.contactItem}><div style={styles.iconBox}><LocationOn /></div><div><strong>Fruits's Bounty</strong><br/><span style={{ opacity: 0.8 }}>Jaipur - Pink City</span></div></div>
            <div style={styles.contactItem}><div style={styles.iconBox}><Instagram /></div><div><strong>Instagram ID</strong><br/><span style={{ opacity: 0.8 }}>@fruitsbounty</span></div></div>
            <div style={styles.contactItem}><div style={styles.iconBox}><YouTube /></div><div><strong>YouTube</strong><br/><span style={{ opacity: 0.8 }}>@fruitsbounty</span></div></div>
            <div style={styles.contactItem}><div style={styles.iconBox}><Phone /></div><div><strong>Make A Call</strong><br/><span style={{ opacity: 0.8 }}>+91 9999999999</span></div></div>
            <div style={styles.contactItem}><div style={styles.iconBox}><Email /></div><div><strong>Email Address</strong><br/><span style={{ opacity: 0.8 }}>Fruitsbounty@gmail.com</span></div></div>
          </div>
        </div>

        <div style={styles.formSide}>
          <h2 style={{ color: brandGreen }}>Send a Message</h2> {/* Updated */}
          <div><label style={{ fontWeight: '500', color: '#444' }}>Your Name</label><input type="text" placeholder="John Doe" style={styles.input} /></div>
          <div><label style={{ fontWeight: '500', color: '#444' }}>Your Email</label><input type="email" placeholder="john@example.com" style={styles.input} /></div>
          <div><label style={{ fontWeight: '500', color: '#444' }}>Your Message</label><textarea rows="5" placeholder="How can we help you?" style={styles.input}></textarea></div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="submit-btn" style={styles.submitBtn}>Send Message</motion.button>
        </div>
      </motion.div>

      <style>{`
        .submit-btn:hover { 
          filter: brightness(1.2); 
          box-shadow: 0 5px 15px rgba(38, 77, 51, 0.4); 
        }
        @media (max-width: 900px) {
            h1 { font-size: 2rem !important; }
            .back-button { top: 130px !important; left: 10px !important; }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
