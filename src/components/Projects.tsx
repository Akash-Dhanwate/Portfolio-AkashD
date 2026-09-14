"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    title: "AI Analysis Platform",
    category: "AI / FULL-STACK",
    description:
      "An AI-powered platform that analyzes PDFs, Excel files, and other datasets and turns raw information into useful insights.",
    year: "2026",
    status: "Building",
    technologies: ["Next.js", "TypeScript", "Python", "AI"],

    video: "",
    image: "/images/image.png",

    github: "#",
    live: "#",
  },

  {
    id: "02",
    title: "Website Cloner",
    category: "AI / WEB AUTOMATION",
    description:
      "A system that analyzes websites, extracts their structure and content, and generates a functional clone.",
    year: "2026",
    status: "Building",
    technologies: ["Next.js", "Python", "AI", "Scraping"],

    video: "",
    image: "/images/image.png",

    github: "#",
    live: "#",
  },

  {
    id: "03",
    title: "Portfolio",
    category: "CREATIVE DEVELOPMENT",
    description:
      "A cinematic developer portfolio focused on smooth interactions, typography, and modern web experiences.",
    year: "2026",
    status: "Live",
    technologies: ["Next.js", "TypeScript", "Framer Motion"],

    video: "",
    image: "/images/image.png",

    github: "#",
    live: "#",
  },

  {
    id: "04",
    title: "Student Management",
    category: "SOFTWARE DEVELOPMENT",
    description:
      "A Java-based student management system demonstrating object-oriented programming and data management.",
    year: "2025",
    status: "Completed",
    technologies: ["Java", "OOP", "Data Structures"],

    video: "",
    image: "/images/image.png",

    github: "#",
    live: "#",
  },
];

