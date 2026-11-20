"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function useGSAPRegister() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !isRegistered) {
      gsap.registerPlugin(ScrollTrigger);
      isRegistered = true;
    }
    setReady(true);
  }, []);

  return { gsap, ScrollTrigger, ready };
}
