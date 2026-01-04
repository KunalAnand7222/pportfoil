import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Olympic Insights",
    description: "Built interactive Tableau dashboards analyzing 120+ years of Olympic data across 200+ countries. Displayed medal trends, top athletes, and country performance.",
    tech: ["Tableau", "Data Visualization", "Analytics"],
    github: "https://github.com/KunalAnand7222/Olympic-Insights",
    date: "Dec 2024 – Jan 2025",
    gradient: "from-primary to-emerald-600"
  },
  {
    id: 2,
    title: "Movie Recommender System",
    description: "Developed an NLP-based recommender system using movie descriptions, genres, and reviews. Generated personalized recommendations with 80% accuracy.",
    tech: ["Python", "NLTK", "NLP", "Machine Learning"],
    github: "https://github.com/KunalAnand7222/Movie-recommender",
    date: "May 2024 – Jun 2024",
    gradient: "from-emerald-600 to-teal-500"
  },
  {
    id: 3,
    title: "Amazon Clone",
    description: "Designed a responsive Amazon-style website using modern UI components. Implemented navigation, product listings, search functionality, and hover effects.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/KunalAnand7222",
    link: "https://amazonnnclonee.netlify.app",
    date: "Jan 2024 – Apr 2024",
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    id: 4,
    title: "IBM AI Training Project",
    description: "Completed 40+ hours of training in supervised, unsupervised, and deep learning concepts. Applied AI techniques to three real-world case studies with 85%+ model accuracy.",
    tech: ["AI", "Deep Learning", "Machine Learning", "Python"],
    date: "Jun 2024 – Jul 2024",
    gradient: "from-cyan-500 to-blue-500"
  }
];

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = ((diff + projects.length) % projects.length);
    
    if (normalizedDiff === 0) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 30, rotateY: 0 };
    } else if (normalizedDiff === 1 || normalizedDiff === -3) {
      return { x: 280, scale: 0.85, opacity: 0.6, zIndex: 20, rotateY: -15 };
    } else if (normalizedDiff === projects.length - 1 || normalizedDiff === -1) {
      return { x: -280, scale: 0.85, opacity: 0.6, zIndex: 20, rotateY: 15 };
    }
    return { x: 0, scale: 0.7, opacity: 0, zIndex: 10, rotateY: 0 };
  };

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background lights */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
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

        {/* 3D Carousel */}
        <div 
          className="relative h-[500px] flex items-center justify-center"
          style={{ perspective: '1000px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="sync">
            {projects.map((project, index) => {
              const style = getCardStyle(index);
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    opacity: style.opacity,
                    rotateY: style.rotateY,
                    zIndex: style.zIndex
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={style.zIndex === 30 ? { y: -10, scale: 1.02 } : {}}
                  className="absolute w-full max-w-lg cursor-pointer"
                  onClick={() => setCurrentIndex(index)}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className={`relative p-1 rounded-3xl bg-gradient-to-br ${project.gradient}`}>
                    {/* Card glow */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl opacity-30`} />
                    
                    <div className="relative bg-card/95 backdrop-blur-xl rounded-2xl p-8 border border-border">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-muted-foreground text-sm font-mono">{project.date}</span>
                        <div className="flex gap-2">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-full bg-muted text-muted-foreground hover:text-primary hover:bg-muted/80 transition-all"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-full bg-muted text-muted-foreground hover:text-primary hover:bg-muted/80 transition-all"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="font-display text-2xl font-bold mb-4">{project.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-muted text-foreground/80 border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation */}
          <button
            onClick={() => navigate('prev')}
            className="absolute left-4 z-40 p-3 rounded-full bg-muted text-muted-foreground hover:text-primary hover:bg-muted/80 transition-all border border-border"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigate('next')}
            className="absolute right-4 z-40 p-3 rounded-full bg-muted text-muted-foreground hover:text-primary hover:bg-muted/80 transition-all border border-border"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}