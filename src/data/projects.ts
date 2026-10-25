export type Project = {
  number: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  visual: "metrics" | "agent" | "vision" | "water" | "prediction";
  href?: string;
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "githubmetrics",
    title: "GitHubMetrics",
    category: "Developer analytics platform",
    description: "A focused view of GitHub activity, projects, and the signals behind consistent building.",
    technologies: ["Next.js", "React", "FastAPI", "Python", "GitHub API"],
    visual: "metrics"
  },
  {
    number: "02",
    slug: "resolvex",
    title: "ResolveX",
    category: "AI-powered problem resolution",
    description: "An AI-assisted platform concept for turning support friction into clearer, faster resolutions.",
    technologies: ["Python", "FastAPI", "AI", "Next.js", "Docker"],
    visual: "agent"
  },
  {
    number: "03",
    slug: "ai-carousel-extractor",
    title: "AI Carousel Extractor",
    category: "Image intelligence tool",
    description: "A tool for extracting text and useful information from image-based social media carousels.",
    technologies: ["Python", "OCR", "Computer Vision", "LLMs"],
    visual: "vision"
  },
  {
    number: "04",
    slug: "smart-water-quality-monitor",
    title: "Smart Water Quality Monitor",
    category: "IoT + machine learning concept",
    description: "A monitoring concept that brings sensor signals and data visualization into one readable system.",
    technologies: ["Python", "Machine Learning", "IoT", "Data Visualization"],
    visual: "water"
  },
  {
    number: "05",
    slug: "ml-prediction-system",
    title: "ML Prediction System",
    category: "Machine-learning experiment",
    description: "A practical experimentation space for testing features, models, and prediction workflows.",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    visual: "prediction"
  }
];
