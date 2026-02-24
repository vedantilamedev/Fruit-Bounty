  import React, { useEffect } from "react";
  import { Leaf, Heart, ShieldCheck, Truck, Users, Sprout } from "lucide-react";
  
  const highlights = [
    {
      icon: <Leaf size={20} />,
      title: "Farm Fresh Quality",
      text: "We source handpicked fruits from trusted growers to keep every bowl naturally fresh and flavorful.",
    },
    {
      icon: <Truck size={20} />,
      title: "Fast & Hygienic Delivery",
      text: "Our team follows strict hygiene practices and timely delivery to serve freshness at your doorstep.",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Trusted Standards",
      text: "From sourcing to packing, every step is monitored to maintain quality, consistency, and safety.",
    },
  ];
  
  const values = [
    {
      icon: <Heart size={18} />,
      label: "Customer First",
    },
    {
      icon: <Sprout size={18} />,
      label: "Sustainable Choices",
    },
    {
      icon: <Users size={18} />,
      label: "Community Growth",
    },
  ];
  
  const AboutUs = () => {
    useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
  
    return (
      <div
        className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
        style={{
          backgroundImage: "url('/images/main-background.webp')",
          backgroundSize: "cotain",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <section className="rounded-3xl border border-[#E8E4D9] bg-white/85 backdrop-blur-sm p-8 sm:p-12 shadow-sm">
            <p className="text-xs uppercase tracking-[0.3em] font-bold text-[#3C7E44] mb-3">
              About Fruit Bounty
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
              Freshness, crafted with care for every bowl.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl">
              Fruit Bounty was built to make healthy eating simple, joyful, and
              reliable. We combine premium seasonal fruits, thoughtful
              preparation, and a customer-first experience so every order feels
              fresh, nourishing, and worth repeating.
            </p>
  
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {values.map((value) => (
                <div
                  key={value.label}
                  className="rounded-xl border border-[#E8E4D9] bg-[#FBF8F2] px-4 py-3 flex items-center gap-3"
                >
                  <span className="text-[#3C7E44]">{value.icon}</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {value.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
  
          <section className="mt-8 grid lg:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#E8E4D9] bg-white/90 p-6 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-[#3C7E44] text-white flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{item.text}</p>
              </article>
            ))}
          </section>
  
          <section className="mt-8 rounded-3xl border border-[#E8E4D9] bg-white/90 p-8 sm:p-10">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">
              Our Promise
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-4xl">
              Every Fruit Bounty order is prepared to deliver quality you can
              trust: fresh ingredients, balanced taste, and consistent service. We
              continue improving our sourcing, packaging, and customer support so
              your healthy routine stays easy and enjoyable every day.
            </p>
          </section>
        </div>
      </div>
    );
  };
  
  export default AboutUs;
