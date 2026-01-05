import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const projects = [
  {
    id: 1,
    slug: "olympic-insights",
    title: "Olympic Insights",
    description: "Built interactive Tableau dashboards analyzing 120+ years of Olympic data across 200+ countries. Displayed medal trends, top athletes, and country performance.",
    tech: ["Tableau", "Data Visualization", "Analytics"],
    github: "https://github.com/KunalAnand7222/Olympic-Insights",
    date: "Dec 2024 – Jan 2025",
    borderColor: "#22c55e",
    glowColor: "rgba(34, 197, 94, 0.4)"
  },
  {
    id: 2,
    slug: "movie-recommender",
    title: "Movie Recommender",
    description: "Developed an NLP-based recommender system using movie descriptions, genres, and reviews. Generated personalized recommendations with 80% accuracy.",
    tech: ["Python", "NLTK", "NLP", "Machine Learning"],
    github: "https://github.com/KunalAnand7222/Movie-recommender",
    date: "May 2024 – Jun 2024",
    borderColor: "#14b8a6",
    glowColor: "rgba(20, 184, 166, 0.4)"
  },
  {
    id: 3,
    slug: "amazon-clone",
    title: "Amazon Clone",
    description: "Designed a responsive Amazon-style website using modern UI components. Implemented navigation, product listings, search functionality, and hover effects.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/KunalAnand7222",
    link: "https://amazonnnclonee.netlify.app",
    date: "Jan 2024 – Apr 2024",
    borderColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.4)"
  },
  {
    id: 4,
    slug: "ibm-ai-training",
    title: "IBM AI Training Project",
    description: "Completed 40+ hours of training in supervised, unsupervised, and deep learning concepts. Applied AI techniques to three real-world case studies with 85%+ model accuracy.",
    tech: ["AI", "Deep Learning", "Machine Learning", "Python"],
    date: "Jun 2024 – Jul 2024",
    borderColor: "#8b5cf6",
    glowColor: "rgba(139, 92, 246, 0.4)"
  }
];

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  // Continuous rotation every 1 second
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }
  };

  const handleCardClick = (project: typeof projects[0], index: number) => {
    if (index === currentIndex) {
      navigate(`/project/${project.slug}`);
    } else {
      setCurrentIndex(index);
    }
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    let normalizedDiff = diff;
    
    // Handle wrapping
    if (diff > projects.length / 2) normalizedDiff = diff - projects.length;
    if (diff < -projects.length / 2) normalizedDiff = diff + projects.length;
    
    if (normalizedDiff === 0) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 30, rotateY: 0, blur: 0 };
    } else if (normalizedDiff === 1) {
      return { x: 350, scale: 0.85, opacity: 0.7, zIndex: 20, rotateY: -8, blur: 1 };
    } else if (normalizedDiff === -1) {
      return { x: -350, scale: 0.85, opacity: 0.7, zIndex: 20, rotateY: 8, blur: 1 };
    } else if (normalizedDiff === 2 || normalizedDiff === -2) {
      return { x: normalizedDiff > 0 ? 600 : -600, scale: 0.7, opacity: 0.3, zIndex: 10, rotateY: normalizedDiff > 0 ? -12 : 12, blur: 2 };
    }
    return { x: 0, scale: 0.6, opacity: 0, zIndex: 5, rotateY: 0, blur: 3 };
  };

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* Background lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[120px]" />
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
          className="relative h-[450px] flex items-center justify-center"
          style={{ perspective: '1200px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {projects.map((project, index) => {
            const style = getCardStyle(index);
            
            return (
              <motion.div
                key={project.id}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  opacity: style.opacity,
                  rotateY: style.rotateY,
                  zIndex: style.zIndex,
                  filter: `blur(${style.blur}px)`
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                whileHover={style.zIndex === 30 ? { y: -8, scale: 1.02 } : {}}
                className="absolute w-full max-w-md cursor-pointer"
                onClick={() => handleCardClick(project, index)}
                style={{ transformStyle: 'preserve-3d' }}
              >
              {/* Card with wider colored border */}
                <div 
                  className="relative rounded-2xl p-[25px]"
                  style={{
                    background: `linear-gradient(135deg, ${project.borderColor}, ${project.borderColor}aa)`,
                    boxShadow: `0 0 50px ${project.glowColor}, 0 0 100px ${project.glowColor}`,
                  }}
                >
                  <div className="relative bg-[#0a0f0a]/95 backdrop-blur-xl rounded-xl p-6 min-h-[320px] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span 
                        className="text-sm font-mono"
                        style={{ color: project.borderColor }}
                      >
                        {project.date}
                      </span>
                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all"
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
                            className="p-2 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      className="font-display text-2xl font-bold mb-3"
                      style={{ color: project.borderColor }}
                    >
                      {project.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/70 mb-6 leading-relaxed flex-grow text-sm">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-xs rounded-full bg-white/10 text-white/80 border border-white/10"
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

          {/* Navigation arrows */}
          <button
            onClick={() => handleNavigate('prev')}
            className="absolute left-4 md:left-8 z-40 p-3 rounded-full bg-white/10 text-white/50 hover:text-white hover:bg-white/20 transition-all border border-white/10 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleNavigate('next')}
            className="absolute right-4 md:right-8 z-40 p-3 rounded-full bg-white/10 text-white/50 hover:text-white hover:bg-white/20 transition-all border border-white/10 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-3 mt-10">
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: index === currentIndex ? '32px' : '8px',
                backgroundColor: index === currentIndex ? project.borderColor : 'rgba(255,255,255,0.2)',
                boxShadow: index === currentIndex ? `0 0 10px ${project.glowColor}` : 'none'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}