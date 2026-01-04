import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    id: 1,
    title: 'IBM Summer Training',
    role: 'Artificial Intelligence Trainee',
    period: 'Jun 2024 – Jul 2024',
    type: 'Remote',
    highlights: [
      'Completed 40+ hours of training in supervised, unsupervised, and deep learning',
      'Applied AI techniques to three real-world case studies with 85%+ model accuracy',
      'Analyzed datasets of 5,000+ records to build and evaluate ML models'
    ],
    color: '#3b82f6'
  },
];

const education = [
  {
    id: 1,
    institution: 'Lovely Professional University',
    degree: 'B.Tech in Computer Science and Engineering',
    grade: 'CGPA: 8.64',
    period: '2022 – 2026',
    location: 'Punjab, India'
  },
  {
    id: 2,
    institution: 'New Samastipur Public School',
    degree: '12th Science',
    grade: '89.6%',
    period: '2020 – 2021',
    location: 'Bihar, India'
  },
  {
    id: 3,
    institution: 'New Samastipur Public School',
    degree: '10th Science',
    grade: '91.8%',
    period: '2018 – 2019',
    location: 'Bihar, India'
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="container relative z-10 px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Experience & <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Experience */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-2xl font-bold mb-8 flex items-center gap-3"
            >
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
              Experience
            </motion.h3>

            <div className="relative pl-8 border-l border-border">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="relative mb-8 last:mb-0"
                >
                  {/* Timeline dot */}
                  <div 
                    className="absolute -left-[41px] top-0 w-4 h-4 rounded-full border-4 border-background"
                    style={{ backgroundColor: exp.color }}
                  />
                  
                  <div className="glass-panel p-6">
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <h4 className="font-display font-bold text-lg">{exp.title}</h4>
                      <span className="text-xs text-primary font-mono">{exp.period}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {exp.role} • {exp.type}
                    </p>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, j) => (
                        <li key={j} className="text-sm text-muted-foreground/80 flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-2xl font-bold mb-8 flex items-center gap-3"
            >
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
              Education
            </motion.h3>

            <div className="relative pl-8 border-l border-border">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="relative mb-6 last:mb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full border-4 border-background bg-primary" />
                  
                  <div className="glass-panel p-6">
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <h4 className="font-display font-bold">{edu.institution}</h4>
                      <span className="text-xs text-primary font-mono">{edu.period}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{edu.degree}</p>
                    <div className="flex justify-between items-center mt-2 text-xs">
                      <span className="text-primary font-semibold">{edu.grade}</span>
                      <span className="text-muted-foreground">{edu.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
