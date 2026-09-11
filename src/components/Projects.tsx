import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Ethereal VR",
    category: "WebGL Experience",
    description: "An immersive virtual reality showcase built with Three.js and React Three Fiber.",
    year: "2024"
  },
  {
    id: 2,
    title: "Neo Banking",
    category: "Fintech Platform",
    description: "A highly interactive dashboard for modern banking with real-time data visualization.",
    year: "2023"
  },
  {
    id: 3,
    title: "Lumina AI",
    category: "Marketing Website",
    description: "A sleek, motion-heavy landing page for a cutting-edge artificial intelligence startup.",
    year: "2023"
  },
  {
    id: 4,
    title: "Aura E-commerce",
    category: "Headless Storefront",
    description: "A blazing fast, accessible, and highly converted e-commerce experience.",
    year: "2022"
  }
];

export default function Projects() {
  return (
    <section className="relative min-h-screen bg-[#121212] py-32 px-6 md:px-12 z-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Selected Work
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl">
            A collection of projects pushing the boundaries of web development and interactive design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-end h-80 md:h-96 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] cursor-pointer"
            >
              {/* Subtle gradient glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col gap-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-mono text-neutral-300 uppercase tracking-widest">
                    {project.category}
                  </p>
                  <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-neutral-300 line-clamp-2">{project.description}</p>
                <p className="text-xs text-neutral-500 mt-4">{project.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
