import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const skills = [
  { 
    id: 'aiml', 
    label: 'AI / ML', 
    subSkills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Deep Learning', 'Neural Networks'],
    color: '#22c55e'
  },
  { 
    id: 'frontend', 
    label: 'Frontend', 
    subSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind'],
    color: '#3b82f6'
  },
  { 
    id: 'data', 
    label: 'Data Analytics', 
    subSkills: ['Tableau', 'Power BI', 'Excel', 'Pandas', 'NumPy', 'Matplotlib'],
    color: '#f59e0b'
  },
  { 
    id: 'backend', 
    label: 'Backend', 
    subSkills: ['Python', 'SQL', 'MongoDB', 'Java'],
    color: '#8b5cf6'
  },
  { 
    id: 'tools', 
    label: 'Tools', 
    subSkills: ['Git', 'GitHub', 'VS Code', 'Jupyter'],
    color: '#ec4899'
  },
  { 
    id: 'others', 
    label: 'Others', 
    subSkills: ['R', 'Seaborn', 'Model Evaluation', 'Data Visualization'],
    color: '#14b8a6'
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      
      <div className="container relative z-10 px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            Expertise
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            My <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center Node */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center animate-pulse-glow">
              <span className="font-display font-bold text-primary-foreground text-sm text-center">
                MY<br />SKILLS
              </span>
            </div>
          </motion.div>

          {/* Skills arranged in circle */}
          <div className="relative h-[500px] md:h-[600px]">
            {skills.map((skill, i) => {
              const angle = (i * 360) / skills.length - 90;
              const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 220;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                  onMouseEnter={() => setActiveSkill(skill.id)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  <div 
                    className={`glass-panel p-4 md:p-6 transition-all duration-300 ${
                      activeSkill === skill.id ? 'scale-110 shadow-glow' : ''
                    }`}
                    style={{
                      borderColor: activeSkill === skill.id ? skill.color : undefined,
                    }}
                  >
                    <span 
                      className="font-display font-semibold text-sm md:text-base whitespace-nowrap"
                      style={{ color: skill.color }}
                    >
                      {skill.label}
                    </span>

                    {/* Sub-skills popup */}
                    {activeSkill === skill.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 glass-panel p-4 min-w-[200px] z-30"
                      >
                        <div className="flex flex-wrap gap-2">
                          {skill.subSkills.map((sub) => (
                            <span 
                              key={sub}
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{ 
                                backgroundColor: `${skill.color}20`,
                                color: skill.color 
                              }}
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Connection line to center */}
                  <svg
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10"
                    style={{
                      width: Math.abs(x) * 2 + 50,
                      height: Math.abs(y) * 2 + 50,
                      left: x > 0 ? '50%' : `calc(50% - ${Math.abs(x)}px)`,
                      top: y > 0 ? '50%' : `calc(50% - ${Math.abs(y)}px)`,
                    }}
                  >
                    <line
                      x1={x > 0 ? 0 : Math.abs(x)}
                      y1={y > 0 ? 0 : Math.abs(y)}
                      x2={x > 0 ? Math.abs(x) : 0}
                      y2={y > 0 ? Math.abs(y) : 0}
                      stroke={skill.color}
                      strokeWidth="1"
                      strokeOpacity={activeSkill === skill.id ? "0.5" : "0.15"}
                      strokeDasharray="4 4"
                      className="transition-all duration-300"
                    />
                  </svg>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