export default function Projects() {
  return (
    <section
      className="
        relative
        min-h-screen
        bg-[#121212]
        text-white
        py-20
        sm:py-24
        md:py-28
        px-4
        sm:px-6
        md:px-12
        overflow-hidden
      "
    >
      <div className="max-w-7xl mx-auto">

        {/* =========================================
            SECTION HEADER
        ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mb-10
            sm:mb-14
            md:mb-16
          "
        >
          <p
            className="
              text-[9px]
              sm:text-[10px]
              md:text-xs
              uppercase
              tracking-[0.35em]
              sm:tracking-[0.45em]
              md:tracking-[0.5em]
              text-white/30
              mb-4
              sm:mb-5
              md:mb-6
            "
          >
            02 — Selected Work
          </p>

          <h2
            className="
              text-[3.2rem]
              sm:text-6xl
              md:text-8xl
              font-black
              tracking-[-0.06em]
              leading-[0.85]
            "
          >
            THINGS
            <br />
            <span className="text-white/20">
              I BUILD.
            </span>
          </h2>

          <p
            className="
              mt-5
              sm:mt-7
              md:mt-8
              max-w-xl
              text-sm
              sm:text-base
              md:text-lg
              leading-relaxed
              text-white/40
            "
          >
            A collection of software projects, experiments, and ideas
            turned into working products.
          </p>
        </motion.div>


        {/* =========================================
            PROJECT GRID
        ========================================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
            sm:gap-5
          "
        >

          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}

              initial={{
                opacity: 0,
                y: 30,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
                margin: "-80px",
              }}

              transition={{
                duration: 0.55,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}

              whileHover={{
                y: -6,
              }}

              className="
                group
                relative
                h-[370px]
                sm:h-[350px]
                md:h-[350px]
                rounded-xl
                border
                border-white/10
                bg-[#161616]
                overflow-hidden
              "
            >

              {/* =========================================
                  BACKGROUND VIDEO
              ========================================= */}

              {project.video ? (
                <video
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    opacity-60
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : project.image ? (

                /* =========================================
                    BACKGROUND IMAGE
                ========================================= */

                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    opacity-60
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                />

              ) : null}


              {/* =========================================
                  GENERAL DARK OVERLAY
              ========================================= */}

              <div
                className="
                  absolute
                  inset-0
                  bg-black/25
                "
              />


              {/* =========================================
                  BOTTOM DARK GRADIENT
              ========================================= */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#080808]
                  via-black/45
                  to-transparent
                "
              />


              {/* =========================================
                  GLASS CONTENT AREA
              ========================================= */}

              <div
                className="
                  absolute
                  inset-x-2
                  sm:inset-x-3
                  bottom-2
                  sm:bottom-3
                  top-16
                  sm:top-20
                  rounded-lg
                  bg-black/20
                  backdrop-blur-md
                  border
                  border-white/[0.08]
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                  transition-all
                  duration-500
                  group-hover:bg-black/25
                "
              />


              {/* =========================================
                  TOP PROJECT INFORMATION
              ========================================= */}

              <div
                className="
                  relative
                  z-10
                  flex
                  items-center
                  justify-between
                  gap-3
                  p-4
                  sm:p-5
                  md:p-6
                "
              >

                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-2
                    sm:gap-3
                  "
                >

                  {/* PROJECT NUMBER */}

                  <span
                    className="
                      shrink-0
                      text-[10px]
                      sm:text-xs
                      font-mono
                      text-white/50
                    "
                  >
                    {project.id}
                  </span>


                  {/* DIVIDER */}

                  <span
                    className="
                      h-px
                      w-4
                      sm:w-6
                      shrink-0
                      bg-white/30
                    "
                  />


                  {/* CATEGORY */}

                  <span
                    className="
                      min-w-0
                      truncate
                      text-[8px]
                      sm:text-[9px]
                      md:text-[10px]
                      font-mono
                      tracking-[0.12em]
                      sm:tracking-[0.18em]
                      md:tracking-[0.2em]
                      text-white/50
                    "
                  >
                    {project.category}
                  </span>

                </div>


                {/* STATUS */}

                <span
                  className={`shrink-0 text-[8px] sm:text-[9px] md:text-[10px] font-mono uppercase tracking-wider ${
                    project.status === "Live"
                      ? "text-white/80"
                      : "text-white/40"
                  }`}
                >
                  {project.status}
                </span>

              </div>


              {/* =========================================
                  PROJECT CONTENT
              ========================================= */}

              <div
                className="
                  relative
                  z-10
                  flex
                  h-[calc(100%-68px)]
                  sm:h-[calc(100%-76px)]
                  flex-col
                  justify-between
                  p-4
                  sm:p-5
                  md:p-6
                "
              >

                <div>

                  {/* =====================================
                      TITLE
                  ===================================== */}

                  <h3
                    className="
                      text-[1.65rem]
                      sm:text-3xl
                      md:text-4xl
                      font-bold
                      tracking-[-0.04em]
                      leading-tight
                      drop-shadow-lg
                      transition-transform
                      duration-500
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      group-hover:translate-x-1
                    "
                  >
                    {project.title}
                  </h3>


                  {/* =====================================
                      DESCRIPTION
                  ===================================== */}

                  <p
                    className="
                      mt-3
                      sm:mt-4
                      max-w-md
                      text-[12px]
                      sm:text-sm
                      leading-relaxed
                      text-white/60
                      drop-shadow-md
                    "
                  >
                    {project.description}
                  </p>


                  {/* =====================================
                      TECHNOLOGIES
                  ===================================== */}

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-1.5
                      sm:gap-2
                      mt-4
                      sm:mt-5
                    "
                  >
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="
                          rounded-full
                          border
                          border-white/20
                          bg-black/20
                          backdrop-blur-sm
                          px-2
                          sm:px-2.5
                          py-1
                          text-[9px]
                          sm:text-[10px]
                          font-mono
                          text-white/60
                          transition-all
                          duration-300
                          group-hover:border-white/30
                          group-hover:text-white/80
                        "
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>


                {/* =========================================
                    BOTTOM AREA
                ========================================= */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  {/* YEAR */}

                  <span
                    className="
                      text-[10px]
                      sm:text-xs
                      font-mono
                      text-white/40
                    "
                  >
                    {project.year}
                  </span>


                  {/* =====================================
                      BUTTONS
                  ===================================== */}

                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                      sm:gap-2
                    "
                  >

                    {/* GITHUB */}

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub`}
                      className="
                        flex
                        h-9
                        w-9
                        sm:h-10
                        sm:w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        bg-black/20
                        backdrop-blur-sm
                        text-white/60
                        transition-all
                        duration-300
                        hover:border-white/50
                        hover:bg-white/10
                        hover:text-white
                        hover:scale-105
                      "
                    >

                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.01c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.08.78 2.18v3.24c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
                      </svg>

                    </a>


                    {/* LIVE PROJECT */}

                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="
                        flex
                        h-9
                        w-9
                        sm:h-10
                        sm:w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-black
                        transition-all
                        duration-300
                        hover:scale-105
                        group-hover:rotate-45
                      "
                    >
                      <ArrowUpRight
                        size={16}
                        strokeWidth={2}
                      />
                    </a>

                  </div>

                </div>

              </div>


              {/* =========================================
                  BOTTOM HOVER LINE
              ========================================= */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[1px]
                  w-0
                  bg-white/60
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />

            </motion.article>
          ))}

        </div>


        {/* =========================================
            SECTION FOOTER
        ========================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            mt-7
            sm:mt-8
            md:mt-10
          "
        >

          <p
            className="
              text-[8px]
              sm:text-[9px]
              md:text-[10px]
              uppercase
              tracking-[0.25em]
              sm:tracking-[0.35em]
              md:tracking-[0.4em]
              text-white/20
            "
          >
            More experiments coming
          </p>

          <span
            className="
              shrink-0
              text-[10px]
              sm:text-xs
              font-mono
              text-white/20
            "
          >
            {PROJECTS.length.toString().padStart(2, "0")} PROJECTS
          </span>

        </div>

      </div>
    </section>
  );
}