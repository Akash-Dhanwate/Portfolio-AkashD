"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: {
    y: 40,
    opacity: 0,
    scale: 0.95,
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const socialItem: Variants = {
  hidden: {
    y: 30,
    opacity: 0,
    scale: 0.8,
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Footer() {
  const socials = [
    {
      icon: GithubIcon,
      href: "https://github.com",
      label: "GitHub",
    },
    {
      icon: LinkedinIcon,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: XIcon,
      href: "https://x.com",
      label: "X",
    },
  ];

  return (
    <section
      id="contact"
      className="
        relative
        z-20
        overflow-hidden
        border-t
        border-white/10
        bg-[#0a0a0a]
        px-5
        pt-24
        pb-10
        sm:px-8
        sm:pt-28
        sm:pb-12
        md:px-12
        md:pt-32
      "
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center text-center">

        {/* =========================
            HEADING
        ========================== */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            margin: "-100px",
          }}
          className="mb-14 w-full sm:mb-20 md:mb-24"
        >
          <motion.h2
            variants={item}
            className="
              mb-6
              w-full
              font-black
              uppercase
              leading-[0.85]
              tracking-[-0.07em]
              text-transparent
              bg-clip-text
              bg-gradient-to-b
              from-white
              via-white
              to-neutral-700
              drop-shadow-2xl

              text-[clamp(3.5rem,16vw,8rem)]
              sm:text-[clamp(5rem,13vw,9rem)]
              md:text-[9rem]
            "
          >
            Let's Talk
          </motion.h2>

          <motion.p
            variants={item}
            className="
              mx-auto
              max-w-[90%]
              text-sm
              leading-relaxed
              text-neutral-400
              sm:max-w-md
              sm:text-base
              md:text-xl
            "
          >
            Ready to bring your next interactive experience to life?
            Reach out and let's build something extraordinary.
          </motion.p>
        </motion.div>

        {/* =========================
            SOCIAL BUTTONS
        ========================== */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            mb-20
            flex
            items-center
            justify-center
            gap-4
            sm:mb-24
            sm:gap-6
          "
        >
          {socials.map((social) => (
            <motion.div
              key={social.label}
              variants={socialItem}
            >
              <Link
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
              >
                <motion.div
                  whileHover={{
                    y: -8,
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.92,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 18,
                  }}
                  className="
                    group
                    relative
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.04]
                    backdrop-blur-md

                    sm:h-16
                    sm:w-16
                  "
                >
                  {/* Hover glow */}
                  <motion.div
                    className="
                      absolute
                      inset-0
                      rounded-full
                      bg-white/[0.08]
                    "
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    whileHover={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                  />

                  {/* Rotating ring */}
                  <motion.div
                    className="
                      absolute
                      inset-[-2px]
                      rounded-full
                      border
                      border-white/0
                      group-hover:border-white/30
                    "
                    whileHover={{
                      rotate: 180,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: "easeOut",
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="relative z-10"
                    whileHover={{
                      rotate: [0, -8, 8, 0],
                    }}
                    transition={{
                      duration: 0.45,
                    }}
                  >
                    <social.icon
                      className="
                        h-5
                        w-5
                        text-neutral-400
                        transition-colors
                        duration-300
                        group-hover:text-white

                        sm:h-6
                        sm:w-6
                      "
                    />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* =========================
            BOTTOM
        ========================== */}

        <div
          className="
            flex
            w-full
            flex-col
            items-center
            justify-between
            gap-4
            border-t
            border-white/10
            pt-6
            font-mono
            text-[9px]
            uppercase
            tracking-[0.14em]
            text-neutral-600

            sm:flex-row
            sm:text-[10px]

            md:pt-8
            md:text-xs
            md:tracking-widest
          "
        >
          <p>
            © {new Date().getFullYear()}. All Rights Reserved.
          </p>

          <p>
            Crafted by AKASH DHNAWATE
          </p>
        </div>
      </div>
    </section>
  );
}