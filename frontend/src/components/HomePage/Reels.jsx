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

  // Function to pause all videos except the one playing
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
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          } else {
            // Reset when leaving viewport (so animation repeats)
            setVisible((prev) => {
              const updated = [...prev];
              updated[index] = false;
              return updated;
            });
          }
        });
      },
      { threshold: 0.3 },
    );

    refs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-[#FBF8F2]">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">Reels</h2>
        <div className="w-24 h-1 bg-green-700 mx-auto mt-3 rounded-full"></div>
        <p className="text-gray-500 mt-4">Lets see some happy feeds</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3 place-items-center">
        {reels.map((reel, index) => {
          let animationClass = "";

          if (visible[index]) {
            if (index === 0) animationClass = "slide-left";
            if (index === 1) animationClass = "drop";
            if (index === 2) animationClass = "slide-right";
          } else {
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
                className="rounded-3xl shadow-xl w-full object-cover"
              />

              <a
                href={reel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  absolute top-4 right-4
                  bg-white/90
                  backdrop-blur-sm
                  p-2
                  rounded-full
                  shadow-md
                  opacity-0
                  group-hover:opacity-100
                  transition duration-300
                "
              >
                <FaInstagram className="text-pink-600 text-xl" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Reels;
