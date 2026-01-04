import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Olympic Insights',
    description: 'Interactive Tableau dashboards analyzing 120+ years of Olympic data across 200+ countries.',
    tech: ['Tableau', 'Data Analytics', 'Visualization'],
    github: 'https://github.com/KunalAnand7222/Olympic-Insights',
    color: '#f59e0b',
    period: 'Dec 2024 – Jan 2025'
  },
  {
    id: 2,
    title: 'Movie Recommender System',
    description: 'NLP-based recommender system using movie descriptions with 80% accuracy in user preferences.',
    tech: ['Python', 'NLTK', 'Machine Learning', 'NLP'],
    github: 'https://github.com/KunalAnand7222/Movie-recommender',
    color: '#8b5cf6',
    period: 'May 2024 – Jun 2024'
  },
  {
    id: 3,
    title: 'Amazon Clone',
    description: 'Responsive Amazon-style website with modern UI, navigation, and search functionality.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    github: 'https://github.com/KunalAnand7222',
    color: '#22c55e',
    period: 'Jan 2024 – Apr 2024'
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="container relative z-10 px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative"
            >
              <div 
                className={`glass-panel p-8 h-full transition-all duration-500 ${
                  hoveredProject === project.id ? 'scale-105' : ''
                }`}
                style={{
                  borderColor: hoveredProject === project.id ? project.color : undefined,
                  boxShadow: hoveredProject === project.id ? `0 0 40px ${project.color}30` : undefined,
                }}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <span 
                    className="text-xs font-mono"
                    style={{ color: project.color }}
                  >
                    {project.period}
                  </span>
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hover indicator */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: hoveredProject === project.id ? '100%' : 0 }}
                  className="absolute bottom-0 left-0 h-1 rounded-b-2xl"
                  style={{ backgroundColor: project.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
