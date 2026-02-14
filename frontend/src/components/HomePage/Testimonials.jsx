import { useEffect, useRef, useState } from "react";

function Testimonials() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: "Vaishnavi Sharma",
      city: "Jaipur",
      review:
        "The Pink Palace Bowl is absolutely divine! Fresh fruits with a royal Jaipur essence.",
      initials: "VS",
    },
    {
      name: "Garvit Jain",
      city: "Jaipur",
      review:
        "Best fruit salads in the city! Always fresh, beautifully presented, and delivered on time.",
      initials: "GJ",
    },
    {
      name: "Vrucha Mehta",
      city: "Jaipur",
      review:
        "Love the customization options! I can create exactly what I want every single time.",
      initials: "VM",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-16 lg:px-24 bg-[#FBF8F2]"
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800">
          What Our Customers Say
        </h2>

        <div className="w-24 h-1 bg-green-700 mx-auto my-4 rounded-full"></div>

        <p className="text-gray-500">Join thousands of happy fruit lovers</p>
      </div>

      {/* Cards */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className={`transition-all duration-700 rounded-3xl border border-green-200 bg-white p-8 shadow-sm hover:shadow-xl ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            {/* Stars */}
            <div className="flex text-yellow-400 mb-4">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <span key={i}>★</span>
                ))}
            </div>

            {/* Review */}
            <p className="text-gray-600 italic leading-relaxed mb-6">
              "{item.review}"
            </p>

            {/* Profile */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-green-800 text-white flex items-center justify-center font-bold">
                {item.initials}
              </div>

              <div>
                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
