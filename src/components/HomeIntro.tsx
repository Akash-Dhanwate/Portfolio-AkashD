"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HomeIntro() {
  const { scrollY } = useScroll();

  const opacity = useTransform(
    scrollY,
    [-45, 60, 100],
    [1, 0.7, 0]
  );

  const y = useTransform(
    scrollY,
    [0 , 100],
    [-70, -100]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">

      <div className="text-center text-white/30">

        <h1 className="
        text-[7vw]
        leading-none 
        font-extrabold 
        uppercase 
        tracking-tighter
        absolute top-[85%] left-1/2 -translate-x-1/2

        ">
          Portfolio
        </h1>

      </div>
        <p className="
        text-[5vh]
        uppercase
        absolute top-[95%] left-1/2 -translate-x-1/2
        font-mono
        text-[17vw]
        font-light
        leading
        tracking-[-0.08em]
        md:text-[4vw]
        margin-2px
        ">
            website
        </p>
    </motion.div>
  );
}