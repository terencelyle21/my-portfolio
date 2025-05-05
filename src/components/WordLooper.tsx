import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import '../styles/WordLooper.css';

const words = ["Front end Developer","UI/UX Designer", "Software Engineer"];
const itemHeight = 192;
const intervalDuration = 2000;
const animationDuration = 0.6;

export const WordLooper: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxContainerRef = useRef<HTMLDivElement>(null); // Ref for the outer container
  const totalStepsRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalIdRef = useRef<number | null>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const startLoopInterval = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    const numWords = words.length;
    intervalIdRef.current = setInterval(() => {
      if (!containerRef.current) return;

      animationRef.current?.kill();

      totalStepsRef.current += 1;
      const nextIndex = totalStepsRef.current % numWords;
      setActiveIndex(nextIndex);

      const targetY = -totalStepsRef.current * itemHeight;
      animationRef.current = gsap.to(containerRef.current, {
        y: targetY,
        duration: animationDuration,
        ease: "power2.out",
        onComplete: () => {
          animationRef.current = null;
          if (containerRef.current && totalStepsRef.current === numWords) {
            gsap.set(containerRef.current, { y: 0 });
            totalStepsRef.current = 0;
          }
        },
      });
    }, intervalDuration);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!containerRef.current) return;

      if (document.hidden) {
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
          intervalIdRef.current = null;
        }
        animationRef.current?.pause();
      } else {
        animationRef.current?.resume();
        startLoopInterval();
      }
    };

    if (!document.hidden) {
        startLoopInterval();
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      animationRef.current?.kill();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Effect for parallax scrolling
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = requestAnimationFrame(() => {
            if (parallaxContainerRef.current) {
                const scrollTop = window.pageYOffset;
                // Adjust the parallax speed factor (e.g., 0.1 for a subtle effect)
                const offset = scrollTop * -0.2; // Make the offset negative
                parallaxContainerRef.current.style.transform = `translateY(${offset}px)`;
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true }); // Use passive listener for performance

    // Initial call to set position
    handleScroll();

    return () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const loopedWords = [...words, ...words];

  return (
    <div className="word-looper" ref={parallaxContainerRef}> {/* Attach the ref here */}
      <div ref={containerRef} className="word-looper__inner">
        {loopedWords.map((word, index) => (
          <div key={index} className="word-looper__item">
            {word}
          </div>
        ))}
      </div>

      <div className="word-looper__dots">
        {words.map((_, index) => (
          <div
            key={index}
            className={`word-looper__dot ${
              index === activeIndex ? "word-looper__dot--active" : "word-looper__dot--inactive"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
