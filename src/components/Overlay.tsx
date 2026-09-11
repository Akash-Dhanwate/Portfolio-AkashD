"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: 20% to 50% (peaks around 35%)
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);

  // Section 3: 50% to 80% (peaks around 65%)
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none text-white overflow-hidden">
      {/* Section 1: Center */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          I'm Akash
        </h1>
        <p className="text-xl md:text-3xl font-semibold text-neutral-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Aspiring Software Engineer.
        </p>
      </motion.div>

      {/* Section 2: Left aligned */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-24"
      >
        <h2 className="text-4xl md:text-7xl font-bold max-w-2xl text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] leading-tight">
          Building tech that solves real-world problems.
        </h2>
      </motion.div>

      {/* Section 3: Right aligned */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-end justify-center p-8 md:p-24 text-right"
      >
        <h2 className="text-5xl md:text-8xl font-black max-w-xl text-balance drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400">
          Learn → Build → Break → Improve.
        </h2>
      </motion.div>
    </div>
  );
}
