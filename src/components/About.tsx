"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative bg-[#121212] py-32 px-6 md:px-12 z-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8">
            About Me
          </h2>
          
          <div className="space-y-8 text-lg md:text-2xl text-neutral-300 font-light leading-relaxed">
            <p>
              I’m <strong className="text-white font-semibold">Akash</strong>, an engineering student and aspiring software engineer passionate about building technology that solves real-world problems.
            </p>
            <p>
              I enjoy turning ideas into practical products — from AI-powered platforms and data-analysis tools to modern web applications and developer-focused systems. I’m particularly interested in Artificial Intelligence, Full-Stack Development, Cloud & DevOps, and scalable software systems.
            </p>
            <p>
              I don’t want to limit myself to simply learning technologies. I want to understand how things work, why they work, and how they can be combined to build something useful. That mindset pushes me to constantly experiment with new technologies, build projects, solve programming problems, and learn from the process.
            </p>
            <p>
              Currently, I’m focused on strengthening my foundations in Data Structures & Algorithms, software engineering, AI, system design, and cloud technologies, while building projects that demonstrate what I can actually create.
            </p>
            <p className="text-xl md:text-3xl font-medium text-white pt-8 border-t border-white/10">
              My long-term goal is simple: build exceptional products, become a strong software engineer, and work on technology at the highest level.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
