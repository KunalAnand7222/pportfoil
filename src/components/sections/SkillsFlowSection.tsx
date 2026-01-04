import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const skills = [
  { id: 'aiml', label: 'AI / ML', x: 155, subSkills: ['Regression', 'Classification', 'Clustering', 'NLP', 'Neural Networks', 'Model Eval'] },
  { id: 'frontend', label: 'Frontend', x: 355, subSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind'] },
  { id: 'data', label: 'Data Analytics', x: 555, subSkills: ['SQL', 'Tableau', 'Power BI', 'Excel', 'Pandas'] },
  { id: 'backend', label: 'Backend', x: 755, subSkills: ['Python', 'Java', 'APIs', 'MongoDB', 'MySQL'] },
  { id: 'tools', label: 'Tools', x: 955, subSkills: ['GitHub', 'VS Code', 'Jupyter', 'Git'] },
  { id: 'others', label: 'Others', x: 1155, subSkills: ['Problem Solving', 'DSA', 'System Design'] },
];

// Flow path curves from center (650) to each skill
const getFlowPath = (targetX: number) => {
  return `M650 96 C650 160 ${targetX} 230 ${targetX} 330`;
};

export default function SkillsFlowSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [animatingPaths, setAnimatingPaths] = useState<number[]>([]);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);

  // Snake animation for main paths
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setCurrentPathIndex(prev => (prev + 1) % skills.length);
      setAnimatingPaths(prev => {
        const newPaths = [...prev, currentPathIndex];
        // Keep only last 2 active
        if (newPaths.length > 2) newPaths.shift();
        return newPaths;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isInView, currentPathIndex]);

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="container relative z-10 px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-4 block">
            Expertise
          </span>
        </motion.div>

        {/* SVG Skills Tree */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-6xl mx-auto"
        >
          <svg viewBox="0 0 1300 520" className="w-full h-auto">
            {/* Main "MY SKILLS" node */}
            <rect 
              x="530" y="40" width="240" height="56" 
              rx="28" ry="28"
              className="fill-background/40 stroke-primary stroke-[1.5]"
            />
            <text 
              x="650" y="78" 
              textAnchor="middle" 
              className="fill-primary font-display text-xl font-bold tracking-[4px] uppercase"
              style={{ fontSize: '22px' }}
            >
              MY SKILLS
            </text>

            {/* Flow paths - static lines */}
            {skills.map((skill, i) => (
              <path
                key={`flow-${skill.id}`}
                d={getFlowPath(skill.x)}
                className="fill-none stroke-muted/30"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}

            {/* Animated flow paths */}
            {skills.map((skill, i) => (
              <motion.path
                key={`flow-anim-${skill.id}`}
                d={getFlowPath(skill.x)}
                className="fill-none stroke-primary"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  animatingPaths.includes(i) || activeSkill === skill.id
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.8))'
                }}
              />
            ))}

            {/* Skill nodes */}
            {skills.map((skill, i) => (
              <g key={skill.id}>
                {/* Node background */}
                <motion.rect
                  x={skill.x - 95}
                  y="330"
                  width="190"
                  height="64"
                  rx="32"
                  ry="32"
                  className={`cursor-pointer transition-all duration-300 ${
                    activeSkill === skill.id
                      ? 'fill-primary/20 stroke-primary stroke-[2]'
                      : 'fill-primary/5 stroke-primary/50 stroke-[1.5]'
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  onMouseEnter={() => setActiveSkill(skill.id)}
                  onMouseLeave={() => setActiveSkill(null)}
                  style={{
                    boxShadow: activeSkill === skill.id 
                      ? '0 8px 30px hsl(var(--primary) / 0.4)' 
                      : '0 4px 20px hsl(var(--primary) / 0.2)',
                  }}
                />
                {/* Node label */}
                <motion.text
                  x={skill.x}
                  y="368"
                  textAnchor="middle"
                  className="fill-foreground font-display font-bold text-sm tracking-wider uppercase pointer-events-none"
                  style={{ fontSize: '13px' }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                >
                  {skill.label}
                </motion.text>

                {/* Sub-skill lines and nodes */}
                {activeSkill === skill.id && (
                  <>
                    {skill.subSkills.map((sub, j) => {
                      const totalWidth = skill.subSkills.length * 120;
                      const startX = skill.x - totalWidth / 2 + 60;
                      const subX = startX + j * 120;
                      const subY = 450;

                      return (
                        <g key={`${skill.id}-${sub}`}>
                          {/* Connection line */}
                          <motion.path
                            d={`M ${skill.x} 394 C ${skill.x} 420, ${subX} 430, ${subX} ${subY}`}
                            className="fill-none stroke-muted/40"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, delay: j * 0.05 }}
                          />
                          <motion.path
                            d={`M ${skill.x} 394 C ${skill.x} 420, ${subX} 430, ${subX} ${subY}`}
                            className="fill-none stroke-primary"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: j * 0.08 }}
                            style={{
                              filter: 'drop-shadow(0 0 6px hsl(var(--primary) / 0.7))'
                            }}
                          />
                          
                          {/* Sub-skill pill */}
                          <motion.rect
                            x={subX - 55}
                            y={subY}
                            width="110"
                            height="34"
                            rx="17"
                            ry="17"
                            className="fill-primary/10 stroke-primary/60 stroke-[1.3] cursor-pointer"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: j * 0.06 }}
                            whileHover={{ 
                              scale: 1.1,
                              filter: 'drop-shadow(0 0 12px hsl(var(--primary) / 0.8))'
                            }}
                          />
                          <motion.text
                            x={subX}
                            y={subY + 22}
                            textAnchor="middle"
                            className="fill-foreground font-body font-semibold text-xs uppercase pointer-events-none"
                            style={{ fontSize: '10px', letterSpacing: '0.5px' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: j * 0.08 }}
                          >
                            {sub}
                          </motion.text>
                        </g>
                      );
                    })}
                  </>
                )}
              </g>
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
