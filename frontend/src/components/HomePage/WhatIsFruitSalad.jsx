import { useEffect, useRef, useState } from "react";

function WhatIsFruitSalad() {
  const leftRef = useRef(null);
  const middleRef = useRef(null);
  const rightRef = useRef(null);

  const [visible, setVisible] = useState({
    left: false,
    middle: false,
    right: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;

          if (entry.target === leftRef.current) {
            setVisible((prev) => ({ ...prev, left: isVisible }));
          }

          if (entry.target === middleRef.current) {
            setVisible((prev) => ({ ...prev, middle: isVisible }));
          }

          if (entry.target === rightRef.current) {
            setVisible((prev) => ({ ...prev, right: isVisible }));
          }
        });
      },
      {
        threshold: 0.25,
      },
    );

    if (leftRef.current) observer.observe(leftRef.current);
    if (middleRef.current) observer.observe(middleRef.current);
    if (rightRef.current) observer.observe(rightRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 md:px-16 lg:px-24 bg-[#FBF8F2]">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          What is Fruit Salad?
        </h2>

        <div className="w-24 h-1 bg-green-700 mx-auto my-4 rounded-full"></div>

        <p className="text-gray-600 leading-relaxed">
          A delightful combination of nature's finest fruits, carefully selected
          and mixed to create a refreshing, nutritious treat that energizes your
          day.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-10 place-items-center md:grid-cols-2 lg:grid-cols-3">
        {/* Left */}
        <div
          ref={leftRef}
          className={`card-base transition-all duration-700 ${
            visible.left
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-24"
          }`}
        >
          <div className="icon-box">
            <img
              src="/images/natural.png"
              alt="100% Natural"
              className="w-10"
            />
          </div>
          <h3 className="card-title">100% Natural</h3>
          <p className="card-desc">
            No preservatives, no artificial flavors. Just pure, fresh fruits
            picked at peak ripeness for maximum taste and nutrition.
          </p>
        </div>

        {/* Middle */}
        <div
          ref={middleRef}
          className={`card-base transition-all duration-700 ${
            visible.middle
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-24"
          }`}
        >
          <div className="icon-box">
            <img src="/images/rice.png" alt="Vitamin Rich" className="w-10" />
          </div>
          <h3 className="card-title">Vitamin Rich</h3>
          <p className="card-desc">
            Packed with essential vitamins, minerals, and antioxidants that
            boost immunity and promote overall wellness.
          </p>
        </div>

        {/* Right */}
        <div
          ref={rightRef}
          className={`card-base transition-all duration-700 ${
            visible.right
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-24"
          }`}
        >
          <div className="icon-box">
            <img src="/images/daily.png" alt="Fresh Daily" className="w-10" />
          </div>
          <h3 className="card-title">Fresh Daily</h3>
          <p className="card-desc">
            Prepared fresh every morning with locally sourced fruits to ensure
            maximum freshness and flavor in every bite.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhatIsFruitSalad;
