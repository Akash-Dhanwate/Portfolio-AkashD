"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BigTextReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(
    scrollYProgress,
    [0.08, 0.20],
    [120, 0]
  );

  const opacity1 = useTransform(
    scrollYProgress,
    [0.08, 0.16],
    [0, 1]
  );
  const y3 = useTransform(
    scrollYProgress,
    [0.24, 0.36],
    [120, 0]
  );

  const opacity3 = useTransform(
    scrollYProgress,
    [0.24, 0.32],
    [0, 1]
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-[20vh]
        bg-[#121212]
        text-white
        px-6
        md:px-12
        overflow-hidden
      "
    >
      <div className="sticky top-0 min-h-screen flex overflow-hidden flex items-center justify-center">
        <div className="w-full mx-auto py-20 overflow-hidden item-center">
          
          <motion.h2
            style={{
              y: y1,
              opacity: opacity1,
            }}
            className="
              text-[9vw]
              md:text-[7vw]
              leading-[0.85]
              font-black
              tracking-[-0.06em]
              flex items-center justify-center
            "
          >
            CRAFTING
          </motion.h2>
          <motion.h2
            style={{
              y: y3,
              opacity: opacity3,
            }}
            className="
              text-[9vw]
              md:text-[7vw]
              leading-[0.85]
              font-black
              tracking-[-0.06em]
              
            "
          >
            <span
            className="
            text-c
            font-extrabold
            flex items-center justify-center
            " >THE</span>
            <span
            className="
            font-extrabold
            flex items-center justify-center"
            >FUTURE</span>
          </motion.h2>

        </div>
      </div>
    </section>
  );
}