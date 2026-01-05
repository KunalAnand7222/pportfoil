import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const skills = [
  { id: 'aiml', label: 'AI / ML', x: 200, subSkills: ['Regression', 'Classification', 'Clustering', 'NLP', 'Neural Networks', 'Model Eval'], color: '#22c55e' },
  { id: 'frontend', label: 'Frontend', x: 380, subSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind'], color: '#3b82f6' },
  { id: 'data', label: 'Data Analytics', x: 560, subSkills: ['SQL', 'Tableau', 'Power BI', 'Excel', 'Pandas'], color: '#f59e0b' },
  { id: 'backend', label: 'Backend', x: 740, subSkills: ['Python', 'Java', 'APIs', 'MongoDB', 'MySQL'], color: '#8b5cf6' },
  { id: 'tools', label: 'Tools', x: 920, subSkills: ['GitHub', 'VS Code', 'Jupyter', 'Git'], color: '#ec4899' },
  { id: 'others', label: 'Others', x: 1100, subSkills: ['Problem Solving', 'DSA', 'System Design'], color: '#14b8a6' },
];

const getFlowPath = (targetX: number) => {
  return `M650 96 C650 160 ${targetX} 230 ${targetX} 330`;
};

export default function SkillsFlowSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeSkillIndex, setActiveSkillIndex] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [animationProgress, setAnimationProgress] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // Auto-animate through skills - one at a time with sub-skills showing
  useEffect(() => {
    if (!isInView) return;

    let currentIndex = 0;
    const animationDuration = 800; // Time for line to animate
    const displayDuration = 1000; // Time to show sub-skills (1 second)
    
    const animatePath = () => {
      // Start animating the current path
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);
        
        setAnimationProgress(prev => {
          const newProgress = [...prev];
          newProgress[currentIndex] = progress;
          return newProgress;
        });

        // When line reaches 80%, show sub-skills
        if (progress >= 0.8) {
          setActiveSkillIndex(currentIndex);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Line complete, wait then move to next
          setTimeout(() => {
            // Reset current progress and hide sub-skills
            setAnimationProgress(prev => {
              const newProgress = [...prev];
              newProgress[currentIndex] = 0;
              return newProgress;
            });
            setActiveSkillIndex(null);
            
            // Move to next skill
            currentIndex = (currentIndex + 1) % skills.length;
            animatePath();
          }, displayDuration);
        }
      };

      requestAnimationFrame(animate);
    };

    // Start after a small delay
    const timeout = setTimeout(animatePath, 500);
    return () => clearTimeout(timeout);
  }, [isInView]);

  // Determine which skill to show sub-skills for (animation or hover)
  const displayedSkillIndex = hoveredSkill 
    ? skills.findIndex(s => s.id === hoveredSkill)
    : activeSkillIndex;

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
              className="fill-background/40 stroke-primary stroke-[2]"
            />
            <text 
              x="650" y="78" 
              textAnchor="middle" 
              className="fill-primary font-display text-xl font-bold tracking-[4px] uppercase"
              style={{ fontSize: '22px' }}
            >
              MY SKILLS
            </text>

            {/* Flow paths - static background lines */}
            {skills.map((skill) => (
              <path
                key={`flow-bg-${skill.id}`}
                d={getFlowPath(skill.x)}
                className="fill-none stroke-muted/20"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}

            {/* Animated flow paths */}
            {skills.map((skill, i) => (
              <motion.path
                key={`flow-anim-${skill.id}`}
                d={getFlowPath(skill.x)}
                fill="none"
                stroke={skill.color}
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: animationProgress[i],
                  opacity: animationProgress[i] > 0 ? 1 : 0
                }}
                style={{
                  filter: `drop-shadow(0 0 10px ${skill.color})`
                }}
              />
            ))}

            {/* Skill nodes */}
            {skills.map((skill, i) => {
              const isActive = displayedSkillIndex === i;
              const isAnimating = animationProgress[i] > 0.8;
              
              return (
                <g key={skill.id}>
                  {/* Node background */}
                  <motion.rect
                    x={skill.x - 95}
                    y="330"
                    width="190"
                    height="64"
                    rx="32"
                    ry="32"
                    fill={isActive || isAnimating ? `${skill.color}30` : 'rgba(255,255,255,0.03)'}
                    stroke={skill.color}
                    strokeWidth={isActive || isAnimating ? 2.5 : 1.5}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    onMouseEnter={() => setHoveredSkill(skill.id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{ 
                      cursor: 'pointer',
                      filter: isActive || isAnimating ? `drop-shadow(0 0 15px ${skill.color})` : 'none'
                    }}
                  />
                  
                  {/* Node label */}
                  <motion.text
                    x={skill.x}
                    y="368"
                    textAnchor="middle"
                    fill={isActive || isAnimating ? skill.color : '#ffffff'}
                    className="font-display font-bold text-sm tracking-wider uppercase pointer-events-none"
                    style={{ fontSize: '13px' }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  >
                    {skill.label}
                  </motion.text>

                  {/* Sub-skill lines and nodes - show when active */}
                  {isActive && (
                    <>
                      {skill.subSkills.map((sub, j) => {
                        // Calculate subskill positions centered around SVG center (650), not skill.x
                        const subSkillSpacing = 100;
                        const totalSubWidth = (skill.subSkills.length - 1) * subSkillSpacing;
                        const subX = 650 - totalSubWidth / 2 + j * subSkillSpacing;
                        const subY = 450;

                        return (
                          <g key={`${skill.id}-${sub}`}>
                            {/* Connection line background */}
                            <path
                              d={`M ${skill.x} 394 C ${skill.x} 420, ${subX} 430, ${subX} ${subY}`}
                              fill="none"
                              stroke="rgba(255,255,255,0.1)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            
                            {/* Animated connection line */}
                            <motion.path
                              d={`M ${skill.x} 394 C ${skill.x} 420, ${subX} 430, ${subX} ${subY}`}
                              fill="none"
                              stroke={skill.color}
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 0.3, delay: j * 0.05 }}
                              style={{
                                filter: `drop-shadow(0 0 8px ${skill.color})`
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
                              fill={`${skill.color}20`}
                              stroke={skill.color}
                              strokeWidth="1.5"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.25, delay: j * 0.04 }}
                              whileHover={{ 
                                scale: 1.1,
                                filter: `drop-shadow(0 0 15px ${skill.color})`
                              }}
                              style={{ cursor: 'pointer' }}
                            />
                            <motion.text
                              x={subX}
                              y={subY + 22}
                              textAnchor="middle"
                              fill="#ffffff"
                              className="font-body font-semibold text-xs uppercase pointer-events-none"
                              style={{ fontSize: '10px', letterSpacing: '0.5px' }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.25, delay: j * 0.05 }}
                            >
                              {sub}
                            </motion.text>
                          </g>
                        );
                      })}
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}