function Subscription() {
  return (
    <section className="py-24 bg-[#f7f5f0] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-800">Subscription Model</h2>

        <div className="w-20 h-1 bg-green-700 mx-auto mt-3 mb-4 rounded"></div>

        <p className="text-gray-600 mb-16">Choose the plan for more benefits</p>

        {/* Cards Wrapper */}
        <div className="flex flex-col md:flex-row justify-center gap-12">
          {/* Individual */}
          <div
            data-aos="fade-right"
            className="relative w-[320px] h-[420px] rounded-3xl overflow-hidden shadow-xl mx-auto"
          >
            <img
              src="/images/subscriptionbg.png"
              alt="Individual"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-600/70 to-green-700/80"></div>

            <div className="relative h-full flex items-end justify-center pb-12">
              <button
                className="
                bg-white
                text-gray-800
                font-semibold
                px-10
                py-3
                rounded-xl
                shadow-lg
                hover:scale-105
                transition
                duration-300
                "
              >
                Individual
              </button>
            </div>
          </div>

          {/* Corporate */}
          <div
            data-aos="fade-left"
            className="relative w-[320px] h-[420px] rounded-3xl overflow-hidden shadow-xl mx-auto"
          >
            <img
              src="/images/subscriptionbg.png"
              alt="Corporate"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-600/70 to-green-700/80"></div>

            <div className="relative h-full flex items-end justify-center pb-12">
              <button
                className="
                bg-white
                text-gray-800
                font-semibold
                px-10
                py-3
                rounded-xl
                shadow-lg
                hover:scale-105
                transition
                duration-300
                "
              >
                Corporate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Subscription;
