"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop fine-pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });
    const followX = gsap.quickTo(follower, "x", { duration: 0.45, ease: "power3" });
    const followY = gsap.quickTo(follower, "y", { duration: 0.45, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);
      followX(e.clientX);
      followY(e.clientY);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Hover scale over interactive elements
    const handleElementHover = () => {
      gsap.to(follower, {
        scale: 2.5,
        backgroundColor: "rgba(34, 211, 238, 0.15)",
        borderColor: "rgba(34, 211, 238, 0.6)",
        duration: 0.3,
      });
      gsap.to(cursor, {
        scale: 0.5,
        backgroundColor: "#22d3ee",
        duration: 0.3,
      });
    };

    const handleElementLeave = () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.2)",
        duration: 0.3,
      });
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "#22d3ee",
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, [data-magnetic], [data-cursor-hover]"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleElementHover);
      el.addEventListener("mouseleave", handleElementLeave);
    });

    const observer = new MutationObserver(() => {
      const updatedElements = document.querySelectorAll(
        "a, button, input, textarea, [data-magnetic], [data-cursor-hover]"
      );
      updatedElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleElementHover);
        el.removeEventListener("mouseleave", handleElementLeave);
        el.addEventListener("mouseenter", handleElementHover);
        el.addEventListener("mouseleave", handleElementLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <>
      {/* Precision cursor dot */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 mix-blend-screen transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Lag follower ring */}
      <div
        ref={followerRef}
        className={`pointer-events-none fixed top-0 left-0 z-40 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
