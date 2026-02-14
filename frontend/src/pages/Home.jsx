import Hero from "../components/HomePage/Hero";
import SaladSection from "../components/HomePage/SaladSection";
import CustomizeBowl from "../components/HomePage/CustomizeBowl";
import WhatIsFruitSalad from "../components/HomePage/WhatIsFruitSalad";
import OurFruits from "../components/HomePage/OurFruits";
import Subscription from "../components/HomePage/Subscription";
import Testimonials from "../components/HomePage/Testimonials";
import Reels from "../components/HomePage/Reels";


function Home() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Products */}
      <SaladSection />

      {/* Customize Bowl */}
      <CustomizeBowl />

      {/* Trust Builder */}
      <WhatIsFruitSalad />

      {/* Fruits Showcase */}
      <OurFruits />

      <Subscription />

      <Testimonials />

      <Reels />
    </>
  );
}

export default Home;
