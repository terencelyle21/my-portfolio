import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import '../styles/WordLooper.css';

const words = ["Front end Developer","UI/UX Designer", "Software Engineer"];
const itemHeight = 192;
const intervalDuration = 2000;
const animationDuration = 0.6;

export const WordLooper: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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

  const loopedWords = [...words, ...words];

  return (
    <div className="word-looper">
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
