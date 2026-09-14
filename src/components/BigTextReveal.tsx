"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function BigTextReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // ==========================================
  // CRAFTING ANIMATION
  // ==========================================

  const y1 = useTransform(
    scrollYProgress,
    [0.05, 0.18],
    [40, 0]
  );

  const opacity1 = useTransform(
    scrollYProgress,
    [0.05, 0.12],
    [0, 1]
  );

  // ==========================================
  // THE ANIMATION
  // ==========================================

  const y2 = useTransform(
    scrollYProgress,
    [0.16, 0.28],
    [40, 0]
  );

  const opacity2 = useTransform(
    scrollYProgress,
    [0.16, 0.24],
    [0, 1]
  );

  // ==========================================
  // FUTURE ANIMATION
  // ==========================================

  const y3 = useTransform(
    scrollYProgress,
    [0.26, 0.38],
    [40, 0]
  );

  const opacity3 = useTransform(
    scrollYProgress,
    [0.26, 0.34],
    [0, 1]
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-[55vh]
        sm:min-h-[65vh]
        md:min-h-screen
        bg-[#121212]
        text-white
        px-4
        sm:px-6
        md:px-12
        overflow-hidden
      "
    >
      <div
        className="
          sticky
          top-0
          flex
          min-h-[55vh]
          sm:min-h-[65vh]
          md:min-h-screen
          w-full
          items-center
          justify-center
          overflow-hidden
        "
      >
        <div
          className="
            flex
            w-full
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          {/* ================================
              CRAFTING
          ================================= */}

          <motion.h2
            style={{
              y: y1,
              opacity: opacity1,
            }}
            className="
              whitespace-nowrap
              text-[7.5vw]
              sm:text-[8vw]
              md:text-[7vw]
              leading-[0.85]
              font-black
              tracking-[-0.06em]
            "
          >
            CRAFTING
          </motion.h2>

          {/* ================================
              THE
          ================================= */}

          <motion.h2
            style={{
              y: y2,
              opacity: opacity2,
            }}
            className="
              whitespace-nowrap
              text-[9vw]
              sm:text-[8vw]
              md:text-[6.5vw]
              leading-[0.85]
              font-black
              tracking-[-0.06em]
            "
          >
            THE
          </motion.h2>

          {/* ================================
              FUTURE
          ================================= */}

          <motion.h2
            style={{
              y: y3,
              opacity: opacity3,
            }}
            className="
              whitespace-nowrap
              text-[10vw]
              sm:text-[9vw]
              md:text-[7vw]
              leading-[0.85]
              font-black
              tracking-[-0.06em]
            "
          >
            FUTURE
          </motion.h2>
        </div>
      </div>
    </section>
  );
}