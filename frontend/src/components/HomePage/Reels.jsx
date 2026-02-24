import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Reels() {
  const reels = [
    { id: 1, video: "/videos/reel1.mp4", link: "https://www.instagram.com/reel/DO_U14uExJ7/" },
    { id: 2, video: "/videos/reel2.mp4", link: "https://www.instagram.com/reel/DUlf3b9E2Mu/" },
    { id: 3, video: "/videos/reel3.mp4", link: "https://www.instagram.com/reel/DUa7UQAEw48/" },
  ];

  const refs = useRef([]);
  const videoRefs = useRef([]);
  const [visible, setVisible] = useState([false, false, false]);
  const [current, setCurrent] = useState(0);
  const [unmutedIndex, setUnmutedIndex] = useState(null);

  const toggleMute = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index) {
          const newMutedStatus = !video.muted;
          video.muted = newMutedStatus;
          setUnmutedIndex(newMutedStatus ? null : i);
        } else {
          video.muted = true;
        }
      }
    });
  };

  const prev = () => {
    const nextIdx = current === 0 ? reels.length - 1 : current - 1;
    setCurrent(nextIdx);
    setUnmutedIndex(null); // Reset mute state on swipe
  };

  const next = () => {
    const nextIdx = current === reels.length - 1 ? 0 : current + 1;
    setCurrent(nextIdx);
    setUnmutedIndex(null); // Reset mute state on swipe
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          const video = videoRefs.current[index];

          if (entry.isIntersecting) {
            setVisible((prev) => {
              const copy = [...prev];
              copy[index] = true;
              return copy;
            });
            if (video) video.play().catch(() => {});
          } else {
            if (video) {
              video.pause();
              video.muted = true; // Auto-mute when scrolling away
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    refs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-8 md:py-12 bg-[#FBF8F2] overflow-hidden">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url('/images/main-background.webp')`,
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      ></div>

      <div className="relative z-10 text-center mb-8 md:mb-12 max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
          Fruit's Bounty in Action
        </h2>
        <div className="w-16 h-1 bg-[#2D5A27] mx-auto mt-3 mb-6 rounded-full"></div>
        <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
          Watch how we craft our premium fruit bowls. Click a reel to unmute!
        </p>
      </div>

      {/* MOBILE SLIDER */}
      <div className="relative z-20 flex items-center justify-center md:hidden">
        <button onClick={prev} className="absolute left-2 z-30 bg-white/90 p-2 rounded-full shadow-lg text-gray-800">
          <ChevronLeft size={24} />
        </button>

        <div className="w-[280px] relative cursor-pointer group" onClick={() => toggleMute(current)}>
          <video
            key={current}
            ref={(el) => (videoRefs.current[current] = el)}
            src={reels[current].video}
            loop
            muted
            playsInline
            className="rounded-[2.5rem] shadow-2xl w-full object-cover aspect-[9/16] bg-black border-4 border-white"
          />
          {/* Enhanced Mobile Indicator */}
          <div className="absolute bottom-6 right-6 z-30 bg-black/60 backdrop-blur-md p-3 rounded-full text-white border border-white/20 transition-transform active:scale-90">
            {unmutedIndex === current ? <FaVolumeUp size={20} /> : <FaVolumeMute size={20} />}
          </div>
        </div>

        <button onClick={next} className="absolute right-2 z-30 bg-white/90 p-2 rounded-full shadow-lg text-gray-800">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden md:flex relative z-20 flex-wrap justify-center gap-8 md:gap-12 px-6 max-w-7xl mx-auto">
        {reels.map((reel, index) => {
          const isVisible = visible[index];
          const isUnmuted = unmutedIndex === index;

          return (
            <div
              key={reel.id}
              ref={(el) => (refs.current[index] = el)}
              data-index={index}
              className={`relative group w-[280px] transition-all duration-1000 cursor-pointer 
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
              onClick={() => toggleMute(index)}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={reel.video}
                loop
                muted
                playsInline
                className="rounded-[2.5rem] shadow-2xl w-full object-cover aspect-[9/16] bg-black border-[3px] border-transparent group-hover:border-[#C9C27A] transition-all duration-500"
              />

              {/* Mute/Unmute Indicator - Always visible on hover or when unmuted */}
              <div className={`absolute bottom-6 right-6 z-30 p-3 rounded-full text-white border border-white/20 backdrop-blur-md transition-all duration-300
                ${isUnmuted ? "bg-[#2D5A27] scale-110 shadow-lg" : "bg-black/40 opacity-0 group-hover:opacity-100"}`}>
                {isUnmuted ? <FaVolumeUp size={20} /> : <FaVolumeMute size={20} />}
              </div>

              {/* Instagram Floating Badge */}
              <a
                href={reel.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-6 right-6 z-30 bg-white p-2.5 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
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