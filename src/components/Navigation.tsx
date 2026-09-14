"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const NAV_ITEMS = ["Home", "Work", "About", "Contact"];

export default function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        fixed
        top-4
        sm:top-6
        left-1/2
        z-50
        max-w-[calc(100vw-24px)]
      "
    >
      <div
        className="
          flex
          items-center
          justify-center
          gap-3
          sm:gap-5
          md:gap-6
          px-4
          sm:px-6
          md:px-8
          py-2.5
          sm:py-3
          rounded-full
          bg-white/5
          backdrop-blur-md
          border
          border-white/10
          shadow-2xl
          whitespace-nowrap
        "
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="
              text-[10px]
              sm:text-xs
              md:text-sm
              font-medium
              text-neutral-300
              hover:text-white
              transition-colors
              uppercase
              tracking-[0.12em]
              sm:tracking-[0.18em]
              md:tracking-widest
            "
          >
            {item}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}