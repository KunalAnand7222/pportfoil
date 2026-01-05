import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Code } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/sections/Footer';

const projects = [
  {
    id: 1,
    slug: "olympic-insights",
    title: "Olympic Insights",
    description: "Built interactive Tableau dashboards analyzing 120+ years of Olympic data across 200+ countries. Displayed medal trends, top athletes, and country performance.",
    fullDescription: "A comprehensive data visualization project that leverages Tableau's powerful analytics capabilities to explore and present insights from over a century of Olympic history. The dashboards provide interactive exploration of medal distributions, athlete performance metrics, and country-by-country comparisons across all Olympic sports.",
    tech: ["Tableau", "Data Visualization", "Analytics"],
    github: "https://github.com/KunalAnand7222/Olympic-Insights",
    date: "Dec 2024 – Jan 2025",
    borderColor: "#22c55e",
    glowColor: "rgba(34, 197, 94, 0.4)",
    features: [
      "Interactive medal trend analysis across 120+ years",
      "Country performance comparison for 200+ nations",
      "Top athlete rankings and statistics",
      "Sport-by-sport breakdown and insights"
    ]
  },
  {
    id: 2,
    slug: "movie-recommender",
    title: "Movie Recommender",
    description: "Developed an NLP-based recommender system using movie descriptions, genres, and reviews. Generated personalized recommendations with 80% accuracy.",
    fullDescription: "An intelligent movie recommendation engine that uses Natural Language Processing to analyze movie descriptions, genres, and user reviews. The system employs machine learning algorithms to understand user preferences and generate highly accurate personalized movie suggestions.",
    tech: ["Python", "NLTK", "NLP", "Machine Learning"],
    github: "https://github.com/KunalAnand7222/Movie-recommender",
    date: "May 2024 – Jun 2024",
    borderColor: "#14b8a6",
    glowColor: "rgba(20, 184, 166, 0.4)",
    features: [
      "NLP-based content analysis",
      "80% recommendation accuracy",
      "Genre and review sentiment analysis",
      "Personalized user preference learning"
    ]
  },
  {
    id: 3,
    slug: "amazon-clone",
    title: "Amazon Clone",
    description: "Designed a responsive Amazon-style website using modern UI components. Implemented navigation, product listings, search functionality, and hover effects.",
    fullDescription: "A fully responsive e-commerce website clone that replicates the core functionality and design of Amazon. Built with modern web technologies, featuring smooth navigation, dynamic product listings, search capabilities, and interactive hover effects for an engaging user experience.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/KunalAnand7222",
    link: "https://amazonnnclonee.netlify.app",
    date: "Jan 2024 – Apr 2024",
    borderColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.4)",
    features: [
      "Fully responsive design",
      "Product listing and grid layout",
      "Search functionality",
      "Interactive hover effects"
    ]
  },
  {
    id: 4,
    slug: "ibm-ai-training",
    title: "IBM AI Training Project",
    description: "Completed 40+ hours of training in supervised, unsupervised, and deep learning concepts. Applied AI techniques to three real-world case studies with 85%+ model accuracy.",
    fullDescription: "An intensive AI training program by IBM covering fundamental and advanced machine learning concepts. The program included hands-on projects applying supervised learning, unsupervised learning, and deep learning techniques to real-world business problems, achieving high accuracy rates across multiple case studies.",
    tech: ["AI", "Deep Learning", "Machine Learning", "Python"],
    date: "Jun 2024 – Jul 2024",
    borderColor: "#8b5cf6",
    glowColor: "rgba(139, 92, 246, 0.4)",
    features: [
      "40+ hours of comprehensive training",
      "Supervised learning implementation",
      "Unsupervised learning techniques",
      "Deep learning neural networks",
      "85%+ model accuracy on case studies"
    ]
  }
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/#projects" className="text-primary hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link 
              to="/#projects"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Project card with border */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-[25px]"
            style={{
              background: `linear-gradient(135deg, ${project.borderColor}, ${project.borderColor}aa)`,
              boxShadow: `0 0 60px ${project.glowColor}, 0 0 120px ${project.glowColor}`,
            }}
          >
            <div className="bg-[#0a0f0a]/95 backdrop-blur-xl rounded-2xl p-8 md:p-12">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5" style={{ color: project.borderColor }} />
                  <span className="font-mono text-white/70">{project.date}</span>
                </div>
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Title */}
              <h1 
                className="font-display text-4xl md:text-5xl font-bold mb-6"
                style={{ color: project.borderColor }}
              >
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {project.fullDescription}
              </p>

              {/* Tech stack */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5" style={{ color: project.borderColor }} />
                  <h3 className="text-lg font-semibold text-white">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 text-sm rounded-full border"
                      style={{ 
                        borderColor: project.borderColor,
                        color: project.borderColor,
                        backgroundColor: `${project.borderColor}15`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span 
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: project.borderColor }}
                      />
                      <span className="text-white/70">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
