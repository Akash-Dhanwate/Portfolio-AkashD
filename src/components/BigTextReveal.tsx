"use client";

import { motion } from "framer-motion";

export default function BigTextReveal() {
  return (
    <section className="relative bg-[#121212] py-40 overflow-hidden flex items-center justify-center">
      <div className="max-w-[100vw] px-4 mx-auto w-full text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[9vw] leading-none font-extrabold uppercase tracking-tighter text-white/90 drop-shadow-2xl"
        >
          Crafting
        </motion.h2>
        <motion.h2 
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-[9vw] leading-none font-extrabold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-white"
        >
          <span className="text-c bg-clip-text bg-gradient-to-r from-neutral-400 to-Black"> The </span> Future
        </motion.h2>
      </div>
    </section>
  );
}
