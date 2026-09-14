"use client";

import { motion type Variants} from "framer-motion";
import Link from "next/link";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
);

const container : Variants= {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const item : Variants = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  show: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Footer() {
  return (
    <section id="contact" className="relative bg-[#0a0a0a] border-t border-white/10 pt-32 pb-12 px-6 md:px-12 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <motion.h2 variants={item} className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-700 drop-shadow-2xl">
            Let's Talk
          </motion.h2>
          <motion.p variants={item} className="text-lg md:text-xl text-neutral-400 max-w-md mx-auto">
            Ready to bring your next interactive experience to life? Reach out and let's build something extraordinary.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex gap-6 mb-24"
        >
          {[
            { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
            { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: XIcon, href: "https://x.com", label: "X" }
          ].map((social) => (
            <motion.div key={social.label} variants={item}>
              <Link
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                <social.icon className="relative z-10 w-6 h-6 text-neutral-400 group-hover:text-white transition-colors duration-500" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600 font-mono uppercase tracking-widest pt-8 border-t border-white/10">
          <p>© {new Date().getFullYear()}. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">Crafted with Next.js & Motion</p>
        </div>
      </div>
    </section>
  );
}
