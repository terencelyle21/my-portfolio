import React, { useEffect, useRef } from "react";
import "../../styles/cursorAnimation.css";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursor2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (cursorRef.current && cursor2Ref.current) {
        cursorRef.current.style.cssText = `left: ${clientX}px; top: ${clientY}px;`;
        cursor2Ref.current.style.cssText = `left: ${clientX}px; top: ${clientY}px;`;
      }
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} id="cursor1" />
      <div ref={cursor2Ref} id="cursor2" />
    </>
  );
};

export default CustomCursor;
