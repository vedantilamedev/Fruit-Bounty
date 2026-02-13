function WhatIsFruitSalad() {
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
      <div
        className="
        grid
        gap-10
        place-items-center
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
      "
      >
        {/* Card 1 */}
        <div
          className="
          w-full max-w-[340px]
          rounded-3xl
          bg-gradient-to-br from-[#E8F5E9] to-[#DFF1E5]
          px-8 py-10
          text-center
          shadow-sm
          hover:shadow-xl
          transition duration-300
          hover:-translate-y-2
        "
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-[#B7B06A] flex items-center justify-center mb-6">
            <img
              src="/images/natural.png"
              alt="100% Natural"
              className="w-10"
            />
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-3">100% Natural</h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            No preservatives, no artificial flavors. Just pure, fresh fruits
            picked at peak ripeness for maximum taste and nutrition.
          </p>
        </div>

        {/* Card 2 */}
        <div
          className="
          w-full max-w-[340px]
          rounded-3xl
          bg-gradient-to-br from-[#E8F5E9] to-[#DFF1E5]
          px-8 py-10
          text-center
          shadow-sm
          hover:shadow-xl
          transition duration-300
          hover:-translate-y-2
        "
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-[#B7B06A] flex items-center justify-center mb-6">
            <img src="/images/rice.png" alt="Vitamin Rich" className="w-10" />
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-3">Vitamin Rich</h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            Packed with essential vitamins, minerals, and antioxidants that
            boost immunity and promote overall wellness.
          </p>
        </div>

        {/* Card 3 */}
        <div
          className="
          w-full max-w-[340px]
          rounded-3xl
          bg-gradient-to-br from-[#E8F5E9] to-[#DFF1E5]
          px-8 py-10
          text-center
          shadow-sm
          hover:shadow-xl
          transition duration-300
          hover:-translate-y-2
        "
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-[#B7B06A] flex items-center justify-center mb-6">
            <img src="/images/daily.png" alt="Fresh Daily" className="w-10" />
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-3">Fresh Daily</h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            Prepared fresh every morning with locally sourced fruits to ensure
            maximum freshness and flavor in every bite.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhatIsFruitSalad;
