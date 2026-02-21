import { useEffect, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";

function Reels() {
  const reels = [
    {
      id: 1,
      video: "/videos/reel1.mp4",
      link: "https://www.instagram.com/reel/DO_U14uExJ7/",
    },
    {
      id: 2,
      video: "/videos/reel2.mp4",
      link: "https://www.instagram.com/reel/DUlf3b9E2Mu/",
    },
    {
      id: 3,
      video: "/videos/reel3.mp4",
      link: "https://www.instagram.com/reel/DUa7UQAEw48/",
    },
  ];

  const refs = useRef([]);
  const videoRefs = useRef([]);
  const [visible, setVisible] = useState([false, false, false]);

  const handleVideoPlay = (currentIndex) => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-8 md:py-12 bg-[#FBF8F2] overflow-hidden">
      {/* 1. BACKGROUND IMAGE LAYER - Consistent with other sections */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{ 
          backgroundImage: `url('/public/images/main-background.PNG')`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      ></div>

      {/* 2. HEADING - Consistent with professional bold style */}
      <div className="relative z-10 text-center mb-8 md:mb-12 max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
          Fruit's Bounty in Action
        </h2>

        <div className="w-16 h-1 bg-[#2D5A27] mx-auto mt-3 mb-6 rounded-full"></div>

        <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
          Watch how we craft our premium fruit bowls. Follow our journey on 
          Instagram for daily freshness, behind-the-scenes, and healthy tips.
        </p>
      </div>

      {/* 3. REELS GRID */}
      <div className="relative z-10 flex flex-wrap justify-center gap-8 md:gap-12 px-6 max-w-7xl mx-auto">
        {reels.map((reel, index) => {
          let animationClass = "opacity-100 translate-x-0 translate-y-0";

          if (!visible[index]) {
            if (index === 0) animationClass = "opacity-0 -translate-x-32";
            if (index === 1) animationClass = "opacity-0 -translate-y-32";
            if (index === 2) animationClass = "opacity-0 translate-x-32";
          }

          return (
            <div
              key={reel.id}
              ref={(el) => (refs.current[index] = el)}
              data-index={index}
              className={`relative group w-[260px] md:w-[280px] transition-all duration-700 ${animationClass}`}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={reel.video}
                controls
                loop
                muted
                playsInline
                onPlay={() => handleVideoPlay(index)}
                className="rounded-3xl shadow-xl w-full object-cover aspect-[9/16] bg-black"
              />

              <a
                href={reel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  absolute top-4 right-4
                  bg-white/90
                  backdrop-blur-sm
                  p-3
                  rounded-full
                  shadow-md
                  opacity-0
                  group-hover:opacity-100
                  transition duration-300
                  hover:scale-110
                "
              >
                <FaInstagram className="text-pink-600 text-2xl" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Reels;