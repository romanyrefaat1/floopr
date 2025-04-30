"use client";

import { Maximize2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    text: "The dashboard has completely transformed how we handle user feedback. The AI insights are particularly impressive!",
    user: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  },
  {
    id: 2,
    text: "Easy to implement, powerful analytics, and the support team is fantastic. Couldn't ask for more!",
    user: {
      name: "Michael Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
  },
  {
    id: 3,
    text: "We've collected more actionable feedback in one month than we did all last year. Game changer!",
    user: {
      name: "Emma Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
  },
];

const FavoriteTestimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const lastScrollY = useRef(0);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const speed = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;

      // Update scroll speed with some smoothing
      setScrollSpeed((prev) => {
        const newSpeed = Math.min(speed, 50); // Cap the maximum speed
        return prev * 0.8 + newSpeed * 0.2; // Smooth transition
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset scroll speed when not scrolling
  useEffect(() => {
    const resetSpeed = () => {
      setScrollSpeed((prev) => {
        if (prev > 0.1) {
          return prev * 0.95;
        }
        return 0;
      });
      animationFrame.current = requestAnimationFrame(resetSpeed);
    };

    animationFrame.current = requestAnimationFrame(resetSpeed);
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const getBlurAmount = () => {
    return Math.min(30 + scrollSpeed * 0.5, 100);
  };

  const getAnimationDuration = () => {
    const baseSpeed = 30;
    const minSpeed = 15;
    return Math.max(minSpeed, baseSpeed - scrollSpeed * 0.5);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 min-h-screen bg-floopr-purple-bg overflow-hidden flex items-center justify-center"
    >
      {/* Animated gradient circles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 1 top left */}
        <div
          className="absolute top-1/4 left-1/8 w-[500px] h-[500px]"
          style={{
            animation: `float ${getAnimationDuration()}s ease-in-out infinite`,
            transition: "filter 0.3s ease-out",
          }}
        >
          <div
            className="w-full h-full rounded-full bg-[#7C3AED]/10"
            style={{ filter: `blur(${getBlurAmount()}px)` }}
          />
        </div>
        {/* 2 bottom rit */}
        <div
          className="absolute top-1/2 right-1 w-[400px] h-[400px]"
          style={{
            animation: `float ${
              getAnimationDuration() + 9
            }s ease-in-out infinite`,
            transition: "filter 0.3s ease-out",
          }}
        >
          <div
            className="w-full h-full rounded-full bg-[#7C3AED]/15"
            style={{ filter: `blur(${getBlurAmount() - 10}px)` }}
          />
        </div>
        {/* 3 top rit*/}
        <div
          className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px]"
          style={{
            animation: `float ${
              getAnimationDuration() + 8
            }s ease-in-out infinite`,
            transition: "filter 0.3s ease-out",
          }}
        >
          <div
            className="w-full h-full rounded-full bg-[#7C3AED]/5"
            style={{ filter: `blur(${getBlurAmount() - 20}px)` }}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Our favorite feedbacks
        </h2>

        <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg group">
          <Link
            href="/favorite-feedbacks"
            className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Maximize2 className="w-6 h-6 text-gray-600" />
          </Link>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col transition-all duration-300 ${
                  hoveredCard !== null && hoveredCard !== item.id
                    ? "opacity-50 blur-[1px]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {hoveredCard !== item.id && hoveredCard !== null && (
                  <div className=" bg-[#7C3AED]/20 rounded-[20px] p-4 h-full inset-1 absolute top-0 left-0 w-full" />
                )}

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={item.user.avatar}
                      alt={item.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900">
                    {item.user.name}
                  </h3>
                </div>
                <p className="text-gray-700">{item.text}</p>
                <div className="my-4 border-t border-floopr-purple-bg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FavoriteTestimonials;
